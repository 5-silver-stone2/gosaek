// ============================================================
//  GUARDRAILS — 안전 패턴 & 가드레일
//  SAFETY_POLICY.md의 모든 규칙을 코드로 검사
// ============================================================

// ---------- 친구 메일 화이트리스트 ----------
const FRIEND_EMAILS = [
    'sunny.icmbs@gmail.com',
    '2026gs20913@gosaek.hs.kr',
    '2025gs11023@gosaek.hs.kr'
];

// ---------- 허용 도구 목록 ----------
const ALLOWED_TOOLS = ['composeMail', 'showPreview', 'sendMail'];

// ---------- 도구 등급 ----------
const TOOL_LEVELS = {
    composeMail: 'auto',
    showPreview: 'auto',
    sendMail: 'ask'
};

// ---------- 콘텐츠 거부 패턴 (4유형) ----------
const REJECT_PATTERNS = {
    // 1. 욕설·비방
    abuse: [
        /시\s*발/i, /병\s*신/i, /ㄷ\s*ㅐ\s*ㅊ\s*ㅓ\s*ㄱ/i,
        /꺼\s*져/i, /뒤\s*져/i, /죽\s*어/i,
        /멍\s*청\s*이/i, /바\s*보/i, /등\s*신/i,
        /니\s*애\s*미/i, /개\s*같\s*은/i, /엿\s*먹/i,
        /fuck/i, /shit/i, /ass\s*hole/i, /idiot/i
    ],
    // 2. 차별·혐오 (맥락 포함)
    hate: [
        /여\s*자\s*(운전|주차|머리)/i, /남\s*자\s*(는|이)\s*(못|안돼|쓸모)/i,
        /외\s*국\s*인\s*(때|이|은)\s*(싫|꺼려|나가)/i,
        /장\s*애\s*인\s*(은|이)\s*(싫|불편|꺼려)/i,
        /특\s*정\s*국\s*가\s*(인|사람)\s*(때|이)\s*(싫|꺼려|나가|죽)/i,
        /인\s*종\s*(차별|주의)/i, /성\s*차\s*별/i, /혐\s*오/i
    ],
    // 3. 거짓·기만 (사칭, 허위 사유)
    fraud: [
        /(?:~인\s*척|~처럼\s*가장|사\s*칭|다\s*른\s*사\s*람\s*인\s*척)/i,
        /허\s*위\s*(내용|사실|정보)/i, /가\s*짜\s*(메일|이름|서명)/i,
        /(?:속\s*이|속\s*일|거\s*짓\s*메일|사\s*기\s*메일)/i,
        /(?:협\s*박|갈\s*취|위\s*협|사\s*기)\s*(메일|내용|이메일)/i
    ],
    // 4. 탈옥·우회 (규칙 무력화 시도)
    jailbreak: [
        /이\s*전\s*(규칙|명령|지시|말)\s*(무시|잊|취소|삭제)/i,
        /(?:역\s*할\s*극|롤\s*플\s*레\s*이)\s*(하|해)/i,
        /(?:시\s*스\s*템\s*(프롬프트|규칙|설정))\s*(무시|변경|초기화)/i,
        /(?:AI|인\s*공\s*지\s*능|챗\s*봇)\s*(역할|규칙|제한)\s*(벗|해제|풀)/i,
        /DAN/i, /do\s*anything\s*now/i, /jail\s*break/i,
        /(?:너\s*의\s*가\s*이\s*드\s*라\s*인|가\s*이\s*드\s*라\s*인\s*무시)/i
    ]
};

// ---------- XSS 위험 패턴 ----------
const XSS_PATTERNS = [
    /<script\b[^<]*(?:<\/script>)?/gi,
    /on\w+\s*=\s*["']?[^"'\s>]+/gi,
    /javascript\s*:/gi,
    /<iframe\b/i,
    /<embed\b/i,
    /<object\b/i,
    /eval\s*\(/gi,
    /document\./gi,
    /window\./gi
];

// ============================================================
//  Guard 객체
// ============================================================

const Guard = {

    /**
     * 허용된 도구인지 검사
     * @param {string} toolName
     * @returns {{ allowed: boolean, message: string }}
     */
    checkToolAllowed(toolName) {
        if (!ALLOWED_TOOLS.includes(toolName)) {
            return {
                allowed: false,
                message: `❌ 허용되지 않은 도구입니다. 사용 가능: ${ALLOWED_TOOLS.join(', ')}`
            };
        }
        return { allowed: true, message: '' };
    },

    /**
     * 친구 메일 주소인지 검사
     * @param {string} email
     * @returns {{ isFriend: boolean, message: string }}
     */
    checkFriendEmail(email) {
        const cleanEmail = email.trim().toLowerCase();
        if (!FRIEND_EMAILS.includes(cleanEmail)) {
            return {
                isFriend: false,
                message: `❌ 친구 메일 주소만 발송 가능합니다.\n등록된 친구: ${FRIEND_EMAILS.join(', ')}`
            };
        }
        return { isFriend: true, message: '' };
    },

    /**
     * 미리보기 확인 상태 검사
     * @param {boolean} previewConfirmed
     * @returns {{ ok: boolean, message: string }}
     */
    checkPreviewConfirm(previewConfirmed) {
        if (!previewConfirmed) {
            return {
                ok: false,
                message: '❌ 미리보기에서 [✅ 확인] 버튼을 먼저 눌러주세요.'
            };
        }
        return { ok: true, message: '' };
    },

    /**
     * 동일 도구 5회 호출 제한 검사
     * @param {string} toolName
     * @param {Object} toolCallCount
     * @returns {{ ok: boolean, count: number, message: string }}
     */
    checkToolRetryLimit(toolName, toolCallCount) {
        const count = (toolCallCount[toolName] || 0);
        if (count >= 5) {
            return {
                ok: false,
                count,
                message: `❌ "${toolName}" 도구를 ${count}회 호출했지만 계속 실패했습니다.\n종료하시겠습니까? "다시 시도"라고 말씀해주시면 처음부터 다시 시작합니다.`
            };
        }
        return { ok: true, count, message: '' };
    },

    /**
     * 입력값 살균 (XSS 방지 + 길이 제한)
     * @param {string} input
     * @returns {string}
     */
    sanitize(input) {
        let text = input || '';

        // XSS 패턴 제거
        XSS_PATTERNS.forEach(pattern => {
            text = text.replace(pattern, '');
        });

        // HTML 태그 제거
        text = text.replace(/<[^>]*>/g, '');

        // 과도한 특수문자 반복 정리 (예: !!!!!!!!! → !)
        text = text.replace(/([!@#$%^&*()_+={}\[\]|;:',.<>?/~`])\1{4,}/g, '$1');

        // 최대 500자 제한
        text = text.substring(0, 500);

        return text.trim();
    },

    /**
     * 호출 빈도 제한 검사 (3초)
     * @param {number} lastCallTime
     * @returns {{ ok: boolean, message: string }}
     */
    checkRateLimit(lastCallTime) {
        const now = Date.now();
        if (lastCallTime > 0 && (now - lastCallTime) < 3000) {
            const remaining = Math.ceil((3000 - (now - lastCallTime)) / 1000);
            return {
                ok: false,
                message: `⏳ 잠시 후에 다시 시도해주세요. (${remaining}초 후 가능)`
            };
        }
        return { ok: true, message: '' };
    },

    /**
     * 콘텐츠 안전성 검사 (4유형 거부)
     * @param {string} text
     * @returns {{ safe: boolean, type: string, response: string }}
     */
    checkContentSafety(text) {
        const checks = [
            {
                key: 'abuse',
                label: '욕설·비방',
                patterns: REJECT_PATTERNS.abuse,
                reason: '욕설이나 비방하는 표현이 포함되어 있어 도움을 드릴 수 없습니다.',
                alternative: '대신 친구에게 예의 바르게 전하고 싶은 내용을 말씀해주시면 도와드릴게요. 😊'
            },
            {
                key: 'hate',
                label: '차별·혐오',
                patterns: REJECT_PATTERNS.hate,
                reason: '특정 개인이나 집단을 차별하거나 혐오하는 내용은 도와드릴 수 없습니다.',
                alternative: '모두가 존중받는 따뜻한 메일을 작성해볼까요? 어떤 내용을 전하고 싶으신가요?'
            },
            {
                key: 'fraud',
                label: '거짓·기만',
                patterns: REJECT_PATTERNS.fraud,
                reason: '사칭이나 허위 내용이 포함된 메일 작성은 도와드릴 수 없습니다.',
                alternative: '정직하고 진실된 내용으로 메일을 작성해드릴게요. 필요한 내용을 알려주세요.'
            },
            {
                key: 'jailbreak',
                label: '탈옥·우회',
                patterns: REJECT_PATTERNS.jailbreak,
                reason: '안전 규칙을 우회하려는 시도는 도와드릴 수 없습니다.',
                alternative: '규칙 안에서 안전하게 도와드릴 수 있는 일이 있으면 말씀해주세요. 😊'
            }
        ];

        for (const check of checks) {
            for (const pattern of check.patterns) {
                if (pattern.test(text)) {
                    return {
                        safe: false,
                        type: check.key,
                        response: [
                            `🚫 죄송합니다, 해당 요청은 처리할 수 없습니다.`,
                            `사유: ${check.reason}`,
                            `${check.alternative}`
                        ].join('\n\n')
                    };
                }
            }
        }

        return { safe: true, type: '', response: '' };
    },

    /**
     * 감사 로깅 (TAO 기록)
     * @param {string} event
     * @param {string} detail
     */
    log(event, detail) {
        const entry = {
            type: 'observation',
            text: `[가드레일] ${event}: ${detail}`,
            time: Date.now()
        };
        if (typeof Agent !== 'undefined' && Agent.state) {
            Agent.state.history.push(entry);
            if (typeof renderTAO === 'function') {
                renderTAO();
            }
        }
    },

    /**
     * 모든 가드레일을 통과해야 sendMail 실행 가능
     * @param {string} toolName
     * @param {Object} context
     * @returns {{ ok: boolean, message: string }}
     */
    checkAll(toolName, context) {
        // 1. 도구 허용 검사
        const toolCheck = this.checkToolAllowed(toolName);
        if (!toolCheck.allowed) {
            this.log('도구 차단', toolCheck.message);
            return { ok: false, message: toolCheck.message };
        }

        // 2. sendMail 전용 검사
        if (toolName === 'sendMail') {
            // 수신자 검사
            const emailCheck = this.checkFriendEmail(context.to);
            if (!emailCheck.isFriend) {
                this.log('발송 거부', emailCheck.message);
                return { ok: false, message: emailCheck.message };
            }

            // 미리보기 확인 검사
            const previewCheck = this.checkPreviewConfirm(context.previewConfirmed);
            if (!previewCheck.ok) {
                this.log('발송 차단', previewCheck.message);
                return { ok: false, message: previewCheck.message };
            }
        }

        // 3. 재시도 횟수 검사
        const retryCheck = this.checkToolRetryLimit(toolName, context.toolCallCount);
        if (!retryCheck.ok) {
            this.log('재시도 초과', retryCheck.message);
            return { ok: false, message: retryCheck.message, retryExceeded: true };
        }

        // 4. Rate Limit 검사
        const rateCheck = this.checkRateLimit(context.lastCallTime);
        if (!rateCheck.ok) {
            this.log('Rate Limit', rateCheck.message);
            return { ok: false, message: rateCheck.message };
        }

        return { ok: true, message: '' };
    }
};