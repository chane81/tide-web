# 이슈 트래커: Local Markdown

이 저장소의 스펙과 티켓은 `docs/progress/` 아래 markdown 파일로 관리한다. (`.scratch/`는 쓰지 않는다.)

## 규칙

- 기능(작업 묶음)마다 디렉터리 하나: `docs/progress/<feature-slug>/`
- 스펙: `docs/progress/<feature-slug>/spec.md`
- 구현 티켓은 티켓마다 파일 하나: `docs/progress/<feature-slug>/issues/<NN>-<slug>.md`. 번호는 `01`부터 시작한다. 여러 티켓을 파일 하나에 몰아 쓰지 않는다.
- triage 상태는 이슈 파일 상단의 `Status:` 줄에 기록한다. 쓸 수 있는 값은 `triage-labels.md`를 따른다.
- 차단 관계는 파일 상단의 `Blocked by: NN, NN` 줄에 적는다. 나열된 티켓이 모두 끝나면 차단이 풀린다.
- 코멘트와 대화 기록은 파일 하단의 `## Comments` 제목 아래에 이어 붙인다.
- 티켓을 끝내면 `Status: done`으로 바꾸고, `## Comments`에 결과 요약과 커밋 해시를 남긴다.

## 스킬이 "이슈 트래커에 발행하라"고 할 때

`docs/progress/<feature-slug>/` 아래에 새 파일을 만든다. 디렉터리가 없으면 함께 만든다.

## 스킬이 "관련 티켓을 가져오라"고 할 때

참조된 경로의 파일을 읽는다. 사용자는 보통 경로나 티켓 번호를 직접 넘겨준다.

## 프런티어 찾기

`docs/progress/<feature-slug>/issues/`에서 `done`이 아니고 차단이 풀린 파일을 찾는다. 번호가 가장 작은 것부터 처리한다.

## 리서치 결과 위치

리서치 결과는 `docs/research/<주제>.md`에 main 브랜치로 커밋한다. 티켓에는 해당 파일 링크를 남긴다.
