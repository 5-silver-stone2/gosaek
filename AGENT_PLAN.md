# 📋 에이전트 5요소 정의 (Agent Plan)

## 1. Goal (목표)
**사용자의 요청을 바탕으로 메일을 작성하고, 미리보기 후 확인을 거쳐 발송한다.**

---

## 2. Plan (단계)
| 단계 | 설명 |
|---|---|
| `IDLE` | 초기 상태. 사용자 입력 대기 |
| `COLLECTING` | 메일 작성에 필요한 정보(수신자, 제목, 본문) 수집 |
| `COMPOSING` | 수집된 정보로 메일 내용 작성 (`composeMail`) |
| `PREVIEW` | 작성된 메일을 미리보기 카드로 표시 (`showPreview`) |
| `CONFIRM` | 사용자의 확인 버튼 대기 |
| `SENDING` | 메일 발송 실행 (`sendMail`) |
| `COMPLETE` | 발송 완료. IDLE로 복귀 |

---

## 3. State (상태)
```javascript
{
  step: 'IDLE',              // 현재 단계
  request: '',               // 사용자 원본 요청
  to: '',                    // 받는 사람
  subject: '',               // 제목
  body: '',                  // 본문
  draft: null,               // 생성된 초안 { to, subject, body }
  previewConfirmed: false,   // 미리보기 확인 여부
  result: null,              // Mock 발송 결과
  history: [],               // TAO 기록
  toolCallCount: {},         // 도구별 호출 횟수
  lastCallTime: 0,           // 마지막 도구 호출 시간
  isStopped: false           // 중지 플래그
}
```

---

## 4. Tools (도구)

| 도구 | 등급 | 설명 | 실행 조건 |
|---|---|---|---|
| `composeMail(to, subject, body)` | 🟢 **자유(auto)** | 채팅창에 메일 내용을 예쁘게 표시 | 즉시 실행 가능 |
| `showPreview(to, subject, body)` | 🟢 **자유(auto)** | 미리보기 카드를 보여주고 확인/취소 버튼 제공 | 즉시 실행 가능 |
| `sendMail(to, subject, body)` | 🔴 **승인(ask)** | 실제 메일 발송 (Mock) | showPreview의 확인 버튼 필수 |

### 도구 등급 기준
- **자유(auto)**: 외부에 영향이 없는 도구. 사용자 승인 없이 즉시 실행.
- **승인(ask)**: 외부에 영향을 주는 도구. 미리보기 + 사용자 확인 필수.

---

## 5. Result (결과)
```javascript
// sendMail 성공 시 반환
{
  success: true,
  to: '받는사람@example.com',
  subject: '메일 제목',
  sentAt: '2026-06-16T18:00:00.000Z',
  messageId: 'msg_1234567890_abc123'
}

// 실패 시 반환
{
  success: false,
  error: '오류 메시지',
  to: '받는사람@example.com'
}