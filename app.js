// ============================================================
//  APP — 메일링 에이전트 AI
//  Agent 상태 + TAO 엔진 + 추론 + UI + 이벤트
// ============================================================

// ---------- DOM Elements ----------
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');
const themeToggle = document.getElementById('themeToggle');
const clearChatBtn = document.getElementById('clearChat');
const stopBtn = document.getElementById('stopBtn');
const taoLog = document.getElementById('taoLog');
const taoEmpty = document.getElementById('taoEmpty');

// ---------- State ----------
let isProcessing = false;
let isAwaitingUserResponse = false;

// ============================================================
//  AGENT STATE (5 Elements)
// ============================================================

const Agent = {
    // --- Goal ---
    goal: '사용자의 요청을 바탕으로 메일을 작성하고 미리보기 후 확인을 거쳐 발송한다',

    // --- Plan (steps) ---
    plan: ['IDLE', 'COLLECTING', 'COMPOSING', 'PREVIEW', 'CONFIRM', 'SENDING', 'COMPLETE'],

    // --- State ---
    state: {
        step: 'IDLE',
        request: '',
        to: '',
        subject: '',
        body: '',
        draft: null,
        previewConfirmed: false,
        result: null,
        history: [],
        toolCallCount: {},
        lastCallTime: 0,
        isStopped: false
    },

    // --- Tools ---
    tools: {
        composeMail: { name: 'composeMail', level: 'auto', desc: '메일 내용 채팅에 쓰기' },
        showPreview: { name: 'showPreview', level: 'auto', desc: '보내기 전 미리보기 제공' },
        sendMail: { name: 'sendMail', level: 'ask', desc: '실제 메일 발송 (Mock)' }
    },

    // --- Result ---
    result: null,

    reset() {
        this.state = {
            step: 'IDLE',
            request: '',
            to: '',
            subject: '',
            body: '',
            draft: null,
            previewConfirmed: false,
            result: null,
            history: [],
            toolCallCount: {},
            lastCallTime: 0,
            isStopped: false
        };
        this.result = null;
    }
};

// ============================================================
//  TAO ENGINE
// ============================================================

function think(text) {
    if (Agent.state.isStopped) return;
    Agent.state.history.push({ type: 'thought', text, time: Date.now() });
    renderTAO();
}

function act(toolName, detail) {
    if (Agent.state.isStopped) return;
    Agent.state.history.push({ type: 'action', tool: toolName, text: detail, time: Date.now() });
    renderTAO();
}

function observe(text) {
    if (Agent.state.isStopped) return;
    Agent.state.history.push({ type: 'observation', text, time: Date.now() });
    renderTAO();
}

function renderTAO() {
    const history = Agent.state.history;

    // Clear existing entries (except empty state)
    const entries = taoLog.querySelectorAll('.tao-entry');
    entries.forEach(e => e.remove());

    if (taoEmpty) taoEmpty.style.display = 'none';

    history.forEach(entry => {
        const div = document.createElement('div');
        div.className = `tao-entry ${entry.type}`;

        let label = '';
        if (entry.type === 'thought') label = '[T] 추론';
        else if (entry.type === 'action') label = '[A] 행동';
        else if (entry.type === 'observation') label = '[O] 관찰';

        let toolBadge = '';
        if (entry.type === 'action' && entry.tool) {
            const cls = entry.tool === 'composeMail' ? 'compose' :
                       entry.tool === 'showPreview' ? 'ask' : 'send';
            toolBadge = `<span class="tool-badge ${cls}">${entry.tool}</span>`;
        }

        div.innerHTML = `
            <div class="tao-label">${label}</div>
            <div class="tao-text">${toolBadge}${escapeHtml(entry.text)}</div>
        `;

        if (taoEmpty) {
            taoLog.insertBefore(div, taoEmpty);
        } else {
            taoLog.appendChild(div);
        }
    });

    // Scroll to bottom
    setTimeout(() => {
        taoLog.scrollTop = taoLog.scrollHeight;
    }, 30);
}

// ============================================================
//  AGENT REASONING ENGINE
// ============================================================

/**
 * 사용자 메시지를 분석하고 적절한 행동을 실행합니다.
 */
function processUserMessage(userText) {
    if (Agent.state.isStopped) {
        Agent.state.isStopped = false;  // 중지 해제
        Agent.state.step = 'IDLE';
        isAwaitingUserResponse = false;
        isProcessing = false;
        updateSendButton();
        return;
    }

    const text = userText.trim();

    // ==========================================
    //  [CONFIRM / PREVIEW] 단계 — 발송 승인 / 수정 처리
    // ==========================================
    if ((Agent.state.step === 'CONFIRM' || Agent.state.step === 'PREVIEW') && Agent.state.draft) {
        const lower = text.toLowerCase();

        // 발송 승인 (이미 showPreview에서 확인 버튼을 누른 후의 추가 입력)
        if (/발송|보내|전송|승인|네|응|ㅇ|yes|ok|보내줘|발송해/.test(lower) &&
            !/취소|수정|다시|안해|말아|보류/.test(lower)) {

            think('사용자가 발송을 승인함. sendMail 도구 실행.');
            Agent.state.step = 'SENDING';
            isProcessing = true;
            updateSendButton();
            sendMail(
                Agent.state.draft.to,
                Agent.state.draft.subject,
                Agent.state.draft.body
            );
            return;
        }

        // 수정 요청
        if (/수정|다시|고쳐|바꿔|재작성|수정해|다시해/.test(lower)) {
            think('사용자가 초안 수정을 요청함. 정보 재수집 시작.');
            observe('초안이 거절됨. 정보 재수집 시작.');

            Agent.state.to = '';
            Agent.state.subject = '';
            Agent.state.body = '';
            Agent.state.draft = null;
            Agent.state.previewConfirmed = false;
            Agent.state.step = 'COLLECTING';

            addMessage('알겠습니다. 다시 작성해볼게요. 먼저 <strong>받는 사람의 이메일 주소나 이름</strong>을 알려주세요.', 'ai');
            return;
        }

        // 취소
        if (/취소|안할래|그만|아니|no|취소할/.test(lower)) {
            think('사용자가 메일 작성을 취소함. IDLE 상태로 복귀.');
            observe('메일 작성이 취소됨.');
            Agent.reset();
            isAwaitingUserResponse = false;
            updateSendButton();
            addMessage('메일 작성을 취소했습니다. 필요하시면 다시 말씀해주세요! 😊', 'ai');
            return;
        }

        // 그 외 → 명확한 안내
        think('사용자의 응답이 모호함. 명확한 승인/거절 필요.');
        addMessage(
            '죄송합니다, 잘 이해하지 못했습니다.<br>' +
            '초안을 <strong>발송</strong>하려면 "발송해줘"라고 말씀해주세요.<br>' +
            '<strong>수정</strong>하려면 "수정해줘"라고 말씀해주세요.<br>' +
            '<strong>취소</strong>하려면 "취소"라고 말씀해주세요.',
            'ai'
        );
        return;
    }

    // ==========================================
    //  [COLLECTING] 단계 — 정보 수집 중
    // ==========================================
    if (Agent.state.step === 'COLLECTING') {
        collectInfo(text);
        return;
    }

    // ==========================================
    //  [IDLE] 단계 — 새로운 요청 분석
    // ==========================================
    if (Agent.state.step === 'IDLE') {
        think('새로운 메일 작성 요청 수신. 요청 분석 시작.');
        Agent.state.request = text;
        Agent.state.step = 'COLLECTING';

        // 요청에서 정보 추출 시도
        extractInfoFromRequest(text);

        // 부족한 정보 확인 후 질문
        if (Agent.state.missingInfo && Agent.state.missingInfo.length > 0) {
            const nextQuestion = getNextQuestion();
            toolAskUser(nextQuestion);
        } else {
            // 모든 정보가 추출됨 → 초안 작성
            proceedToDraft();
        }
        return;
    }

    // ==========================================
    //  [AWAITING] 일반 응답 대기 중
    // ==========================================
    if (isAwaitingUserResponse) {
        if (Agent.state.step === 'COLLECTING') {
            collectInfo(text);
        } else {
            addMessage('죄송합니다, 요청을 처리할 수 없습니다. 처음부터 다시 말씀해주세요.', 'ai');
            Agent.reset();
            isAwaitingUserResponse = false;
            updateSendButton();
        }
        return;
    }
}

/**
 * 요청에서 정보 추출 (간단한 NLP)
 */
function extractInfoFromRequest(text) {
    const missing = [];

    // 받는 사람 추출
    const toPatterns = [
        /(?:에게|한테|보낼|수신자|받는 사람)[:：\s]*([^\s,]+)/,
        /([^\s,]+)(?:에게|한테|께)\s/,
        /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
    ];

    let toName = '';
    for (const pattern of toPatterns) {
        const match = text.match(pattern);
        if (match) {
            toName = match[1].trim();
            break;
        }
    }

    if (toName && /@/.test(toName)) {
        Agent.state.to = toName;
    } else if (toName) {
        Agent.state.to = toName;
    }

    // 제목 추출
    const subjectPatterns = [
        /제목[:：\s]*(.+?)(?:\.|,|$|\n)/,
        /(?:(?:에|건|관련|대한)\s*(?:메일|이메일|회신))[:：\s]*(.+?)(?:\.|,|$|\n)/
    ];

    for (const pattern of subjectPatterns) {
        const match = text.match(pattern);
        if (match) {
            Agent.state.subject = match[1].trim();
            break;
        }
    }

    // 제목이 없으면 키워드 추출
    if (!Agent.state.subject) {
        const subjectKeywords = [
            { pattern: /회의|미팅|meeting/i, text: '회의 관련' },
            { pattern: /프로젝트|project/i, text: '프로젝트 관련' },
            { pattern: /보고|report/i, text: '보고 관련' },
            { pattern: /입사|지원|채용|면접/i, text: '입사 지원 관련' },
            { pattern: /안내|공지|notice/i, text: '안내 사항' },
            { pattern: /요청|request/i, text: '요청 사항' },
            { pattern: /감사|thanks/i, text: '감사 인사' },
            { pattern: /초대|invite/i, text: '초대' }
        ];
        for (const kw of subjectKeywords) {
            if (kw.pattern.test(text)) {
                Agent.state.subject = kw.text;
                break;
            }
        }
    }

    // 본문 추출
    const bodyPatterns = [
        /본문[:：\s]*(.+?)(?:\.\s|$|\n)/,
        /내용[:：\s]*(.+?)(?:\.\s|$|\n)/,
        /다음과\s*(?:같|은|이).*?[:：](.+?)$/
    ];

    for (const pattern of bodyPatterns) {
        const match = text.match(pattern);
        if (match && match[1].trim().length > 5) {
            Agent.state.body = match[1].trim();
            break;
        }
    }

    // 부족한 정보 확인
    if (!Agent.state.to) missing.push('받는 사람');
    if (!Agent.state.subject) missing.push('제목');
    if (!Agent.state.body) missing.push('본문 내용');

    Agent.state.missingInfo = missing;
}

/**
 * 수집 단계에서 사용자 응답 처리
 */
function collectInfo(text) {
    const missing = Agent.state.missingInfo || [];

    if (missing.includes('받는 사람')) {
        const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
        if (emailMatch) {
            Agent.state.to = emailMatch[1];
        } else {
            const name = text.trim();
            Agent.state.to = name;
            if (!/@/.test(name)) {
                think(`받는 사람 이름 "${name}" 확인. 이메일 주소 추가 필요.`);
                Agent.state.to = name;
                Agent.state.missingInfo = missing.filter(m => m !== '받는 사람');
                Agent.state.missingInfo.push('받는 사람 이메일 주소');
                const nextQ = '받는 분의 <strong>이메일 주소</strong>도 알려주세요. (예: hong@example.com)';
                toolAskUser(nextQ);
                return;
            }
        }
        think(`받는 사람 정보 수집 완료: ${Agent.state.to}`);
        observe(`받는 사람: ${Agent.state.to}`);
        Agent.state.missingInfo = missing.filter(m => m !== '받는 사람' && m !== '받는 사람 이메일 주소');
    }
    else if (missing.includes('받는 사람 이메일 주소')) {
        const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
        if (emailMatch) {
            Agent.state.to = Agent.state.to ? `${Agent.state.to} <${emailMatch[1]}>` : emailMatch[1];
            think(`받는 사람 이메일 주소 수집 완료: ${emailMatch[1]}`);
            observe(`받는 사람 이메일: ${emailMatch[1]}`);
            Agent.state.missingInfo = missing.filter(m => m !== '받는 사람 이메일 주소');
        } else {
            toolAskUser('올바른 <strong>이메일 주소</strong>를 입력해주세요. (예: hong@example.com)');
            return;
        }
    }
    else if (Agent.state.to && !/@/.test(Agent.state.to) && !missing.includes('받는 사람 이메일 주소') && !missing.includes('받는 사람')) {
        const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
        if (emailMatch) {
            Agent.state.to = `${Agent.state.to} <${emailMatch[1]}>`;
            think(`이메일 주소 추가: ${emailMatch[1]}`);
            observe(`받는 사람: ${Agent.state.to}`);
        } else {
            if (!Agent.state.subject) {
                Agent.state.subject = text.trim();
                think(`제목 수집: ${Agent.state.subject}`);
                observe(`제목: ${Agent.state.subject}`);
                Agent.state.missingInfo = missing.filter(m => m !== '제목');
            } else if (!Agent.state.body) {
                Agent.state.body = text.trim();
                think(`본문 수집 완료`);
                observe(`본문: ${text.substring(0, 50)}...`);
                Agent.state.missingInfo = missing.filter(m => m !== '본문 내용');
            }
        }
    }
    else if (missing.includes('제목')) {
        Agent.state.subject = text.trim();
        think(`제목 수집 완료: ${Agent.state.subject}`);
        observe(`제목: ${Agent.state.subject}`);
        Agent.state.missingInfo = missing.filter(m => m !== '제목');
    }
    else if (missing.includes('본문 내용') || missing.includes('본문')) {
        Agent.state.body = text.trim();
        think(`본문 수집 완료`);
        observe(`본문: ${text.substring(0, 60)}...`);
        Agent.state.missingInfo = missing.filter(m => m !== '본문 내용' && m !== '본문');
    }

    // 아직 부족한 정보가 있으면 계속 질문
    const updatedMissing = Agent.state.missingInfo || [];
    if (updatedMissing.length > 0) {
        const nextQuestion = getNextQuestion();
        toolAskUser(nextQuestion);
    } else {
        proceedToDraft();
    }
}

/**
 * 다음 질문 생성
 */
function getNextQuestion() {
    const missing = Agent.state.missingInfo || [];
    if (missing.length === 0) return null;

    const first = missing[0];
    switch (first) {
        case '받는 사람':
        case '받는 사람 이메일 주소':
            return '메일을 받을 분의 <strong>이름 또는 이메일 주소</strong>를 알려주세요.';
        case '제목':
            return '메일의 <strong>제목</strong>을 알려주세요.';
        case '본문 내용':
        case '본문':
            return '메일 본문에 포함할 <strong>내용</strong>을 알려주세요.';
        default:
            return `${first}에 대해 알려주세요.`;
    }
}

/**
 * 초안 작성 진행
 */
function proceedToDraft() {
    const { to, subject, body } = Agent.state;

    if (!to || !subject || !body) {
        think('정보가 불충분함. 추가 수집 필요.');
        Agent.state.missingInfo = [];
        if (!to) Agent.state.missingInfo.push('받는 사람');
        if (!subject) Agent.state.missingInfo.push('제목');
        if (!body) Agent.state.missingInfo.push('본문 내용');
        const nextQuestion = getNextQuestion();
        toolAskUser(nextQuestion);
        return;
    }

    think('모든 정보 수집 완료. composeMail → showPreview 실행.');
    Agent.state.step = 'COMPOSING';

    // 본문 보강
    let finalBody = body;
    if (body.length < 20) {
        finalBody = `${body}\n\n감사합니다.\n${getRandomSender()}`;
    } else {
        finalBody = `${body}\n\n감사합니다.\n${getRandomSender()}`;
    }

    // 1. composeMail로 메일 내용 표시
    composeMail(to, subject, finalBody);

    // 2. showPreview로 미리보기 + 확인 버튼 표시
    setTimeout(() => {
        showPreview(to, subject, finalBody);
    }, 300);
}

/**
 * toolAskUser - 사용자에게 질문 (가드레일 적용)
 */
function toolAskUser(question) {
    // 콘텐츠 안전 검사
    const safetyCheck = Guard.checkContentSafety(question);
    if (!safetyCheck.safe) {
        addMessage(safetyCheck.response.replace(/\n/g, '<br>'), 'ai');
        Guard.log('콘텐츠 차단', safetyCheck.type);
        return;
    }

    act('composeMail', question);
    isAwaitingUserResponse = true;
    isProcessing = false;
    updateSendButton();

    addMessage(question, 'ai');
}

// ============================================================
//  UTILITY FUNCTIONS
// ============================================================

function getTimeString() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
}

function formatTime(date) {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

// ============================================================
//  UI FUNCTIONS
// ============================================================

function addMessage(html, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;

    const avatarContent = sender === 'ai' ? '📧' : '🙂';
    const timeStr = getTimeString();

    msgDiv.innerHTML = `
        ${sender === 'ai' ? `<div class="message-avatar">${avatarContent}</div>` : ''}
        <div>
            <div class="message-content">${html}</div>
            <div class="message-time">${timeStr}</div>
        </div>
        ${sender === 'user' ? `<div class="message-avatar">${avatarContent}</div>` : ''}
    `;

    chatMessages.appendChild(msgDiv);
    scrollToBottom();
}

function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 50);
}

function showTyping(show) {
    typingIndicator.classList.toggle('active', show);
    if (show) scrollToBottom();
}

function sendMessage(text) {
    // 중지 상태 체크
    if (Agent.state.isStopped) {
        Agent.state.isStopped = false;
        Agent.state.step = 'IDLE';
        isAwaitingUserResponse = false;
        isProcessing = false;
        updateSendButton();
        addMessage('다시 시작합니다. 무엇을 도와드릴까요? 😊', 'ai');
        return;
    }

    if (isProcessing) return;
    text = text.trim();
    if (!text) return;

    // 가드레일: 입력 살균
    const sanitized = Guard.sanitize(text);

    // 가드레일: 콘텐츠 안전 검사
    const safetyCheck = Guard.checkContentSafety(sanitized);
    if (!safetyCheck.safe) {
        addMessage(safetyCheck.response.replace(/\n/g, '<br>'), 'ai');
        think(`콘텐츠 안전 규칙 위반 감지: ${safetyCheck.type}`);
        act('composeMail', '콘텐츠 검사 결과 거부');
        observe(`거부 사유: ${safetyCheck.type}`);
        return;
    }

    // 사용자 메시지 표시
    addMessage(escapeHtml(sanitized), 'user');

    // 입력창 초기화
    userInput.value = '';
    updateSendButton();

    // 처리 중 플래그
    if (!isAwaitingUserResponse) {
        isProcessing = true;
        showTyping(true);

        setTimeout(() => {
            showTyping(false);
            processUserMessage(sanitized);
        }, 500 + Math.random() * 400);
    } else {
        if (Agent.state.step === 'COLLECTING' || Agent.state.step === 'PREVIEW' || Agent.state.step === 'CONFIRM') {
            isProcessing = true;
            showTyping(true);

            setTimeout(() => {
                showTyping(false);
                processUserMessage(sanitized);
            }, 400 + Math.random() * 300);
        }
    }
}

function updateSendButton() {
    sendBtn.disabled = !userInput.value.trim() || isProcessing;
}

function clearChat() {
    const messages = chatMessages.querySelectorAll('.message');
    for (let i = 1; i < messages.length; i++) {
        messages[i].remove();
    }

    const welcome = chatMessages.querySelector('.message');
    if (welcome) {
        welcome.querySelector('.message-content').innerHTML =
            '<strong>메일링 에이전트 AI</strong><br>' +
            '안녕하세요! 📬 저는 메일 작성을 도와주는 AI 비서입니다.<br>' +
            '<br>' +
            '예를 들어 이렇게 말씀해주세요:<br>' +
            '• <em>"홍길동님께 프로젝트 회의 메일 보내줘"</em><br>' +
            '• <em>"김철수에게 입사 지원 관련 메일 작성해줘"</em><br>' +
            '• <em>"오후 3시 미팅 관련 메일 보내려고 해"</em>';
        welcome.querySelector('.message-time').textContent = '방금 전';
    }

    Agent.reset();
    isAwaitingUserResponse = false;
    isProcessing = false;
    updateSendButton();

    const entries = taoLog.querySelectorAll('.tao-entry');
    entries.forEach(e => e.remove());
    if (taoEmpty) taoEmpty.style.display = '';
    scrollToBottom();
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        themeToggle.title = '다크 모드';
        localStorage.setItem('mailagent-theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        themeToggle.title = '라이트 모드';
        localStorage.setItem('mailagent-theme', 'dark');
    }
}

function loadTheme() {
    const saved = localStorage.getItem('mailagent-theme');
    if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        themeToggle.title = '라이트 모드';
    }
}

/**
 * stopAgent - 비상 정지
 */
function stopAgent() {
    Agent.state.isStopped = true;
    Agent.state.step = 'IDLE';
    isProcessing = false;
    isAwaitingUserResponse = false;
    showTyping(false);
    updateSendButton();

    observe('🛑 사용자가 비상 정지를 실행함. 모든 행동 중단.');

    addMessage('🛑 모든 작업을 중단했습니다. 다시 시작하려면 메시지를 입력해주세요.', 'ai');
}

// ============================================================
//  EVENT LISTENERS
// ============================================================

sendBtn.addEventListener('click', () => {
    sendMessage(userInput.value);
});

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(userInput.value);
    }
});

userInput.addEventListener('input', updateSendButton);

themeToggle.addEventListener('click', toggleTheme);

if (stopBtn) {
    stopBtn.addEventListener('click', stopAgent);
}

clearChatBtn.addEventListener('click', () => {
    if (chatMessages.querySelectorAll('.message').length > 1) {
        if (confirm('대화를 초기화하시겠습니까?')) {
            clearChat();
        }
    }
});

// ============================================================
//  INITIALIZE
// ============================================================

loadTheme();
updateSendButton();
scrollToBottom();

console.log('📧 메일링 에이전트 AI 로드 완료');
console.log('Goal:', Agent.goal);
console.log('Tools:', Object.keys(Agent.tools).join(', '));
console.log('Plan:', Agent.plan.join(' → '));

// 초기 TAO 기록
think('에이전트 초기화 완료. 사용자 입력 대기 중.');
observe('IDLE 상태. 메일 작성 요청을 기다리는 중.');