# 09: 마무리 점검

Status: ready-for-agent
Blocked by: 03, 05, 06, 07, 08
Spec: [../spec.md](../spec.md) (User Stories 1–11)

## What to build

다섯 화면을 한 번에 훑어 디자인 시스템 확인이라는 목적을 마무리한다. 반응형·키보드·테마를 점검하고, `docs/tide-gaps.md`를 tide 저장소에 옮길 수 있게 정리한다.

## Acceptance criteria

- [ ] 다섯 화면을 데스크톱·태블릿·모바일 폭에서 light/dark로 확인하고, 무너지는 곳을 고친다.
- [ ] 사이드바·탭·테이블·메뉴·다이얼로그를 키보드만으로 조작할 수 있다.
- [ ] 앱 코드에 hex 색이 없다(검색으로 확인).
- [ ] tide 컴포넌트를 `className`으로 덮어쓴 곳을 모두 찾아 `docs/tide-gaps.md`에 반영한다.
- [ ] `docs/tide-gaps.md`를 항목별(없는 컴포넌트, 부족한 API, 토큰, 문서)로 정리하고 우선순위를 붙인다.
- [ ] 쓰지 않은 tide 컴포넌트가 있으면 이유와 함께 적는다.
- [ ] 검사 명령 통과.

## Comments
