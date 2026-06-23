const careers = {
  ai: {
    id: "ai",
    title: "AI 개발자",
    short: "모델을 학습시키고 서비스에 적용하는 진로",
    reasons: [
      "데이터를 이용해 예측하거나 자동화하는 문제에 관심이 큰 편입니다.",
      "수학, 확률, 모델 실험처럼 결과를 조금씩 개선하는 활동과 잘 맞습니다.",
      "챗봇, 추천 시스템, 이미지 분류처럼 실제 서비스에 AI를 붙이는 진로로 확장하기 좋습니다."
    ],
    label: "AI",
    color: "#2563eb",
    schools: ["서울대 컴퓨터공학부", "KAIST 전산학부", "고려대 인공지능학과", "성균관대 소프트웨어학과"],
    subjects: ["수학", "확률과 통계", "미적분", "정보", "영어"],
    certificates: ["ADsP", "SQLD", "정보처리기사", "TensorFlow 또는 PyTorch 프로젝트"],
    skills: ["Python", "선형대수", "머신러닝", "데이터 전처리", "모델 평가"],
    projects: ["이미지 분류기", "챗봇", "추천 시스템", "학교 데이터 예측 모델"],
    actions: ["Python 기초 문법 30일 학습", "Kaggle 또는 공공데이터 분석 1개 완성", "머신러닝 모델 학습 기록 작성", "AI 윤리와 저작권 사례 정리", "GitHub에 결과물과 보고서 업로드"],
    references: [
      { title: "TensorFlow 튜토리얼", url: "https://www.tensorflow.org/tutorials?hl=ko", description: "AI 모델 학습 실습 자료" },
      { title: "PyTorch 튜토리얼", url: "https://pytorch.org/tutorials/", description: "딥러닝 프레임워크 학습 자료" },
      { title: "AI Hub", url: "https://www.aihub.or.kr/", description: "AI 학습용 데이터와 활용 사례" }
    ]
  },
  software: {
    id: "software",
    title: "소프트웨어 개발자",
    short: "앱, 웹, 프로그램을 설계하고 구현하는 진로",
    reasons: [
      "아이디어를 실제로 작동하는 기능으로 만드는 답변이 많이 선택되었습니다.",
      "오류를 찾고 고치거나, 코드를 구조적으로 나누는 활동과 잘 맞습니다.",
      "웹, 앱, 서버 API 등 다양한 분야로 넓게 진출할 수 있는 기본 진로입니다."
    ],
    label: "SW",
    color: "#0f766e",
    schools: ["서울대 컴퓨터공학부", "KAIST 전산학부", "한양대 컴퓨터소프트웨어학부", "숭실대 소프트웨어학부"],
    subjects: ["수학", "정보", "영어", "국어", "물리"],
    certificates: ["정보처리기사", "리눅스마스터", "COS Pro", "컴퓨터활용능력"],
    skills: ["JavaScript", "자료구조", "알고리즘", "API", "Git"],
    projects: ["할 일 관리 앱", "학교 공지 검색 사이트", "로그인 기능이 있는 게시판", "모바일 웹 앱"],
    actions: ["프로그래밍 언어 하나 선택", "자료구조 10개 개념 정리", "웹 또는 앱 프로젝트 2개 완성", "GitHub 커밋 기록 만들기", "사용자 피드백을 받아 기능 1개 개선"],
    references: [
      { title: "MDN Web Docs", url: "https://developer.mozilla.org/ko/", description: "HTML, CSS, JavaScript 공식급 학습 문서" },
      { title: "GitHub Docs", url: "https://docs.github.com/ko", description: "코드 관리와 협업 학습 자료" },
      { title: "Q-Net 정보처리기사", url: "https://www.q-net.or.kr/", description: "국가자격 정보 확인" }
    ]
  },
  data: {
    id: "data",
    title: "데이터 분석가",
    short: "숫자와 기록에서 의미를 찾아 의사결정을 돕는 진로",
    reasons: [
      "자료를 모으고 그래프로 해석하며 근거를 찾는 답변이 강하게 나타났습니다.",
      "확률과 통계, SQL, 시각화처럼 데이터를 정리하는 활동과 잘 맞습니다.",
      "분석 보고서와 대시보드 포트폴리오를 만들기 좋은 진로입니다."
    ],
    label: "DATA",
    color: "#e57a44",
    schools: ["서울대 데이터사이언스 관련 전공", "연세대 인공지능융합대학", "고려대 데이터과학 관련 전공", "성균관대 데이터사이언스융합전공"],
    subjects: ["확률과 통계", "수학", "정보", "사회", "영어"],
    certificates: ["SQLD", "ADsP", "빅데이터분석기사", "컴퓨터활용능력"],
    skills: ["Excel", "SQL", "Python pandas", "시각화", "가설 검증"],
    projects: ["급식 만족도 분석", "학습 시간과 성적 상관 분석", "지역 공공데이터 대시보드", "설문 결과 시각화"],
    actions: ["스프레드시트 함수 정리", "SQL 기본 문법 학습", "공공데이터 하나 선택", "그래프 5종으로 분석 보고서 작성", "분석 결과를 발표 자료로 만들기"],
    references: [
      { title: "데이터자격시험", url: "https://www.dataq.or.kr/", description: "SQLD, ADsP 등 데이터 자격 정보" },
      { title: "공공데이터포털", url: "https://www.data.go.kr/", description: "분석 프로젝트용 공공데이터" },
      { title: "pandas 문서", url: "https://pandas.pydata.org/docs/", description: "Python 데이터 분석 도구 문서" }
    ]
  },
  security: {
    id: "security",
    title: "정보보안 전문가",
    short: "시스템을 공격과 사고로부터 보호하는 진로",
    reasons: [
      "위험, 허점, 인증, 개인정보 보호 같은 안전 문제에 관심이 높게 나타났습니다.",
      "네트워크와 Linux를 이해하고 기록을 추적하는 활동과 잘 맞습니다.",
      "보안은 기술 실력뿐 아니라 윤리와 법 기준을 함께 익혀야 하는 분야입니다."
    ],
    label: "SEC",
    color: "#be3455",
    schools: ["고려대 사이버국방학과", "세종대 정보보호학과", "아주대 사이버보안학과", "국민대 정보보안암호수학과"],
    subjects: ["정보", "수학", "영어", "물리", "윤리"],
    certificates: ["정보보안기사", "네트워크관리사", "리눅스마스터", "정보처리기사"],
    skills: ["네트워크", "Linux", "암호 기초", "웹 취약점", "로그 분석"],
    projects: ["모의 침투 실습 보고서", "비밀번호 안전성 검사기", "웹 보안 체크리스트", "로그 이상 탐지"],
    actions: ["Linux 명령어 30개 익히기", "네트워크 기본 구조 그리기", "웹 취약점 사례 5개 정리", "CTF 입문 문제 풀기", "보안 윤리와 법적 기준 정리"],
    references: [
      { title: "KISA 한국인터넷진흥원", url: "https://www.kisa.or.kr/", description: "국내 정보보호 정책과 보안 자료" },
      { title: "OWASP", url: "https://owasp.org/", description: "웹 보안 취약점 학습 자료" },
      { title: "Q-Net 국가자격", url: "https://www.q-net.or.kr/", description: "정보보안 관련 자격 확인" }
    ]
  },
  game: {
    id: "game",
    title: "게임 · 콘텐츠 개발자",
    short: "규칙, 화면, 상호작용을 만들어 플레이 경험을 설계하는 진로",
    reasons: [
      "규칙, 화면, 조작감, 사용자 반응을 직접 설계하는 활동에 강한 흥미가 보입니다.",
      "프로토타입을 만들고 테스트를 받아 개선하는 방식과 잘 맞습니다.",
      "코딩, 수학, 미술, 스토리텔링을 함께 연결할 수 있는 창작형 진로입니다."
    ],
    label: "GAME",
    color: "#348f63",
    schools: ["한국공학대 게임공학과", "청강문화산업대 게임콘텐츠스쿨", "동국대 멀티미디어공학과", "홍익대 게임소프트웨어 관련 전공"],
    subjects: ["정보", "수학", "미술", "물리", "국어"],
    certificates: ["게임프로그래밍전문가", "Unity 프로젝트", "정보처리기사", "컴퓨터그래픽스운용기능사"],
    skills: ["Unity", "C#", "게임 수학", "레벨 디자인", "사용자 테스트"],
    projects: ["2D 점프 게임", "퍼즐 게임", "대화형 스토리", "간단한 멀티플레이 프로토타입"],
    actions: ["게임 아이디어 3개 문서화", "Unity 또는 웹 게임 튜토리얼 완료", "조작 가능한 프로토타입 제작", "친구 3명에게 테스트 받기", "수정 전후 플레이 영상을 정리"],
    references: [
      { title: "Unity Learn", url: "https://learn.unity.com/", description: "Unity 게임 제작 학습 자료" },
      { title: "Unreal Engine 문서", url: "https://dev.epicgames.com/documentation/ko-kr/unreal-engine", description: "언리얼 엔진 공식 문서" },
      { title: "한국콘텐츠진흥원", url: "https://www.kocca.kr/", description: "콘텐츠 산업과 진로 참고 자료" }
    ]
  },
  cloud: {
    id: "cloud",
    title: "클라우드 · 인프라 엔지니어",
    short: "서비스가 안정적으로 돌아가도록 서버와 배포 환경을 관리하는 진로",
    reasons: [
      "서비스가 안정적으로 실행되고 배포되는 과정에 관심이 큰 답변이 많았습니다.",
      "Linux, 네트워크, 서버 상태 점검처럼 시스템 전체를 보는 활동과 잘 맞습니다.",
      "웹 서비스가 실제 사용자에게 전달되는 환경을 책임지는 진로입니다."
    ],
    label: "CLOUD",
    color: "#6b5bd2",
    schools: ["KAIST 전산학부", "광운대 컴퓨터정보공학부", "인하대 컴퓨터공학과", "부산대 정보컴퓨터공학부"],
    subjects: ["정보", "수학", "영어", "물리", "기술가정"],
    certificates: ["리눅스마스터", "네트워크관리사", "AWS Cloud Practitioner", "정보처리기사"],
    skills: ["Linux", "네트워크", "Docker", "CI/CD", "모니터링"],
    projects: ["정적 사이트 배포", "Docker로 웹 서버 실행", "자동 배포 파이프라인", "서버 상태 대시보드"],
    actions: ["Linux 기본 명령어 연습", "개인 웹사이트 배포", "도메인과 HTTPS 개념 정리", "Docker로 로컬 서비스 실행", "장애 상황 대응 기록 작성"],
    references: [
      { title: "AWS Skill Builder", url: "https://skillbuilder.aws/", description: "클라우드 기초와 AWS 학습 자료" },
      { title: "Docker Docs", url: "https://docs.docker.com/", description: "컨테이너와 배포 환경 학습 문서" },
      { title: "Microsoft Learn", url: "https://learn.microsoft.com/ko-kr/training/", description: "클라우드와 인프라 학습 자료" }
    ]
  }
};

const surveyQuestions = [
  {
    text: "새로운 기술을 배울 때 가장 끌리는 활동은?",
    options: [
      ["데이터로 예측 모델을 만들어 본다", { ai: 3, data: 1 }],
      ["작동하는 프로그램을 끝까지 만든다", { software: 3, cloud: 1 }],
      ["숨은 위험과 허점을 찾아본다", { security: 3 }],
      ["재미있는 규칙과 화면을 만든다", { game: 3 }]
    ]
  },
  {
    text: "문제가 생겼을 때 가장 먼저 하는 행동은?",
    options: [
      ["로그와 숫자를 모아 원인을 찾는다", { data: 3, cloud: 1 }],
      ["작은 단위로 코드를 나눠 테스트한다", { software: 3 }],
      ["공격 가능성과 권한 문제를 확인한다", { security: 3 }],
      ["사용자가 어떤 장면에서 막혔는지 본다", { game: 2, software: 1 }]
    ]
  },
  {
    text: "가장 재미있게 느껴지는 수업 활동은?",
    options: [
      ["확률과 통계로 결과를 해석하기", { data: 3, ai: 1 }],
      ["알고리즘 문제 해결하기", { software: 3, ai: 1 }],
      ["네트워크 구조 그리기", { cloud: 3, security: 1 }],
      ["게임 규칙을 바꾸며 밸런스 맞추기", { game: 3 }]
    ]
  },
  {
    text: "팀 프로젝트에서 자연스럽게 맡는 역할은?",
    options: [
      ["핵심 기능 구현", { software: 3 }],
      ["데이터 정리와 발표 자료", { data: 3 }],
      ["배포와 오류 확인", { cloud: 3 }],
      ["시나리오와 상호작용 설계", { game: 3 }]
    ]
  },
  {
    text: "다음 중 가장 오래 붙잡고 해결할 수 있는 일은?",
    options: [
      ["모델 정확도를 조금씩 높이기", { ai: 3 }],
      ["복잡한 버그를 재현하고 고치기", { software: 3 }],
      ["수상한 접속 기록 추적하기", { security: 3 }],
      ["서버가 끊기지 않게 설정하기", { cloud: 3 }]
    ]
  },
  {
    text: "관심 있는 결과물에 가장 가까운 것은?",
    options: [
      ["대화형 챗봇", { ai: 3, software: 1 }],
      ["편리한 웹 서비스", { software: 3 }],
      ["분석 대시보드", { data: 3 }],
      ["플레이 가능한 게임", { game: 3 }]
    ]
  },
  {
    text: "컴퓨터 과목에서 더 파고들고 싶은 주제는?",
    options: [
      ["인공지능과 학습 데이터", { ai: 3 }],
      ["자료구조와 알고리즘", { software: 3 }],
      ["암호와 인증", { security: 3 }],
      ["서버와 네트워크", { cloud: 3 }]
    ]
  },
  {
    text: "보고서를 쓴다면 가장 쓰고 싶은 주제는?",
    options: [
      ["AI가 사회에 미치는 영향", { ai: 3 }],
      ["공공데이터로 본 지역 문제", { data: 3 }],
      ["개인정보 보호와 해킹 대응", { security: 3 }],
      ["게임 몰입감을 만드는 요소", { game: 3 }]
    ]
  },
  {
    text: "처음 보는 오류 메시지를 만났을 때 느낌은?",
    options: [
      ["원인을 추적하는 과정이 흥미롭다", { software: 2, cloud: 1 }],
      ["환경 설정부터 다시 확인한다", { cloud: 3 }],
      ["보안 경고인지 먼저 살핀다", { security: 3 }],
      ["데이터가 잘못 들어갔는지 본다", { data: 3 }]
    ]
  },
  {
    text: "가장 배우고 싶은 도구는?",
    options: [
      ["PyTorch 또는 TensorFlow", { ai: 3 }],
      ["React 또는 Node.js", { software: 3 }],
      ["SQL과 BI 도구", { data: 3 }],
      ["Unity 또는 Unreal", { game: 3 }]
    ]
  },
  {
    text: "친구에게 도움을 준다면 어떤 도움을 주고 싶은가요?",
    options: [
      ["앱 기능을 만들어 준다", { software: 3 }],
      ["자료를 분석해 결론을 알려준다", { data: 3 }],
      ["계정과 기기 보안 점검을 해준다", { security: 3 }],
      ["웹사이트를 배포해 준다", { cloud: 3 }]
    ]
  },
  {
    text: "복잡한 개념을 배울 때 선호하는 방식은?",
    options: [
      ["수식과 예제로 원리를 이해한다", { ai: 2, data: 1 }],
      ["작게 만들고 실행하면서 이해한다", { software: 3 }],
      ["그림으로 흐름과 연결을 그린다", { cloud: 2, security: 1 }],
      ["플레이 테스트로 감각을 확인한다", { game: 3 }]
    ]
  },
  {
    text: "가장 중요하게 생각하는 가치에 가까운 것은?",
    options: [
      ["새로운 가능성", { ai: 3 }],
      ["사용자 편의", { software: 3 }],
      ["정확한 근거", { data: 3 }],
      ["안전과 신뢰", { security: 3 }]
    ]
  },
  {
    text: "대회나 활동을 고른다면?",
    options: [
      ["AI 모델 경진대회", { ai: 3 }],
      ["해커톤", { software: 3, cloud: 1 }],
      ["CTF 보안 대회", { security: 3 }],
      ["게임잼", { game: 3 }]
    ]
  },
  {
    text: "컴퓨터를 잘한다는 말을 듣는다면 어떤 의미였으면 하나요?",
    options: [
      ["똑똑한 자동화 모델을 만든다", { ai: 3 }],
      ["무엇이든 서비스로 구현한다", { software: 3 }],
      ["숫자로 설득력 있게 설명한다", { data: 3 }],
      ["시스템을 안정적으로 운영한다", { cloud: 3 }]
    ]
  },
  {
    text: "다음 중 가장 덜 지루한 반복 작업은?",
    options: [
      ["데이터 라벨과 품질 점검", { ai: 2, data: 1 }],
      ["코드 리팩터링", { software: 3 }],
      ["취약점 체크리스트 확인", { security: 3 }],
      ["맵과 난이도 반복 조정", { game: 3 }]
    ]
  },
  {
    text: "미래에 일하고 싶은 환경은?",
    options: [
      ["연구실이나 AI 스타트업", { ai: 3 }],
      ["서비스 개발팀", { software: 3 }],
      ["데이터 기반 의사결정팀", { data: 3 }],
      ["보안 관제 또는 침해 대응팀", { security: 3 }]
    ]
  },
  {
    text: "프로젝트를 공개한다면 가장 보여주고 싶은 것은?",
    options: [
      ["정확도가 개선되는 그래프", { ai: 3, data: 1 }],
      ["깔끔하게 동작하는 기능", { software: 3 }],
      ["공격을 막은 분석 과정", { security: 3 }],
      ["배포 자동화와 안정성", { cloud: 3 }]
    ]
  },
  {
    text: "어려운 수학을 만났을 때 반응은?",
    options: [
      ["모델 원리와 연결되면 해볼 만하다", { ai: 3 }],
      ["필요한 만큼 찾아서 적용한다", { software: 2, cloud: 1 }],
      ["통계 해석에 쓰이면 흥미롭다", { data: 3 }],
      ["게임 물리나 그래픽에 쓰이면 좋다", { game: 3 }]
    ]
  },
  {
    text: "가장 먼저 완성해 보고 싶은 포트폴리오는?",
    options: [
      ["이미지나 텍스트를 분류하는 AI", { ai: 3 }],
      ["로그인과 데이터 저장이 되는 웹 앱", { software: 3 }],
      ["차트가 있는 분석 보고서", { data: 3 }],
      ["서버에 배포된 안정적인 서비스", { cloud: 3 }]
    ]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initNetworkCanvas();
  initCareerExplorer();
  initCareerLibrary();
  initSurvey();
});

function initNetworkCanvas() {
  const canvas = document.querySelector("#networkCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const nodes = [
    { x: 0.22, y: 0.26, label: "AI", color: "#60a5fa" },
    { x: 0.68, y: 0.20, label: "DATA", color: "#f4b63f" },
    { x: 0.80, y: 0.52, label: "SEC", color: "#fb7185" },
    { x: 0.48, y: 0.42, label: "SW", color: "#2dd4bf" },
    { x: 0.24, y: 0.70, label: "GAME", color: "#74d680" },
    { x: 0.66, y: 0.76, label: "CLOUD", color: "#a78bfa" }
  ];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * ratio);
    canvas.height = Math.floor(rect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function draw(time) {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "rgba(255,255,255,0.035)";
    for (let i = 0; i < 36; i += 1) {
      const x = (i * 67 + time * 0.012) % rect.width;
      const y = (i * 41 + Math.sin(time / 900 + i) * 16 + rect.height) % rect.height;
      ctx.beginPath();
      ctx.arc(x, y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }

    nodes.forEach((node, index) => {
      nodes.slice(index + 1).forEach((other) => {
        const x1 = node.x * rect.width;
        const y1 = node.y * rect.height;
        const x2 = other.x * rect.width;
        const y2 = other.y * rect.height;
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });
    });

    nodes.forEach((node, index) => {
      const pulse = Math.sin(time / 520 + index) * 5;
      const x = node.x * rect.width;
      const y = node.y * rect.height;
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(x, y, 28 + pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#13202b";
      ctx.font = "800 13px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.label, x, y);
    });

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}

function initCareerExplorer() {
  const reveal = document.querySelector("#blankReveal");
  const picker = document.querySelector("#careerPicker");
  const host = document.querySelector("#careerDetailHost");
  if (!reveal || !picker || !host) return;

  const showPicker = () => {
    reveal.classList.add("is-hidden");
    picker.hidden = false;
    picker.innerHTML = Object.values(careers).map((career) => `
      <button class="career-chip" type="button" data-career="${career.id}" style="--chip-color:${career.color}">
        <strong>${career.title}</strong>
        <span>${career.short}</span>
      </button>
    `).join("");

    picker.querySelectorAll(".career-chip").forEach((button) => {
      button.addEventListener("click", () => {
        picker.querySelectorAll(".career-chip").forEach((chip) => chip.classList.remove("is-active"));
        button.classList.add("is-active");
        renderCareerDetail(careers[button.dataset.career], host, { checklist: true });
      });
    });
  };

  reveal.addEventListener("click", showPicker);
  reveal.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showPicker();
    }
  });
}

function initCareerLibrary() {
  const library = document.querySelector("#careerLibrary");
  if (!library) return;

  library.innerHTML = Object.values(careers).map((career) => `
    <article class="library-card" style="--card-color:${career.color}">
      <h3>${career.title}</h3>
      <p>${career.short}</p>
      <div class="tag-list">
        ${career.skills.slice(0, 4).map((skill) => `<span>${skill}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function initSurvey() {
  const form = document.querySelector("#surveyForm");
  if (!form) return;

  form.innerHTML = surveyQuestions.map((question, index) => `
    <fieldset class="question-card">
      <legend>${index + 1}. ${question.text}</legend>
      <div class="option-grid">
        ${question.options.map((option, optionIndex) => `
          <label class="option-card">
            <input type="radio" name="q${index}" value="${optionIndex}">
            <span>${option[0]}</span>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `).join("");

  const resetButton = document.querySelector("#surveyReset");
  const progressText = document.querySelector("#surveyProgressText");
  const progressBar = document.querySelector("#surveyProgressBar");
  const result = document.querySelector("#surveyResult");
  const summary = document.querySelector("#resultSummary");
  const detail = document.querySelector("#resultDetail");

  const updateProgress = () => {
    const answered = new FormData(form);
    const count = Array.from(answered.keys()).length;
    progressText.textContent = `${count} / ${surveyQuestions.length}`;
    progressBar.style.width = `${(count / surveyQuestions.length) * 100}%`;
  };

  form.addEventListener("change", updateProgress);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);

    if (Array.from(data.keys()).length < surveyQuestions.length) {
      const firstMissing = surveyQuestions.findIndex((_, index) => !data.has(`q${index}`));
      const missingCard = form.querySelectorAll(".question-card")[firstMissing];
      missingCard.scrollIntoView({ behavior: "smooth", block: "center" });
      missingCard.animate(
        [{ outline: "0 solid rgba(190,52,85,0)" }, { outline: "4px solid rgba(190,52,85,0.25)" }, { outline: "0 solid rgba(190,52,85,0)" }],
        { duration: 900 }
      );
      return;
    }

    const scores = Object.fromEntries(Object.keys(careers).map((id) => [id, 0]));
    const selectedAnswers = [];
    let possible = 0;

    surveyQuestions.forEach((question, index) => {
      const selected = Number(data.get(`q${index}`));
      const selectedOption = question.options[selected];
      const weights = selectedOption[1];
      const maxForQuestion = Math.max(...question.options.map((option) => Math.max(...Object.values(option[1]))));
      possible += maxForQuestion;
      selectedAnswers.push({
        question: question.text,
        answer: selectedOption[0],
        weights
      });

      Object.entries(weights).forEach(([careerId, value]) => {
        scores[careerId] += value;
      });
    });

    const ranked = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([id, score]) => ({ ...careers[id], score }));

    result.hidden = false;
    renderSurveyOutcome(ranked, selectedAnswers, possible, ranked[0].id, summary, detail);
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  resetButton.addEventListener("click", () => {
    form.reset();
    updateProgress();
    result.hidden = true;
    summary.innerHTML = "";
    detail.innerHTML = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateProgress();
}

function renderSurveyOutcome(ranked, selectedAnswers, possible, selectedCareerId, summary, detail) {
  const selectedCareer = ranked.find((career) => career.id === selectedCareerId) || ranked[0];
  const topScore = Math.max(ranked[0].score, 1);
  const match = Math.max(48, Math.round((selectedCareer.score / possible) * 100));
  const evidence = buildRecommendationEvidence(selectedCareer.id, selectedAnswers);

  summary.innerHTML = `
    <div class="result-summary">
      <div class="result-title" style="--career-color:${selectedCareer.color}">
        <p class="eyebrow">추천 결과</p>
        <h2>${selectedCareer.title}</h2>
        <p>${selectedCareer.short}</p>
        <div class="top-career-actions">
          ${ranked.slice(0, 3).map((career) => `
            <button class="mini-button ${career.id === selectedCareer.id ? "is-active" : ""}" type="button" data-result-career="${career.id}">
              ${career.title}
            </button>
          `).join("")}
          <a class="mini-button" href="index.html#recommendation-board">메인 추천 보드</a>
        </div>
      </div>
      <div class="score-list">
        ${ranked.map((career) => `
          <div class="score-row">
            <div class="score-label">
              <span>${career.title}</span>
              <span>${career.score}점</span>
            </div>
            <div class="score-bar"><span style="--score-color:${career.color}; width:${Math.round((career.score / topScore) * 100)}%"></span></div>
          </div>
        `).join("")}
        <strong>${selectedCareer.title} 적합도 ${match}%</strong>
      </div>
    </div>

    <div class="result-support-grid" style="--career-color:${selectedCareer.color}">
      <section class="reason-panel">
        <h3>왜 이 진로를 추천했나요?</h3>
        ${renderReasonList(selectedCareer.reasons)}
      </section>
      <section class="reason-panel">
        <h3>내 답변에서 보인 근거</h3>
        ${renderEvidenceList(evidence)}
      </section>
      <section class="reason-panel">
        <h3>참고 자료</h3>
        ${renderReferenceLinks(selectedCareer.references)}
      </section>
    </div>
  `;

  renderCareerDetail(selectedCareer, detail, { checklist: false });

  summary.querySelectorAll("[data-result-career]").forEach((button) => {
    button.addEventListener("click", () => {
      renderSurveyOutcome(ranked, selectedAnswers, possible, button.dataset.resultCareer, summary, detail);
    });
  });
}

function buildRecommendationEvidence(careerId, selectedAnswers) {
  return selectedAnswers
    .filter((item) => item.weights[careerId])
    .sort((a, b) => b.weights[careerId] - a.weights[careerId])
    .slice(0, 5)
    .map((item) => ({
      question: item.question,
      answer: item.answer,
      point: item.weights[careerId]
    }));
}

function renderReasonList(reasons = []) {
  return `
    <ul class="reason-list">
      ${reasons.map((reason) => `<li>${reason}</li>`).join("")}
    </ul>
  `;
}

function renderEvidenceList(evidence) {
  if (!evidence.length) {
    return `
      <ul class="reason-list">
        <li>이 진로는 보조 점수로 추천 후보에 포함되었습니다. 상위 진로와 함께 비교해 보세요.</li>
      </ul>
    `;
  }

  return `
    <ul class="evidence-list">
      ${evidence.map((item) => `
        <li>
          <strong>${item.question}</strong>
          <span>${item.answer}</span>
          <em>+${item.point}점</em>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderReferenceLinks(references = []) {
  return `
    <div class="reference-list">
      ${references.map((reference) => `
        <a href="${reference.url}" target="_blank" rel="noreferrer">
          <strong>${reference.title}</strong>
          <span>${reference.description}</span>
        </a>
      `).join("")}
    </div>
  `;
}

function renderCareerDetail(career, host, options = {}) {
  if (!career || !host) return;

  host.innerHTML = `
    <article class="career-detail" style="--career-color:${career.color}">
      <div class="career-detail-head">
        <div>
          <h3>${career.title}</h3>
          <p>${career.short}</p>
        </div>
        <span class="career-badge">${career.label}</span>
      </div>

      <div class="detail-grid">
        ${renderDetailBlock("추천 학교", career.schools)}
        ${renderDetailBlock("필요 과목", career.subjects)}
        ${renderDetailBlock("자격증 · 활동", career.certificates)}
        ${renderDetailBlock("핵심 역량", career.skills)}
        ${renderDetailBlock("추천 프로젝트", career.projects)}
        ${renderDetailBlock("준비 성적", getScoreGuide(career.id))}
      </div>

      ${options.checklist ? `
        <div class="task-block">
          <h4>해야 할 일</h4>
          <ul class="task-list" data-task-career="${career.id}">
            ${career.actions.map((action, index) => `
              <li>
                <label>
                  <input class="task-checkbox" type="checkbox" data-task="${index}">
                  <span>${action}</span>
                </label>
              </li>
            `).join("")}
          </ul>
        </div>
      ` : ""}
    </article>
  `;

  if (options.checklist) {
    attachTaskCompletion(host);
  }
}

function renderDetailBlock(title, items) {
  return `
    <section class="detail-block">
      <h4>${title}</h4>
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>
  `;
}

function getScoreGuide(careerId) {
  const guides = {
    ai: ["수학 상위권 유지", "확률과 통계 심화", "영어 논문 독해 연습"],
    software: ["정보 과목 성취도 관리", "수학 기본기 유지", "알고리즘 풀이 기록"],
    data: ["확률과 통계 집중", "수학과 사회 탐구 연결", "분석 보고서 기록"],
    security: ["정보와 수학 기초", "네트워크 개념 정리", "윤리와 법 기준 이해"],
    game: ["정보와 수학 기초", "미술 또는 스토리 표현", "프로토타입 완성 경험"],
    cloud: ["정보와 영어 문서 독해", "네트워크와 운영체제", "꾸준한 실습 기록"]
  };
  return guides[careerId] || [];
}

function attachTaskCompletion(scope) {
  const checks = Array.from(scope.querySelectorAll(".task-checkbox"));
  checks.forEach((check) => {
    check.addEventListener("change", () => {
      if (checks.length > 0 && checks.every((item) => item.checked)) {
        showReadyBanner();
        launchFireworks();
      }
    });
  });
}

function showReadyBanner() {
  const banner = document.querySelector("#readyBanner");
  if (!banner) return;

  banner.classList.add("is-visible");
  window.setTimeout(() => {
    banner.classList.remove("is-visible");
  }, 2400);
}

function launchFireworks() {
  const canvas = document.querySelector("#fireworkCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const colors = ["#2563eb", "#0f766e", "#e57a44", "#be3455", "#f4b63f", "#6b5bd2"];
  const particles = [];
  const start = performance.now();

  function resize() {
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function burst(x, y) {
    for (let i = 0; i < 42; i += 1) {
      const angle = (Math.PI * 2 * i) / 42;
      const speed = 2 + Math.random() * 4;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  resize();
  canvas.style.display = "block";
  burst(window.innerWidth * 0.28, window.innerHeight * 0.34);
  burst(window.innerWidth * 0.72, window.innerHeight * 0.30);
  burst(window.innerWidth * 0.50, window.innerHeight * 0.48);

  function frame(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.035;
      particle.life -= 0.015;

      ctx.globalAlpha = Math.max(particle.life, 0);
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;

    if (elapsed < 2100) {
      requestAnimationFrame(frame);
    } else {
      canvas.style.display = "none";
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  requestAnimationFrame(frame);
}