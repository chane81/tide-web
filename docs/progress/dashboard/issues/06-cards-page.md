# 06: 카드 화면 (`/cards`)

Status: ready-for-agent
Blocked by: 04
Spec: [../spec.md](../spec.md) (User Stories 38–44)

## What to build

카드 관리 화면을 목업 데이터로 완성한다. 카드 비주얼 목록에서 카드를 고르면 그 카드의 잔액·한도 사용률과 거래 내역이 바뀐다. 카테고리별 지출, 페이지 단위 거래 테이블, 카드 추가 다이얼로그.

## Acceptance criteria

- [ ] 카드 비주얼(브랜드, 끝 네 자리, 만료일)을 고를 수 있고, 고른 카드에 따라 잔액·Progress·거래 내역이 바뀐다(RTL 테스트).
- [ ] 카테고리별 지출을 막대 차트 또는 Progress 목록으로 보인다. 색은 tide 토큰.
- [ ] 거래 내역 tide Table: 가맹점, 날짜, 금액, 상태 Badge(완료·대기·취소 색 구분).
- [ ] tide Pagination으로 거래 내역을 넘긴다(RTL 테스트).
- [ ] "카드 추가"로 tide Dialog가 열리고 닫힌다(저장은 목업).
- [ ] 카드·거래 데이터는 `apis/` 함수로 읽고, 페이지 나누기 등 가공 함수에는 단위 테스트가 있다.
- [ ] 카드 비주얼처럼 tide 밖에서 만든 UI는 `docs/tide-gaps.md`에 기록한다.
- [ ] 검사 명령 통과.

## Comments
