const computerQuizQuestions = [
  {
    type: "choice",
    category: "프로그래밍",
    question: "다음 JavaScript 코드의 실행 결과는 무엇인가요?",
    code: "let total = 0;\nfor (let i = 1; i <= 4; i += 1) {\n  if (i % 2 === 0) total += i;\n}\nconsole.log(total);",
    options: ["4", "6", "10", "오류가 발생한다"],
    answer: 1,
    explanation: "`i`가 1부터 4까지 증가하며 짝수인 2와 4만 `total`에 더합니다. 따라서 2 + 4 = 6입니다. 반복문을 볼 때는 각 반복의 변수 값과 조건식 결과를 표로 적으면 실수를 줄일 수 있습니다.",
    concept: "반복문과 조건문",
    source: { title: "MDN - for 문", url: "https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for" }
  },
  {
    type: "choice",
    category: "프로그래밍",
    question: "함수의 매개변수(parameter)와 인수(argument)에 대한 설명으로 가장 알맞은 것은?",
    options: ["둘은 항상 같은 변수를 뜻한다", "매개변수는 함수 정의에, 인수는 함수 호출에 사용된다", "인수는 함수 안에서만 선언할 수 있다", "매개변수는 반환값과 같은 뜻이다"],
    answer: 1,
    explanation: "매개변수는 `function add(a, b)`의 `a`, `b`처럼 함수가 입력을 받을 자리를 정의한 이름입니다. 인수는 `add(2, 3)`의 2와 3처럼 호출할 때 실제로 전달하는 값입니다.",
    concept: "함수와 입력값",
    source: { title: "MDN - 함수", url: "https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Functions" }
  },
  {
    type: "choice",
    category: "프로그래밍",
    question: "객체지향 프로그래밍에서 캡슐화의 주된 목적은?",
    options: ["모든 데이터를 전역 변수로 만든다", "내부 상태와 구현을 감추고 정해진 방법으로 접근하게 한다", "클래스를 하나만 사용한다", "프로그램의 실행 속도를 항상 두 배로 높인다"],
    answer: 1,
    explanation: "캡슐화는 객체 내부의 데이터와 구현 세부사항을 보호하고, 메서드 같은 공개된 통로로만 다루게 하는 원칙입니다. 변경 영향과 잘못된 상태 변경을 줄이는 데 도움이 됩니다.",
    concept: "객체지향과 캡슐화",
    source: { title: "Java Tutorials - Classes and Objects", url: "https://docs.oracle.com/javase/tutorial/java/concepts/" }
  },
  {
    type: "choice",
    category: "프로그래밍",
    question: "다음 중 컴파일 오류보다 실행 중 오류에 가까운 사례는?",
    options: ["닫는 괄호를 작성하지 않음", "존재하지 않는 파일을 열려고 함", "예약어를 변수 이름으로 사용함", "문자열 따옴표를 닫지 않음"],
    answer: 1,
    explanation: "파일 경로가 문법적으로 올바르더라도 실제 파일이 없으면 프로그램 실행 중 예외가 발생할 수 있습니다. 나머지는 언어와 환경에 따라 대체로 구문 분석 단계에서 발견됩니다.",
    concept: "오류와 예외",
    source: { title: "Python Docs - Errors and Exceptions", url: "https://docs.python.org/3/tutorial/errors.html" }
  },
  {
    type: "choice",
    category: "자료구조·알고리즘",
    question: "스택(Stack)의 자료 처리 방식은?",
    options: ["먼저 들어온 자료가 먼저 나온다", "마지막에 들어온 자료가 먼저 나온다", "항상 가장 작은 값이 먼저 나온다", "무작위 순서로 나온다"],
    answer: 1,
    explanation: "스택은 LIFO(Last In, First Out) 구조입니다. 접시를 쌓는 것처럼 마지막에 넣은 항목을 먼저 꺼냅니다. 함수 호출 기록, 실행 취소, 괄호 검사 등에 활용됩니다.",
    concept: "스택",
    source: { title: "Open Data Structures - Stacks", url: "https://opendatastructures.org/ods-python/1_3_Stacks_Queues_and_Deques.html" }
  },
  {
    type: "choice",
    category: "자료구조·알고리즘",
    question: "정렬된 배열에서 이진 탐색의 평균적인 시간 복잡도는?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 1,
    explanation: "이진 탐색은 비교할 때마다 탐색 범위를 절반으로 줄입니다. 원소가 2배가 되어도 비교 횟수는 약 1번만 늘어나므로 O(log n)입니다. 단, 데이터가 정렬되어 있어야 합니다.",
    concept: "이진 탐색과 복잡도",
    source: { title: "Python Docs - bisect", url: "https://docs.python.org/3/library/bisect.html" }
  },
  {
    type: "choice",
    category: "자료구조·알고리즘",
    question: "너비 우선 탐색(BFS)을 구현할 때 가장 알맞은 자료구조는?",
    options: ["스택", "큐", "해시 집합만 사용", "우선순위와 무관한 배열 하나"],
    answer: 1,
    explanation: "BFS는 현재 정점과 가까운 정점부터 차례로 방문하므로 먼저 들어온 정점을 먼저 처리하는 큐가 적합합니다. 가중치가 없는 그래프의 최단 경로를 찾는 데 자주 사용됩니다.",
    concept: "그래프 탐색",
    source: { title: "MIT OpenCourseWare - BFS", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/lecture-13-breadth-first-search-bfs/" }
  },
  {
    type: "choice",
    category: "자료구조·알고리즘",
    question: "해시 테이블에 대한 설명으로 가장 알맞은 것은?",
    options: ["모든 탐색이 반드시 O(1)이다", "해시 함수를 이용해 키를 저장 위치와 연결한다", "자료를 항상 정렬된 상태로 저장한다", "중복 충돌은 절대 발생하지 않는다"],
    answer: 1,
    explanation: "해시 테이블은 키를 해시 함수에 넣어 저장 위치를 계산합니다. 평균 탐색은 빠르지만 서로 다른 키가 같은 위치를 가리키는 충돌이 생길 수 있어 체이닝이나 개방 주소법으로 처리합니다.",
    concept: "해시 테이블",
    source: { title: "Open Data Structures - Hash Tables", url: "https://opendatastructures.org/ods-python/5_Hash_Tables.html" }
  },
  {
    type: "choice",
    category: "운영체제·네트워크",
    question: "운영체제의 주요 역할이 아닌 것은?",
    options: ["프로세스 관리", "메모리 관리", "파일 시스템 관리", "사용자의 알고리즘 정답을 자동으로 증명"],
    answer: 3,
    explanation: "운영체제는 하드웨어 자원을 관리하고 프로그램이 실행될 환경을 제공합니다. 프로세스, 메모리, 입출력 장치, 파일 시스템 관리는 핵심 역할이지만 알고리즘 정답 증명은 운영체제의 역할이 아닙니다.",
    concept: "운영체제 역할",
    source: { title: "Operating Systems: Three Easy Pieces", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/" }
  },
  {
    type: "choice",
    category: "운영체제·네트워크",
    question: "프로세스와 스레드의 관계에 대한 설명으로 가장 알맞은 것은?",
    options: ["서로 완전히 같은 개념이다", "한 프로세스의 스레드들은 일반적으로 코드와 힙 영역을 공유한다", "스레드는 운영체제와 관계없이 항상 하나만 존재한다", "프로세스는 실행 중인 프로그램과 무관하다"],
    answer: 1,
    explanation: "프로세스는 실행 중인 프로그램의 자원 단위이고, 스레드는 그 안의 실행 흐름입니다. 같은 프로세스의 스레드는 코드·데이터·힙 등을 공유하지만 각자 스택과 실행 상태를 가집니다.",
    concept: "프로세스와 스레드",
    source: { title: "OSTEP - Concurrency", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf" }
  },
  {
    type: "choice",
    category: "운영체제·네트워크",
    question: "웹 브라우저에서 HTTPS를 사용하는 가장 중요한 이유는?",
    options: ["화면 해상도를 높이기 위해", "통신 내용을 암호화하고 서버 신원을 확인하기 위해", "HTML 파일 크기를 무조건 줄이기 위해", "인터넷 연결 없이 웹을 사용하기 위해"],
    answer: 1,
    explanation: "HTTPS는 HTTP 통신을 TLS로 보호합니다. 전송 데이터의 기밀성과 무결성을 높이고 인증서를 통해 접속한 서버의 신원을 확인합니다. 암호화가 곧 사이트의 모든 콘텐츠가 안전하다는 뜻은 아닙니다.",
    concept: "HTTPS와 TLS",
    source: { title: "MDN - HTTPS", url: "https://developer.mozilla.org/ko/docs/Glossary/HTTPS" }
  },
  {
    type: "choice",
    category: "운영체제·네트워크",
    question: "DNS가 수행하는 핵심 기능은?",
    options: ["도메인 이름을 IP 주소와 연결한다", "웹 페이지의 디자인을 저장한다", "비밀번호를 자동 생성한다", "CPU 명령어를 번역한다"],
    answer: 0,
    explanation: "DNS는 `example.com`처럼 사람이 읽기 쉬운 도메인 이름을 서버의 IP 주소와 연결하는 분산 이름 체계입니다. 브라우저는 이 결과를 이용해 목적지 서버에 접속합니다.",
    concept: "DNS",
    source: { title: "Cloudflare Learning - DNS", url: "https://www.cloudflare.com/learning/dns/what-is-dns/" }
  },
  {
    type: "choice",
    category: "DB·컴퓨터구조",
    question: "관계형 데이터베이스에서 기본 키(Primary Key)의 역할은?",
    options: ["행을 고유하게 식별한다", "모든 값을 문자열로 바꾼다", "테이블 이름을 숨긴다", "중복 행을 반드시 생성한다"],
    answer: 0,
    explanation: "기본 키는 테이블의 각 행을 고유하게 식별합니다. 일반적으로 중복될 수 없고 NULL이 될 수 없습니다. 다른 테이블의 외래 키가 이 값을 참조해 관계를 만듭니다.",
    concept: "관계형 데이터베이스 키",
    source: { title: "PostgreSQL Docs - Constraints", url: "https://www.postgresql.org/docs/current/ddl-constraints.html" }
  },
  {
    type: "choice",
    category: "DB·컴퓨터구조",
    question: "SQL에서 조건에 맞는 행만 조회할 때 주로 사용하는 절은?",
    options: ["WHERE", "ORDER BY", "CREATE", "DROP"],
    answer: 0,
    explanation: "`WHERE`는 조회·수정·삭제할 행의 조건을 지정합니다. `ORDER BY`는 결과 정렬, `CREATE`는 객체 생성, `DROP`은 객체 삭제에 사용됩니다.",
    concept: "SQL 조회",
    source: { title: "PostgreSQL Tutorial - WHERE", url: "https://www.postgresql.org/docs/current/tutorial-select.html" }
  },
  {
    type: "choice",
    category: "DB·컴퓨터구조",
    question: "CPU 캐시 메모리를 사용하는 주된 이유는?",
    options: ["보조기억장치를 영구 삭제하기 위해", "CPU와 주기억장치의 속도 차이를 줄이기 위해", "인터넷 주소를 저장하기 위해", "운영체제를 대신하기 위해"],
    answer: 1,
    explanation: "CPU는 주기억장치보다 훨씬 빠르므로 자주 쓰거나 곧 쓸 가능성이 높은 데이터를 가까운 캐시에 둡니다. 이는 시간적·공간적 지역성을 활용해 평균 메모리 접근 시간을 줄입니다.",
    concept: "메모리 계층과 캐시",
    source: { title: "Nand2Tetris - Computer Architecture", url: "https://www.nand2tetris.org/course" }
  },
  {
    type: "written",
    category: "자료구조·알고리즘",
    question: "배열과 연결 리스트의 차이를 '메모리 배치'와 '원소 삽입·접근' 관점에서 설명하세요.",
    keywords: [["연속", "연속적"], ["인덱스", "접근"], ["노드", "포인터", "링크"], ["삽입", "삭제"]],
    modelAnswer: "배열은 원소가 메모리에 연속적으로 배치되어 인덱스로 빠르게 접근할 수 있지만, 중간 삽입·삭제 때 뒤 원소를 이동해야 할 수 있습니다. 연결 리스트는 노드가 포인터(링크)로 이어져 연속 배치가 필요 없고 위치를 알고 있다면 삽입·삭제가 쉽지만, 특정 인덱스에 접근하려면 앞에서부터 순회해야 합니다.",
    explanation: "핵심은 배열의 O(1) 임의 접근과 연결 리스트의 O(n) 순차 접근을 구분하는 것입니다. 삽입 복잡도는 삽입 위치를 찾는 비용까지 포함하는지에 따라 달라지므로 조건을 함께 말해야 정확합니다.",
    concept: "선형 자료구조 비교",
    source: { title: "Open Data Structures - Array/List", url: "https://opendatastructures.org/ods-python/2_Array_Based_Lists.html" }
  },
  {
    type: "written",
    category: "프로그래밍",
    question: "재귀 함수가 무엇인지 설명하고, 반드시 필요한 종료 조건의 역할을 예시와 함께 쓰세요.",
    keywords: [["자기 자신", "스스로", "재귀 호출"], ["종료 조건", "기저 조건", "base case"], ["무한", "스택 오버플로"], ["팩토리얼", "factorial", "n이 0", "n == 0"]],
    modelAnswer: "재귀 함수는 문제를 더 작은 같은 형태의 문제로 바꾸며 자기 자신을 호출하는 함수입니다. 예를 들어 팩토리얼에서 n이 0이면 1을 반환하는 기저 조건을 두고, 그 외에는 n × factorial(n-1)을 반환합니다. 종료 조건이 없거나 도달하지 못하면 호출이 계속 쌓여 스택 오버플로가 발생할 수 있습니다.",
    explanation: "재귀에는 기저 조건과 기저 조건에 가까워지는 변화가 모두 필요합니다. 단순히 `if`가 있다고 끝나는 것이 아니라 매 호출의 입력이 종료 상태로 수렴해야 합니다.",
    concept: "재귀",
    source: { title: "Python Docs - Defining Functions", url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" }
  },
  {
    type: "written",
    category: "운영체제·네트워크",
    question: "TCP와 UDP의 차이를 연결 방식, 신뢰성, 사용 사례를 포함해 설명하세요.",
    keywords: [["연결 지향", "연결형"], ["신뢰", "순서", "재전송"], ["비연결", "연결하지"], ["게임", "스트리밍", "DNS"]],
    modelAnswer: "TCP는 연결 지향 프로토콜로 순서 보장, 오류 확인, 손실 시 재전송을 제공해 웹 문서나 파일 전송처럼 신뢰성이 중요한 통신에 적합합니다. UDP는 연결 설정과 재전송 보장이 없어 오버헤드가 작으며, 일부 손실보다 지연이 중요한 실시간 게임, 음성·영상 스트리밍, DNS 등에 사용됩니다.",
    explanation: "UDP가 언제나 TCP보다 빠르다고 단정하기보다, 기본 프로토콜 기능과 오버헤드가 적다고 표현하는 것이 정확합니다. 애플리케이션이 UDP 위에서 별도의 신뢰성 기능을 구현할 수도 있습니다.",
    concept: "전송 계층 프로토콜",
    source: { title: "MDN - TCP", url: "https://developer.mozilla.org/ko/docs/Glossary/TCP" }
  },
  {
    type: "written",
    category: "DB·컴퓨터구조",
    question: "데이터베이스 정규화를 하는 이유를 데이터 중복과 갱신 이상 관점에서 설명하세요.",
    keywords: [["중복"], ["갱신 이상", "삽입 이상", "삭제 이상"], ["테이블", "분리"], ["일관성", "무결성"]],
    modelAnswer: "정규화는 한 테이블에 반복되는 데이터를 적절한 관계의 여러 테이블로 분리해 중복을 줄이는 과정입니다. 같은 사실이 여러 행에 저장되면 일부만 수정되거나, 필요한 데이터의 삽입·삭제가 다른 정보에 영향을 주는 갱신 이상이 생길 수 있습니다. 정규화는 데이터 일관성과 무결성을 유지하는 데 도움을 줍니다.",
    explanation: "정규화는 무조건 테이블을 많이 나누는 작업이 아닙니다. 함수적 종속성을 기준으로 구조를 개선하는 과정이며, 실제 시스템에서는 조회 성능을 위해 의도적으로 반정규화를 선택하기도 합니다.",
    concept: "데이터베이스 정규화",
    source: { title: "Microsoft Learn - Database Normalization", url: "https://learn.microsoft.com/en-us/troubleshoot/microsoft-365-apps/access/database-normalization-description" }
  },
  {
    type: "written",
    category: "DB·컴퓨터구조",
    question: "10진수 13을 2진수로 변환하는 과정을 설명하고 최종 값을 쓰세요.",
    keywords: [["1101"], ["2", "나누"], ["나머지"], ["역순", "거꾸로"]],
    modelAnswer: "13을 2로 계속 나누면 13÷2=6 나머지 1, 6÷2=3 나머지 0, 3÷2=1 나머지 1, 1÷2=0 나머지 1입니다. 나머지를 마지막 것부터 역순으로 읽으면 1101₂가 됩니다.",
    explanation: "각 자릿수의 값으로 확인하면 1101₂ = 1×8 + 1×4 + 0×2 + 1×1 = 13입니다. 컴퓨터는 두 상태를 안정적으로 표현하기 쉬워 데이터를 0과 1의 비트로 다룹니다.",
    concept: "진법과 이진수",
    source: { title: "Nand2Tetris - Boolean Arithmetic", url: "https://www.nand2tetris.org/course" }
  }
];

const quizCategoryGuides = {
  "프로그래밍": {
    color: "#2563eb",
    advice: "짧은 코드를 손으로 추적한 뒤 직접 실행해 결과를 비교하세요. 함수, 변수 범위, 예외, 객체지향 개념을 작은 예제로 설명하는 연습이 효과적입니다.",
    practice: "MDN JavaScript Guide 또는 Python 공식 튜토리얼에서 예제를 바꿔 실행하고, 매일 한 문제씩 코드의 실행 과정을 표로 기록하세요."
  },
  "자료구조·알고리즘": {
    color: "#0f766e",
    advice: "자료구조의 동작을 그림으로 그리고, 연산별 시간 복잡도를 조건과 함께 비교하세요. 정답 코드 암기보다 입력 크기에 따라 연산 횟수가 어떻게 변하는지 설명해야 합니다.",
    practice: "배열, 연결 리스트, 스택, 큐를 직접 구현한 뒤 이진 탐색과 BFS 문제를 풀고 시간 복잡도를 한 줄로 적으세요."
  },
  "운영체제·네트워크": {
    color: "#be3455",
    advice: "용어를 독립적으로 외우기보다 요청이 브라우저에서 서버까지 가는 흐름과 프로그램이 실행되는 흐름에 연결하세요.",
    practice: "프로세스·스레드 비교표를 만들고 DNS 조회, TCP 연결, HTTPS 통신 순서를 그림으로 설명해 보세요."
  },
  "DB·컴퓨터구조": {
    color: "#e57a44",
    advice: "SQL은 직접 테이블을 만들고 조회하면서 익히고, 컴퓨터 구조는 데이터가 비트에서 메모리와 CPU를 거쳐 처리되는 순서로 연결해 공부하세요.",
    practice: "작은 학생-과목 데이터베이스를 설계해 기본 키와 외래 키를 표시하고, 2진수 변환과 캐시 지역성 예시를 반복하세요."
  }
};

document.addEventListener("DOMContentLoaded", initComputerQuiz);

function initComputerQuiz() {
  const form = document.querySelector("#computerQuizForm");
  if (!form) return;

  const result = document.querySelector("#quizResult");
  const summary = document.querySelector("#quizSummary");
  const review = document.querySelector("#quizReview");
  const progressText = document.querySelector("#quizProgressText");
  const progressBar = document.querySelector("#quizProgressBar");
  const resetButton = document.querySelector("#quizReset");

  form.innerHTML = computerQuizQuestions.map(renderQuizQuestion).join("");

  const updateProgress = () => {
    const data = new FormData(form);
    const completed = computerQuizQuestions.filter((question, index) => {
      const value = String(data.get(`quiz${index}`) || "").trim();
      return question.type === "choice" ? data.has(`quiz${index}`) : value.length >= 2;
    }).length;
    progressText.textContent = `${completed} / ${computerQuizQuestions.length} 완료`;
    progressBar.style.width = `${(completed / computerQuizQuestions.length) * 100}%`;
  };

  form.addEventListener("input", updateProgress);
  form.addEventListener("change", updateProgress);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const firstMissing = computerQuizQuestions.findIndex((question, index) => {
      const value = String(data.get(`quiz${index}`) || "").trim();
      return question.type === "choice" ? !data.has(`quiz${index}`) : value.length < 2;
    });

    if (firstMissing !== -1) {
      const card = form.querySelector(`[data-quiz-card="${firstMissing}"]`);
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("needs-answer");
      window.setTimeout(() => card.classList.remove("needs-answer"), 1200);
      return;
    }

    const graded = gradeComputerQuiz(data);
    renderQuizSummary(graded, summary);
    renderQuizReview(graded, review);
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  resetButton.addEventListener("click", () => {
    form.reset();
    result.hidden = true;
    summary.innerHTML = "";
    review.innerHTML = "";
    updateProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateProgress();
}

function renderQuizQuestion(question, index) {
  const number = index + 1;
  if (question.type === "written") {
    return `
      <fieldset class="question-card quiz-question written-question" data-quiz-card="${index}">
        <legend>
          <span class="question-meta"><em>${question.category}</em><b>서술형 · 8점</b></span>
          ${number}. ${question.question}
        </legend>
        <textarea name="quiz${index}" rows="6" maxlength="700" placeholder="핵심 개념과 이유를 자신의 말로 설명하세요." aria-label="${number}번 서술형 답안"></textarea>
      </fieldset>
    `;
  }

  return `
    <fieldset class="question-card quiz-question" data-quiz-card="${index}">
      <legend>
        <span class="question-meta"><em>${question.category}</em><b>객관식 · 4점</b></span>
        ${number}. ${question.question}
      </legend>
      ${question.code ? `<pre class="question-code"><code>${escapeHTML(question.code)}</code></pre>` : ""}
      <div class="option-grid">
        ${question.options.map((option, optionIndex) => `
          <label class="option-card">
            <input type="radio" name="quiz${index}" value="${optionIndex}">
            <span>${option}</span>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function gradeComputerQuiz(data) {
  const categoryScores = {};
  let total = 0;

  const answers = computerQuizQuestions.map((question, index) => {
    if (!categoryScores[question.category]) {
      categoryScores[question.category] = { earned: 0, possible: 0 };
    }

    if (question.type === "choice") {
      const selected = Number(data.get(`quiz${index}`));
      const score = selected === question.answer ? 4 : 0;
      total += score;
      categoryScores[question.category].earned += score;
      categoryScores[question.category].possible += 4;
      return { question, selected, score, possible: 4, correct: score === 4 };
    }

    const written = String(data.get(`quiz${index}`) || "").trim();
    const normalized = written.toLowerCase().replace(/\s+/g, " ");
    const matched = question.keywords.map((group) =>
      group.some((keyword) => normalized.includes(keyword.toLowerCase()))
    );
    const score = matched.filter(Boolean).length * 2;
    total += score;
    categoryScores[question.category].earned += score;
    categoryScores[question.category].possible += 8;
    return { question, written, matched, score, possible: 8, correct: score === 8 };
  });

  return { total, answers, categoryScores };
}

function renderQuizSummary(graded, host) {
  const level = getQuizLevel(graded.total);
  const categories = Object.entries(graded.categoryScores).map(([name, score]) => ({
    name,
    ...score,
    percent: Math.round((score.earned / score.possible) * 100)
  }));
  const weakCategories = [...categories].sort((a, b) => a.percent - b.percent).slice(0, 2);

  host.innerHTML = `
    <div class="quiz-score-summary">
      <section class="quiz-total-card">
        <p class="eyebrow">진단 결과</p>
        <div class="quiz-total"><strong>${graded.total}</strong><span>/ 100점</span></div>
        <h2>${level.title}</h2>
        <p>${level.message}</p>
      </section>
      <section class="category-score-card">
        <h3>영역별 점수</h3>
        ${categories.map((category) => `
          <div class="score-row">
            <div class="score-label">
              <span>${category.name}</span>
              <span>${category.earned} / ${category.possible}점</span>
            </div>
            <div class="score-bar">
              <span style="--score-color:${quizCategoryGuides[category.name].color}; width:${category.percent}%"></span>
            </div>
          </div>
        `).join("")}
      </section>
    </div>
    <div class="weakness-grid">
      ${weakCategories.map((category) => {
        const guide = quizCategoryGuides[category.name];
        return `
          <article class="weakness-card" style="--area-color:${guide.color}">
            <span>보완 우선 영역 · ${category.percent}%</span>
            <h3>${category.name}</h3>
            <p>${guide.advice}</p>
            <strong>추천 학습법</strong>
            <p>${guide.practice}</p>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderQuizReview(graded, host) {
  host.innerHTML = graded.answers.map((answer, index) => {
    const question = answer.question;
    const statusClass = answer.correct ? "is-correct" : answer.score > 0 ? "is-partial" : "is-wrong";
    const statusText = answer.correct ? "정답" : answer.score > 0 ? "부분 정답" : "오답";
    const userAnswer = question.type === "choice"
      ? question.options[answer.selected]
      : escapeHTML(answer.written);
    const correctAnswer = question.type === "choice"
      ? question.options[question.answer]
      : question.modelAnswer;

    return `
      <article class="review-card ${statusClass}">
        <div class="review-card-head">
          <div>
            <span>${question.category} · ${index + 1}번</span>
            <h3>${question.question}</h3>
          </div>
          <strong>${statusText} · ${answer.score}/${answer.possible}점</strong>
        </div>
        <div class="answer-compare">
          <section>
            <h4>내 답안</h4>
            <p>${userAnswer}</p>
          </section>
          <section>
            <h4>${question.type === "choice" ? "정답" : "모범답안"}</h4>
            <p>${correctAnswer}</p>
          </section>
        </div>
        ${question.type === "written" ? renderWrittenRubric(question, answer.matched) : ""}
        <section class="explanation-box">
          <h4>상세 해설 · ${question.concept}</h4>
          <p>${question.explanation}</p>
          <a href="${question.source.url}" target="_blank" rel="noreferrer">${question.source.title}에서 더 알아보기</a>
        </section>
      </article>
    `;
  }).join("");
}

function renderWrittenRubric(question, matched) {
  return `
    <section class="rubric-box">
      <h4>자동 채점 핵심 요소</h4>
      <div class="rubric-list">
        ${question.keywords.map((group, index) => `
          <span class="${matched[index] ? "is-found" : ""}">
            ${matched[index] ? "포함" : "보완"}: ${group.slice(0, 2).join(" / ")}
          </span>
        `).join("")}
      </div>
    </section>
  `;
}

function getQuizLevel(score) {
  if (score >= 85) {
    return { title: "핵심 개념이 탄탄합니다", message: "개념을 실제 코드와 설계 문제에 적용하는 단계로 넘어가세요. 틀린 문항은 예외 조건까지 설명할 수 있는지 확인하면 좋습니다." };
  }
  if (score >= 70) {
    return { title: "기본기를 잘 갖추고 있습니다", message: "영역별로 몇 가지 연결이 약합니다. 낮은 점수 영역의 개념을 작은 구현 과제로 다시 확인하세요." };
  }
  if (score >= 50) {
    return { title: "개념 연결을 보강할 단계입니다", message: "용어를 알고 있어도 동작 원리와 사용 상황의 연결이 부족할 수 있습니다. 해설의 예시를 직접 실행하거나 그림으로 정리하세요." };
  }
  return { title: "기초부터 차근차근 다시 연결해 보세요", message: "점수보다 약점이 드러난 것이 중요합니다. 한 번에 전 범위를 외우기보다 보완 우선 영역부터 예제 하나씩 완성하세요." };
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}