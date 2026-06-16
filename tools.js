// ============================================================
//  TOOLS — 3개 도구 정의
//  composeMail(auto) / showPreview(auto) / sendMail(ask)
// ============================================================

/**
 * composeMail - 메일 내용을 채팅에 표시 (auto 등급)
 * @param {string} to
 * @param {string} subject
 * @param {string} body
 */
function composeMail(to, subject, body) {
    think(`메일 내용 작성. 수신자: ${to}, 제목: ${subject}`);
    act('composeMail', `수신자: ${to}, 제목: "${subject}"`);

    const html = `
        <strong>📧 메일 내용이 준비되었습니다</strong>
        <div class="draft-preview">
            <div class="label">✉️ 메일 정보</div>
            <div class="field">
                <span class="field-name">받는 사람:</span>
                <span class="field-value">${escapeHtml(to)}</span>
            </div>
            <div class="field">
                <span class="field-name">제목:</span>
                <span class="field-value">${escapeHtml(subject)}</span>
            </div>
            <div class="field">
                <span class="field-name">본문:</span>
                <span class="field-value" style="white-space:pre-wrap;">${escapeHtml(body)}</span>
            </div>
        </div>
    `;

    addMessage(html, 'ai');
    observe('메일 내용 작성 완료. 미리보기 준비.');

    return { to, subject, body };
}

/**
 * showPreview - 미리보기 카드 제공 + 확인/취소 버튼 (auto 등급)
 * @param {string} to
 * @param {string} subject
 * @param {string} body
 */
function showPreview(to, subject, body) {
    think(`미리보기 생성. 수신자: ${to}, 제목: ${subject}`);
    act('showPreview', `미리보기 표시: → ${to}`);

    const previewId = 'preview_' + Date.now();

    const html = `
        <strong>📋 메일 미리보기</strong>
        <div class="draft-preview" style="border-color:rgba(139,92,246,0.3);background:rgba(139,92,246,0.06);" id="${previewId}">
            <div class="label" style="color:#8b5cf6;">🔍 보내기 전 최종 확인</div>
            <div class="field">
                <span class="field-name">받는 사람:</span>
                <span class="field-value">${escapeHtml(to)}</span>
            </div>
            <div class="field">
                <span class="field-name">제목:</span>
                <span class="field-value">${escapeHtml(subject)}</span>
            </div>
            <div class="field">
                <span class="field-name">본문:</span>
                <span class="field-value" style="white-space:pre-wrap;">${escapeHtml(body)}</span>
            </div>
            <div class="action-buttons" style="margin-top:12px;border-top:1px solid rgba(139,92,246,0.2);padding-top:12px;">
                <button class="btn btn-cancel" onclick="cancelSend('${previewId}')">취소</button>
                <button class="btn btn-success" onclick="confirmSend('${previewId}', '${escapeHtml(to)}', '${escapeHtml(subject)}', '${escapeHtml(body)}')">✅ 확인 및 발송</button>
            </div>
        </div>
        <div style="margin-top:6px;font-size:13px;color:var(--time-color);">
            내용을 확인하시고 [✅ 확인 및 발송] 버튼을 눌러주세요.
        </div>
    `;

    Agent.state.draft = { to, subject, body };
    Agent.state.previewConfirmed = false;
    Agent.state.step = 'PREVIEW';

    addMessage(html, 'ai');
    observe('미리보기 표시 완료. 사용자 확인 대기 중.');

    return { to, subject, body };
}

/**
 * confirmSend - 미리보기 확인 버튼 핸들러
 * 전역 함수로 선언되어 HTML onclick에서 호출 가능
 */
function confirmSend(previewId, to, subject, body) {
    if (Agent.state.isStopped) return;

    think('사용자가 미리보기를 확인함. 가드레일 검사 후 발송 진행.');
    act('showPreview', `사용자 확인 완료. sendMail 호출 준비.`);

    Agent.state.previewConfirmed = true;
    Agent.state.to = to;
    Agent.state.subject = subject;
    Agent.state.body = body;
    Agent.state.step = 'CONFIRM';

    // 확인 버튼 비활성화
    const previewDiv = document.getElementById(previewId);
    if (previewDiv) {
        const buttons = previewDiv.querySelectorAll('.btn');
        buttons.forEach(btn => btn.disabled = true);
    }

    // 가드레일 검사
    const context = {
        to: to,
        previewConfirmed: true,
        toolCallCount: Agent.state.toolCallCount,
        lastCallTime: Agent.state.lastCallTime
    };

    const guardCheck = Guard.checkAll('sendMail', context);
    if (!guardCheck.ok) {
        Agent.state.previewConfirmed = false;

        if (guardCheck.retryExceeded) {
            // 5회 초과 → 사용자에게 선택 요청
            think('sendMail 5회 실패. 사용자에게 종료/재시도 선택 요청.');
            observe(`sendMail 도구 5회 실패: ${guardCheck.message}`);

            const failHtml = `
                <div style="padding:10px;background:rgba(239,68,68,0.08);border-radius:8px;border-left:3px solid #ef4444;">
                    <strong>⚠️ 메일 발송 실패</strong><br>
                    <span style="font-size:13px;">${escapeHtml(guardCheck.message)}</span>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-cancel" onclick="cancelAfterRetry()">종료</button>
                    <button class="btn btn-primary" onclick="retryFromStart()">다시 시도</button>
                </div>
            `;
            addMessage(failHtml, 'ai');
            isAwaitingUserResponse = true;
            return;
        }

        observe(`가드레일 차단: ${guardCheck.message}`);
        addMessage(`<div style="padding:8px;background:rgba(239,68,68,0.08);border-radius:8px;font-size:13px;">⚠️ ${escapeHtml(guardCheck.message)}</div>`, 'ai');
        Agent.state.step = 'PREVIEW';
        return;
    }

    // 가드레일 통과 → sendMail 실행
    executeSendMail(to, subject, body);
}

/**
 * cancelSend - 미리보기 취소 버튼 핸들러
 */
function cancelSend(previewId) {
    if (Agent.state.isStopped) return;

    think('사용자가 발송을 취소함. PREVIEW 취소.');
    act('showPreview', '취소 버튼 클릭');
    observe('메일 발송이 취소됨.');

    // 미리보기 카드 업데이트
    const previewDiv = document.getElementById(previewId);
    if (previewDiv) {
        const buttons = previewDiv.querySelectorAll('.btn');
        buttons.forEach(btn => btn.disabled = true);
        previewDiv.innerHTML = `
            <div style="padding:8px;color:#6b7280;font-size:13px;">
                ❌ 발송이 취소되었습니다.
            </div>
        `;
    }

    Agent.reset();
    isAwaitingUserResponse = false;
    isProcessing = false;
    updateSendButton();
}

/**
 * cancelAfterRetry - 재시도 초과 후 종료
 */
function cancelAfterRetry() {
    think('사용자가 종료를 선택함. IDLE로 복귀.');
    observe('메일 발송이 취소됨.');
    Agent.reset();
    isAwaitingUserResponse = false;
    isProcessing = false;
    updateSendButton();
    addMessage('메일 작성을 종료합니다. 필요하시면 다시 말씀해주세요! 😊', 'ai');
}

/**
 * retryFromStart - 재시도 초과 후 처음부터 다시 시작
 */
function retryFromStart() {
    think('사용자가 재시도를 선택함. 에이전트 초기화 후 재시작.');
    observe('에이전트 리셋 후 재시작.');
    Agent.reset();
    isAwaitingUserResponse = false;
    isProcessing = false;
    updateSendButton();
    addMessage('처음부터 다시 시작합니다. 메일 작성을 위해 필요한 내용을 알려주세요! 😊', 'ai');
}

/**
 * executeSendMail - 실제 sendMail 실행 (내부 함수)
 */
function executeSendMail(to, subject, body) {
    Agent.state.step = 'SENDING';
    isProcessing = true;
    updateSendButton();
    showTyping(true);

    // 도구 호출 횟수 증가
    Agent.state.toolCallCount.sendMail = (Agent.state.toolCallCount.sendMail || 0) + 1;
    Agent.state.lastCallTime = Date.now();

    setTimeout(() => {
        showTyping(false);

        const result = {
            success: true,
            to: to,
            subject: subject,
            sentAt: new Date().toISOString(),
            messageId: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6)
        };

        Agent.state.result = result;
        Agent.state.step = 'COMPLETE';

        observe(`✅ 메일 발송 성공! (Message ID: ${result.messageId})`);

        const sentHtml = `
            <strong>✅ 메일이 성공적으로 발송되었습니다!</strong>
            <div class="draft-preview" style="border-color:rgba(22,163,74,0.3);background:rgba(22,163,74,0.06);">
                <div class="label" style="color:#16a34a;">📬 발송 완료</div>
                <div class="field">
                    <span class="field-name">받는 사람:</span>
                    <span class="field-value">${escapeHtml(to)}</span>
                </div>
                <div class="field">
                    <span class="field-name">제목:</span>
                    <span class="field-value">${escapeHtml(subject)}</span>
                </div>
                <div class="field">
                    <span class="field-name">발송 시간:</span>
                    <span class="field-value">${formatTime(new Date())}</span>
                </div>
                <div class="field">
                    <span class="field-name">Message ID:</span>
                    <span class="field-value" style="font-size:11px;font-family:monospace;">${result.messageId}</span>
                </div>
            </div>
            <div style="margin-top:8px;font-size:13px;color:var(--time-color);">
                다른 메일을 보내시려면 새로운 요청을 입력해주세요.
            </div>
        `;

        addMessage(sentHtml, 'ai');

        // IDLE로 복귀
        setTimeout(() => {
            Agent.state.step = 'IDLE';
            Agent.state.request = '';
            Agent.state.to = '';
            Agent.state.subject = '';
            Agent.state.body = '';
            Agent.state.draft = null;
            Agent.state.previewConfirmed = false;
            Agent.state.result = null;
            isAwaitingUserResponse = false;
            isProcessing = false;
            updateSendButton();
        }, 500);

    }, 1500);
}

/**
 * sendMail - 실제 발송 도구 (ask 등급, 외부 직접 호출용)
 * showPreview → confirmSend를 통해서만 실행되어야 함
 */
function sendMail(to, subject, body) {
    // 직접 호출 방지 — 반드시 confirmSend를 통해야 함
    think('sendMail 직접 호출 감지. 가드레일 검사 후 처리.');
    act('sendMail', `발송 요청: → ${to}`);

    // 직접 호출 시 가드레일 검사
    const context = {
        to: to,
        previewConfirmed: Agent.state.previewConfirmed,
        toolCallCount: Agent.state.toolCallCount,
        lastCallTime: Agent.state.lastCallTime
    };

    const guardCheck = Guard.checkAll('sendMail', context);
    if (!guardCheck.ok) {
        if (guardCheck.retryExceeded) {
            observe(`sendMail 5회 실패: ${guardCheck.message}`);
            // 재시도 초과 시에도 결과를 지어내지 않음 (No Hallucination)
            const failHtml = `
                <div style="padding:10px;background:rgba(239,68,68,0.08);border-radius:8px;border-left:3px solid #ef4444;">
                    <strong>⚠️ 메일 발송 실패</strong><br>
                    <span style="font-size:13px;">${escapeHtml(guardCheck.message)}</span>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-cancel" onclick="cancelAfterRetry()">종료</button>
                    <button class="btn btn-primary" onclick="retryFromStart()">다시 시도</button>
                </div>
            `;
            addMessage(failHtml, 'ai');
            return;
        }

        observe(`가드레일 차단: ${guardCheck.message}`);
        addMessage(`<div style="padding:8px;background:rgba(239,68,68,0.08);border-radius:8px;font-size:13px;">⚠️ ${escapeHtml(guardCheck.message)}</div>`, 'ai');
        return;
    }

    executeSendMail(to, subject, body);
}

/**
 * escapeHtml - HTML 특수문자 이스케이프
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * getRandomSender - 임의 발신자 생성
 */
function getRandomSender() {
    const senders = [
        '보낸 사람 올림',
        '감사합니다. 홍길동 드림',
        '고맙습니다. 발송자 드림'
    ];
    return senders[Math.floor(Math.random() * senders.length)];
}