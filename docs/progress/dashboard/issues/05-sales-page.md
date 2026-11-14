# 05: 매출 화면 (`/sales`)

Status: ready-for-agent
Blocked by: 04
Spec: [../spec.md](../spec.md) (User Stories 31–37)

## What to build

매출 화면을 목업 데이터로 완성한다. KPI 카드 세 개, 기간별 매출 보고서(이번·지난 기간 2계열 라인), 월별 주문 막대 차트, 최근 구매 활동 피드, 보고서 내보내기 Toast. 04에서 만든 포맷 함수·차트 래퍼를 같이 쓰게 되면 규칙대로 앱 전역으로 승격한다.

## Acceptance criteria

- [ ] KPI 카드(오늘 매출, 주문 수, 평균 주문 금액)에 증감 배지와 더보기 tide Menu가 있다.
- [ ] 매출 보고서 라인 차트는 2계열이고 기간 탭으로 바뀐다. 툴팁에 값이 보인다.
- [ ] 월별 주문 막대 차트. 색은 tide 토큰.
- [ ] 활동 피드: Avatar, 이름, 구매 항목(tide Link).
- [ ] "보고서 내보내기"를 누르면 완료 Toast가 뜬다(RTL 테스트).
- [ ] 매출 데이터는 `apis/` 함수로 읽고, 새 가공 함수에는 단위 테스트가 있다.
- [ ] 검사 명령 통과.

## Comments
