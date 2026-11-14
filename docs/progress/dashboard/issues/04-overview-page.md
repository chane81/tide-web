# 04: 개요 화면 (`/`)

Status: done
Blocked by: 02
Spec: [../spec.md](../spec.md) (User Stories 24–30, 63)

## What to build

개요 화면 전체를 목업 데이터로 완성한다. 기간 탭에 따라 핵심 지표(MRR)와 보조 지표, 라인 차트가 바뀐다. 이 티켓에서 데이터 읽기(`apis/`), 포맷·증감률 가공(`libs/`), tide 토큰으로 색을 칠하는 Recharts 차트 래퍼가 처음 생긴다.

## Acceptance criteria

- [x] 개요 지표는 `apis/` 함수로만 읽고, 목업은 결정적이다(두 번 불러도 같음, 단위 테스트).
- [x] 포맷(통화·퍼센트·날짜)과 증감률·방향(증가·감소·같음) 판정은 순수 함수이고 단위 테스트가 있다.
- [x] 기간 Tabs(12개월·30일·7일·24시간)를 바꾸면 지표 숫자와 차트가 바뀐다(RTL 테스트).
- [x] 증감률은 tide Badge로, 증가는 success·감소는 danger 색이다.
- [x] MRR 라인 차트는 Recharts이고 색·격자·축 글자색이 tide CSS 변수에서 온다(hex 없음). 차트 래퍼만 `'use client'`.
- [x] 바로가기 카드 2개, 상위 회원 목록(Avatar, 가입일, 온라인 표시).
- [x] 라우트 로딩 시 tide Skeleton으로 카드 모양 자리를 보인다.
- [x] 차트 색 처리 방식과 아쉬운 점을 `docs/tide-gaps.md`에 기록한다.
- [x] 검사 명령 통과.

## Comments

### 2026-11-14 구현 결과

설치: `recharts` 3.10.1, `react-is` 19.3.1(Recharts peer).

구성(루트 라우트 전용 코드는 규칙 10에 따라 `src/`):

- 데이터: `src/apis/overview.api.ts`(`getOverviewMetrics`, 기간 네 개를 한 번에), `src/apis/members.api.ts`(`getTopMembers`). 둘 다 `'use cache'` + `cacheLife("hours")`.
  - 목업은 고정 시드 난수와 고정 기준 시각(2026-11-14 UTC)으로 만든다. 지금 MRR은 기간과 상관없이 같게(마지막 점 $48,230) 맞췄다.
- 가공: `src/libs/formatCurrency`·`formatPercent`·`formatNumber`·`formatDate`(ko-KR, USD, 날짜는 UTC 고정), `getChange`(증감률·방향). 차트 x축 글자는 `OverviewMetrics/libs/formatSeriesLabel`.
- 차트: `src/components/TrendLineChart/`(`'use client'`는 이 파일과 탭 컴포넌트뿐). Recharts 3의 `responsive` prop으로 부모 폭을 따르고, y축은 데이터 범위로 잡는다.
- 화면: `OverviewMetrics`(tide Tabs + MRR 카드 + 보조 지표 3개), `ChangeBadge`(증가 success, 감소 danger, 같음 neutral + 숨김 글자), `QuickActions`(바로가기 2장), `TopMembers`(async 서버 컴포넌트: Avatar, 가입일, 온라인 Badge).
- 로딩: `src/app/loading.tsx` → `src/components/PageSkeleton.tsx`(tide Skeleton으로 헤더·카드 모양). 루트 `loading`이라 다른 라우트가 자기 `loading`을 두기 전까지는 이 모양을 같이 쓴다.

확인:

- 테스트: apis(기간 네 개, MRR 일관성, 결정성), libs(포맷·증감률·축 글자), `OverviewMetrics`(첫 탭, 탭 전환 시 증감률·보조 지표·차트 점 수·비교 문구 변경, 증감 표시). Recharts 그림은 테스트에서 가짜 컴포넌트로 바꾼다.
- 브라우저(dev): light·dark 둘 다 선·격자·축·툴팁이 테마를 따른다. 콘솔 경고 없음. 기간별 현재 MRR이 달랐던 문제를 이때 찾아 고쳤다.
- 로딩 Skeleton은 데이터가 캐시되어 화면에서 거의 안 보여 직접 눈으로는 확인하지 못했다.
- `docs/tide-gaps.md`: 차트 행 갱신, 계열 색 순서·Badge 아이콘·Card 여백·지표 카드 4건 추가.
- 커밋: `4b17d97`(개요 화면). 같은 작업 중 사용자 요청으로 `e8c629b`(Pretendard 글꼴, tide 「폰트 로드」의 CDN 방식)도 함께 했다.
