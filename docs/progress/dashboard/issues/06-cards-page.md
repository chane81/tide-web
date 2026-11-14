# 06: 카드 화면 (`/cards`)

Status: done
Blocked by: 04
Spec: [../spec.md](../spec.md) (User Stories 38–44)

## What to build

카드 관리 화면을 목업 데이터로 완성한다. 카드 비주얼 목록에서 카드를 고르면 그 카드의 잔액·한도 사용률과 거래 내역이 바뀐다. 카테고리별 지출, 페이지 단위 거래 테이블, 카드 추가 다이얼로그.

## Acceptance criteria

- [x] 카드 비주얼(브랜드, 끝 네 자리, 만료일)을 고를 수 있고, 고른 카드에 따라 잔액·Progress·거래 내역이 바뀐다(RTL 테스트).
- [x] 카테고리별 지출을 막대 차트 또는 Progress 목록으로 보인다. 색은 tide 토큰.
- [x] 거래 내역 tide Table: 가맹점, 날짜, 금액, 상태 Badge(완료·대기·취소 색 구분).
- [x] tide Pagination으로 거래 내역을 넘긴다(RTL 테스트).
- [x] "카드 추가"로 tide Dialog가 열리고 닫힌다(저장은 목업).
- [x] 카드·거래 데이터는 `apis/` 함수로 읽고, 페이지 나누기 등 가공 함수에는 단위 테스트가 있다.
- [x] 카드 비주얼처럼 tide 밖에서 만든 UI는 `docs/tide-gaps.md`에 기록한다.
- [x] 검사 명령 통과.

## Comments

### 2026-11-14 구현 결과

구성(`src/app/cards/`, 라우트 하나에서만 쓰여 모두 `_src`):

- 데이터: `_src/apis/cards.{types,mock,api}.ts` — `getCards`(카드 3장), `getTransactions`(모든 카드 거래, 최신순). 카드 사용액은 취소를 뺀 거래 합계. tide `Card`와 헷갈리지 않게 타입 이름은 `PaymentCard`.
- 가공(`_src/libs/`, 모두 단위 테스트): `paginate`, `getPageRange`(첫·끝 + 현재 앞뒤, 하나만 가리는 생략은 번호로), `sumByCategory`(취소 제외, 비율), `getLimitUsage`(80% warning, 100% danger), `formatCardExpiry`.
- 화면: `page.tsx`가 두 api를 await해 `CardsWorkspace`(client, 고른 카드 상태)에 넘긴다. 카드 전환은 미리 받은 데이터를 client에서 거른다.
  - `CardPicker` + `CardVisual`: `aria-pressed` 버튼 안 카드 비주얼(`data-color` + accent 토큰).
  - `CardLimit`: 사용액, tide `Progress`(한도 사용률, 색은 `getLimitUsage`).
  - `CategorySpending`: 카테고리별 tide `Progress` 목록(차트 대신. 막대 차트 승격은 하지 않음).
  - `TransactionTable`(client) + `TransactionRow` + `TransactionPagination`: tide `Table`·`Badge`(완료 success, 대기 warning, 취소 danger)·`Pagination`. 한 페이지 8행, 카드를 바꾸면 `key`로 첫 페이지로.
  - `AddCardDialog`(client): 헤더 액션. tide `Dialog` + `Field`·`Input`, 추가하면 닫고 Toast(목업이라 목록은 그대로).

확인:

- RTL: `CardsWorkspace`(처음 첫 카드, 다른 카드를 고르면 사용액·Progress·거래 표가 바뀜), `TransactionTable`(첫 페이지·상태 배지, 번호·다음 버튼으로 이동, 한 페이지면 Pagination 없음), `AddCardDialog`(열고 취소로 닫기, 추가하면 닫히고 Toast). api 테스트(사용액 = 거래 합계, 최신순, 결정적).
- 브라우저(dev 서버): 1440px light·dark, 390px. 카드 전환, 다이얼로그 열기와 Esc로 닫은 뒤 「카드 추가」로 포커스 복귀. 콘솔 경고 없음.
- `docs/tide-gaps.md`: 카드 비주얼, 고를 수 있는 타일, Pagination 범위 계산·제어형 API, Table 가로 스크롤 감싸개 4건 추가. Card 여백 행에 카드 화면 추가.
- 검사 다섯 개 통과(테스트 80개).
- 커밋: `ad9f50b`(카드 화면).
