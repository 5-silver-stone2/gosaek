# 슈팅게임 배포 안내 (GitHub Pages)

이 문서는 `슈팅게임` 폴더를 GitHub에 올려 GitHub Pages로 배포하는 간단한 안내입니다.

1) 준비
- Git이 설치되어 있어야 합니다. (https://git-scm.com/)
- GitHub 계정이 필요합니다.
- 선택사항: `gh`(GitHub CLI)를 설치하면 편리합니다.

2) 방법 A — GitHub 웹에서 새 레포지토리 생성 (초보자용)
1. GitHub에 로그인하고 `New repository`를 클릭합니다.
2. 레포 이름(예: `my-game`)을 입력하고 `Create repository`를 클릭합니다.
3. 발표용 PC에서 `슈팅게임` 폴더 상위(또는 폴더 자체)에서 다음을 실행:

```bash
cd path/to/슈팅게임/..   # 또는 슈팅게임 폴더 내부에서 올릴 경우 그 폴더에서
git init
git add .
git commit -m "Add shooting game"
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

4. GitHub 웹사이트에서 해당 레포의 `Settings` → `Pages`로 이동하여 Source를 `main` branch / `root`로 선택하고 저장하세요.
5. 배포 URL은 보통 `https://USERNAME.github.io/REPO/` 형태입니다. 폴더를 통째로 업로드한 경우 게임 페이지는 `https://USERNAME.github.io/REPO/슈팅게임/index.html` 로 접근합니다.

3) 방법 B — GitHub CLI로 빠르게 생성 및 푸시

```bash
cd path/to/슈팅게임/..
gh repo create REPO --public --source=. --remote=origin --push
```

이후 GitHub 웹의 Pages 설정에서 배포 상태를 확인하세요. (또는 GitHub가 자동으로 Pages를 설정해줄 수 있습니다.)

4) 빠른 링크/발표용 팁
- PPT 하이퍼링크: 슬라이드에서 텍스트나 이미지 선택 → `삽입` → `하이퍼링크`에 배포된 URL을 붙여넣기.
- QR 코드: URL을 QR 코드로 만들어 슬라이드에 이미지로 넣으면 발표자가 쉽게 접속 가능.
- 루트로 바로 접속시키려면 `슈팅게임` 폴더 안의 파일들을 레포 루트(또는 `docs/`)로 옮겨 `index.html`이 루트에 위치하도록 하세요.

5) 문제 해결
- 페이지가 바로 뜨지 않으면 GitHub Pages 설정에서 올바른 브랜치와 경로가 선택되었는지 확인하세요.
- 캐시 문제일 경우 브라우저에서 강력 새로고침(Windows: `Ctrl+F5`)을 시도하세요.

문제가 있으면 레포지토리 이름과 GitHub 사용자명을 알려주시면 제가 배포 URL을 예상해서 확인해드릴게요.
