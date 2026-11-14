# 05: 매출 화면 (`/sales`)

Status: done
Blocked by: 04
Spec: [../spec.md](../spec.md) (User Stories 31–37)

## What to build

매출 화면을 목업 데이터로 완성한다. KPI 카드 세 개, 기간별 매출 보고서(이번·지난 기간 2계열 라인), 월별 주문 막대 차트, 최근 구매 활동 피드, 보고서 내보내기 Toast. 04에서 만든 포맷 함수·차트 래퍼를 같이 쓰게 되면 규칙대로 앱 전역으로 승격한다.

## Acceptance criteria

- [x] KPI 카드(오늘 매출, 주문 수, 평균 주문 금액)에 증감 배지와 더보기 tide Menu가 있다.
- [x] 매출 보고서 라인 차트는 2계열이고 기간 탭으로 바뀐다. 툴팁에 값이 보인다.
- [x] 월별 주문 막대 차트. 색은 tide 토큰.
- [x] 활동 피드: Avatar, 이름, 구매 항목(tide Link).
- [x] "보고서 내보내기"를 누르면 완료 Toast가 뜬다(RTL 테스트).
- [x] 매출 데이터는 `apis/` 함수로 읽고, 새 가공 함수에는 단위 테스트가 있다.
- [x] 검사 명령 통과.

## Comments

### 2026-11-14 구현 결과

승격(규칙 3, 매출 화면도 쓰게 되어 공통 부모로):

- `ChangeBadge` → `src/components/ChangeBadge.tsx`
- 차트 색 → `src/constants/chartTheme.ts`(막대 채움·hover 추가)
- x축 글자 → `src/libs/formatSeriesLabel.ts`(기간 대신 점 간격 `month·day·weekday·hour`를 받게 일반화)
- 고정 시드 난수 → `src/libs/seededRandom.ts`(+ 테스트)
- `MetricValue` → `src/types/metric.ts`
- 개요 화면은 동작·목업 값 그대로(기존 테스트 통과).

매출 전용(`src/app/sales/_src/`):

- `apis/sales.api.ts`: `getSalesKpis`, `getSalesReport`(12개월·30일·7일, 이번·지난 값), `getMonthlyOrders`, `getRecentPurchases`(기준 시각 `asOf` 포함). 모두 `'use cache'`.
- `libs/getAverageOrderValue`(매출 ÷ 주문, 0 주문은 0), `libs/formatRelativeTime`(기준 시각을 받아 결정적).
- 화면: KPI 카드 3장(`SalesKpiCard` 서버 + `SalesKpiMenu` client: IconButton 트리거 tide Menu), `SalesReport`(Tabs + 2계열 라인, 지난 기간은 점선·muted), `MonthlyOrders`(서버) → `MonthlyOrdersChart`(client, Recharts Bar), `RecentPurchases`(Avatar, 이름, tide `Link` + Next `Link`, 금액, 상대 시각), `ExportReportButton`(0.6초 로딩 후 성공 Toast).
- 헤더: 비활성 날짜 범위 버튼(DatePicker 자리) + 보고서 내보내기.
- `TrendLineChart`: 계열이 둘 이상이면 범례를 보인다(브라우저에서 어느 선이 이번 기간인지 알 수 없어 추가).

확인:

- 테스트: sales apis(모양, 점 개수, 정렬, 결정성), `getAverageOrderValue`, `formatRelativeTime`, `seededRandom`, `formatSeriesLabel`, `ExportReportButton`(누르면 완료 Toast).
- 브라우저(dev): light·dark, KPI 더보기 메뉴 항목, 보고서 탭 전환·툴팁 두 값, 막대 색, 내보내기 Toast. 콘솔 경고 없음.
- `/sales`는 아직 자기 `loading.tsx`가 없어 루트(개요 모양) Skeleton을 쓴다.
- 커밋: `544f87a`(공통 위치로 승격), `282ab40`(매출 화면).
