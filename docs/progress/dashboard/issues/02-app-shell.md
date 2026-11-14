# 02: 공통 셸

Status: ready-for-agent
Blocked by: 01
Spec: [../spec.md](../spec.md) (User Stories 12–19, 64)

## What to build

모든 화면을 감싸는 셸. 왼쪽 사이드바에서 다섯 화면(개요, 매출, 카드, 고객, 설정)으로 이동하고, 각 화면 위에 페이지 헤더가 있다. tide에 Sidebar가 없으므로 tide 컴포넌트로 조립하고 `docs/tide-gaps.md`에 기록한다. 각 라우트는 페이지 헤더와 빈 본문 자리만 둔다.

## Acceptance criteria

- [ ] 사이드바: 로고, 검색 입력과 ⌘K 표시(동작 없음), 메뉴 항목(아이콘, 이름, 숫자 배지), 아래쪽 지원·설정 링크, 닫을 수 있는 공지 카드, 유저 카드(Avatar, 이름, 이메일).
- [ ] 메뉴 항목 목록은 앱 상수로 두고 props로 넘긴다.
- [ ] 현재 경로의 메뉴 항목이 강조되고 `aria-current="page"`를 가진다(RTL 테스트).
- [ ] 유저 카드를 누르면 tide Menu로 계정 메뉴(프로필, 설정, 로그아웃)가 열린다.
- [ ] 페이지 헤더: 제목, 설명, Breadcrumb, 액션 자리.
- [ ] 좁은 화면에서는 사이드바가 숨고 메뉴 버튼으로 오버레이 사이드바를 열고 닫는다. 키보드로도 된다.
- [ ] tide Toast를 띄울 수 있는 영역이 셸에 준비되어 있다.
- [ ] 없는 주소는 안내와 홈 링크가 있는 not-found 화면을 보인다.
- [ ] `docs/tide-gaps.md`에 Sidebar 조립 방식과 아쉬운 점을 기록한다.
- [ ] 검사 명령(typecheck·lint·format:check·test·build) 통과.

## Comments
