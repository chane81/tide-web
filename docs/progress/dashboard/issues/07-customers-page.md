# 07: 고객 화면 (`/customers`)

Status: done
Blocked by: 04
Spec: [../spec.md](../spec.md) (User Stories 45–55)

## What to build

고객 목록 화면을 목업 데이터로 완성한다. 검색·상태 필터·정렬·페이지·다중 선택이 되는 테이블과 일괄 동작, 고객 상세 다이얼로그. 테이블 상태(검색어, 필터, 정렬, 페이지, 선택)는 훅 하나가 관리하고, 목록 가공은 순수 함수가 맡는다. 06에 페이지 나누기 함수가 먼저 생겼으면 규칙대로 승격해 같이 쓴다.

## Acceptance criteria

- [x] 테이블: 이름과 Avatar, 이메일, 상태 Badge(활성·휴면·이탈), 가입일, 결제 금액.
- [x] 이름·이메일 검색, 상태 Select 필터, 열 머리글 정렬(오름·내림)이 된다.
- [x] 검색·필터를 바꾸면 첫 페이지로 돌아간다.
- [x] 행 Checkbox 선택과 전체 선택(현재 결과 전체 대상), 고른 수 표시, 일괄 동작(내보내기, 삭제).
- [x] 일괄 삭제는 tide AlertDialog 확인을 거치고, 확인하면 화면 상태에서 지워진다.
- [x] 결과가 없으면 빈 상태 안내를 보인다.
- [x] 행을 누르면 고객 상세 tide Dialog가 열린다. 체크박스 클릭은 상세를 열지 않는다.
- [x] 위 동작은 RTL 테스트로, 검색·필터·정렬·페이지 함수는 단위 테스트로 확인한다.
- [x] tide Table에 없어 직접 만든 것(정렬 머리글, 선택 열 등)은 `docs/tide-gaps.md`에 기록한다.
- [x] 검사 명령 통과.

## Comments

### 2026-11-14 구현 결과

먼저 승격(06에서 생긴 페이지 나누기, 이제 `/cards`·`/customers` 두 라우트가 씀 → 공통 부모 `src/`):

- `paginate`·`getPageRange`(+테스트) → `src/libs/`. 거래 표의 `TransactionPagination` → `src/components/PageNavigation.tsx`(`aria-label`을 prop으로).

구성(`src/app/customers/`, 라우트 하나에서만 쓰여 `_src`):

- 데이터: `_src/apis/customers.{types,mock,api}.ts` — `getCustomers`(46명, 가입 최신순, 결정적). 검색·필터·정렬·페이지는 client에서.
- 가공(`_src/libs/`, 단위 테스트): `filterCustomers`(이름·이메일, 대소문자·앞뒤 공백 무시, 상태), `sortCustomers`(이름 `Intl.Collator("ko-KR")`, 가입일, 결제 금액, 같은 값은 원래 순서).
- 상태 훅: `CustomerTable/hooks/useCustomerTable.ts` — 검색어·필터·정렬·페이지·선택·화면에서 지운 고객. 검색·필터를 바꾸면 첫 페이지로 가고, 선택은 새 결과에 남는 고객만 남긴다(안 보이는 고객이 일괄 동작에 섞이지 않게). 전체 선택은 현재 결과 전체가 대상. 훅 테스트(`renderHook`) 있음.
- 화면: `CustomerTable`(client) + `components/`의 `CustomerToolbar`(검색 Input + 상태 Select), `BulkActions`(고른 수, 내보내기 Toast, 삭제), `DeleteCustomersDialog`(tide AlertDialog), `SortableHeaderCell`(`aria-sort`), `CustomerRow`(Avatar·Badge·Checkbox), `CustomerEmptyState`, `CustomerDetailDialog`(tide Dialog, `open` 제어).
- 행 누름은 마우스 보조이고, 키보드는 이름 버튼(`Link render={<button />}`)으로 상세를 연다. 체크박스 칸 누름은 `stopPropagation`.

확인:

- RTL(`CustomerTable.test.tsx` 10개): 열 내용, 검색과 첫 페이지 복귀, 상태 Select 필터, 정렬 오름·내림(`aria-sort`), 빈 상태와 초기화, 전체 선택·부분 선택·고른 수, 체크박스는 상세를 안 엶, 행 누르면 상세, 일괄 삭제는 AlertDialog 취소 시 그대로·확인 시 삭제와 Toast, 내보내기 Toast.
- 브라우저(dev 서버): 1440px light·dark, 390px(표는 가로 스크롤). 삭제 확인 AlertDialog, 고객 상세, 빈 상태 확인.
- 상세 다이얼로그에 「닫기」 버튼을 따로 뒀다가 tide `DialogContent` 기본 닫기 버튼과 이름이 겹쳐 뺐다.
- `docs/tide-gaps.md`: 정렬 머리글, 행 선택, 누르는 행, EmptyState, Select 이름 규칙 5건 추가. Input 장식 행에 고객 검색 추가.
- 검사 다섯 개 통과(테스트 108개).
- 커밋: `57aece5`(승격), `72f535c`(고객 화면).
