# tide 부족한 점

tide 0.11.4(`@tide-design/components`·`icons`) 패키지로 대시보드 다섯 화면(개요·매출·카드·고객·설정)을 만들면서 부족했던 점을 모은다. tide 저장소에 이슈로 옮길 후보다.

- 항목마다: 무엇이 없었나 / 어떻게 우회했나(파일 경로) / tide에 바라는 것.
- 경로: 앱 이름 없이 `src/…`로 적힌 것은 `apps/tide-dashboard/src/…`다(모노레포 전환 전 기록, ADR 0003). 새 항목은 `apps/<앱>/…`부터 적는다.
- 분류: 없는 컴포넌트 · 부족한 API · 토큰·테마 · 문서·배포.
- 우선순위
  - **P1**: 여러 화면에서 반복해 우회했거나, 우회 때문에 접근성·일관성이 흔들린다. 먼저 옮긴다.
  - **P2**: 한 화면에서 직접 조립했고, 대시보드에서 흔히 필요하다.
  - **P3**: 있으면 좋다, 문서로 충분하다, 또는 tide 범위 밖일 수 있다.

## 없는 컴포넌트

| 우선 | 항목                         | 우회                                                                                                                                                                                                                                                                                                   | 바라는 것                                                                                  |
| ---- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| P1   | 차트                         | Recharts 3.10.1 래퍼 `src/components/TrendLineChart/`, 막대는 `src/app/sales/_src/components/MonthlyOrdersChart.tsx`. 색·글꼴은 `var(--tide-…)`를 넘김(ADR 0002, `src/constants/chartTheme.ts`). 실선 계열 아래는 같은 색 그라디언트(24% → 0%)로 채움. light·dark 모두 따라감                          | 차트 래퍼 또는 Recharts 등에 넘길 차트 토큰 묶음(아래 토큰 항목)                           |
| P1   | Sidebar·내비게이션 목록      | `src/components/Sidebar/`: Input·Badge·Avatar·Menu·Separator·Alert + Next `Link`로 조립. 활성 항목은 `aria-current`와 `bg-active`로 직접 칠함. 계정 메뉴 트리거(`SidebarUserMenu.tsx`)는 `MenuTrigger`에 카드형 class(`hover:bg-hover`, `data-open:bg-active`, `focus-visible:focus-ring`)를 직접 적음 | 메뉴 항목(아이콘·이름·배지·활성 상태)을 갖춘 `Sidebar`/`NavList`, 큰 영역 Menu 트리거 모양 |
| P1   | 빈 상태(EmptyState)          | 고객 표 안 `colSpan` 칸에 아이콘·문구·초기화 버튼을 조립(`CustomerEmptyState.tsx`). 개발 중 빈 화면 자리는 `Card`에 `border-dashed`를 덮어써 만들었다가 지움                                                                                                                                           | 아이콘·제목·설명·동작 자리를 갖춘 `EmptyState`                                             |
| P2   | Drawer·Sheet                 | 네이티브 `<dialog>` `showModal()`로 왼쪽 패널(`AppShell/components/MobileSidebar.tsx`). `Dialog`는 가운데 고정 폭이라 못 씀                                                                                                                                                                            | 방향(start/end) 받는 `Drawer`                                                              |
| P2   | 지표 카드(KPI·Stat)          | `Card`+`Typography`+`Badge`로 조립(`MrrCard`, `SecondaryMetricCard`, `SalesKpiCard`)                                                                                                                                                                                                                   | 이름·값·증감을 갖춘 `StatCard`                                                             |
| P2   | 고를 수 있는 타일(RadioCard) | `aria-pressed` 버튼으로 감싸고 선택 테두리 `border-primary`, hover `border-strong`, `focus-visible:focus-ring`을 직접 적음(`CardPicker.tsx`). `Radio`는 원과 label 모양이 고정이라 못 씀                                                                                                               | 내용을 자유롭게 넣는 `RadioCard` 또는 선택 상태를 갖춘 `Card`                              |
| P2   | DatePicker·DateRangePicker   | 매출 화면 헤더에 `CalendarIcon` 붙은 비활성 outline `Button`으로 자리만 둠(`src/app/sales/page.tsx`)                                                                                                                                                                                                   | 기간 선택 `DateRangePicker`(프리셋 + 달력)                                                 |
| P3   | 단축키 표시(Kbd)             | `<kbd>`에 토큰 class를 직접 적음(`SidebarSearch.tsx`)                                                                                                                                                                                                                                                  | `Kbd`                                                                                      |
| P3   | 테마 전환 도구               | 인라인 초기화 스크립트(`src/libs/createThemeInitScript.ts`)와 `ThemeToggle`(`useSyncExternalStore` + localStorage)을 직접 만듦. 서버는 테마를 몰라 dark 사용자는 hydration 직후 스위치가 켜짐으로 바뀐다                                                                                               | 깜빡임 없는 초기화 스크립트와 `useTheme`                                                   |
| P3   | 결제 카드 비주얼             | `div`에 `data-color` + `bg-accent-solid`·`text-accent-on-solid`로 조립(`CardVisual.tsx`)                                                                                                                                                                                                               | 도메인 UI라 tide 범위 밖으로 본다. accent 토큰 조합은 충분했다                             |

## 부족한 API

| 우선 | 항목                                                | 우회                                                                                                                                                                                                                                 | 바라는 것                                                                        |
| ---- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| P1   | `Table` 정렬 머리글 없음                            | `TableHeaderCell` 안에 버튼·화살표 아이콘을 두고 `aria-sort`를 직접(`SortableHeaderCell.tsx`)                                                                                                                                        | `sortDirection`·`onSort`를 받는 머리 칸                                          |
| P1   | `Table` 행 선택 없음                                | 선택 열에 `Checkbox`(`indeterminate`는 tide 것을 씀), 선택 행은 `data-selected:bg-active`로 직접 칠함(`CustomerRow.tsx`). 상태는 앱 훅 `useCustomerTable`                                                                            | `TableRow`의 `selected` 스타일과 선택 열 예시                                    |
| P1   | `Card` 안쪽 여백이 `p-4` 하나뿐                     | 섹션 카드마다 `className="p-5"`·`"p-6"`(개요·매출·카드·고객·설정 모든 섹션과 PageSkeleton, 15곳)                                                                                                                                     | `padding` 크기 prop 또는 `CardHeader`/`CardContent`                              |
| P1   | `Input` 앞·뒤 장식 자리 없음                        | 아이콘·⌘K를 absolute로 겹치고 `className="ps-9 pe-12"`/`"ps-9"`(`SidebarSearch.tsx`, `CustomerToolbar.tsx`)                                                                                                                          | `startAdornment`/`endAdornment`                                                  |
| P2   | `Pagination` 범위 계산·제어형 API 없음              | 생략 위치는 `getPageRange`(`src/libs/`)로 계산. 상태로 넘기려 `PaginationLink render={<button />}`를 쓰면 lint(`control-has-associated-label`)가 빈 버튼으로 봐서 `aria-label="n페이지"`를 붙임(`src/components/PageNavigation.tsx`) | `page`·`pageCount`·`onPageChange` 제어형 또는 범위 헬퍼 공개                     |
| P2   | `Table` 누르는 행 없음                              | `TableRow onClick`(마우스 보조) + 이름 칸 `Link render={<button />}`로 키보드 열기, 체크박스 칸은 `stopPropagation`(`CustomerRow.tsx`)                                                                                               | 누르는 행의 키보드 처리 패턴 문서 또는 `interactive` 행                          |
| P2   | `Table` 좁은 화면 대응 없음                         | `overflow-x-auto`로 감싸고, 좁은 폭에서는 열을 `hidden sm:table-cell` 등으로 숨긴 뒤 그 값을 첫 칸 아래에 보임(`TransactionRow.tsx`, `CustomerRow.tsx`)                                                                              | 스크롤 컨테이너(`TableContainer`)와 반응형 표 패턴 문서                          |
| P2   | `Radio`·`Checkbox` 항목 설명 자리 없음              | children 안에 이름과 `text-body-sm text-muted` 설명을 두 줄로(`SecurityForm.tsx`). 설명이 이름에 합쳐져 읽힘                                                                                                                         | `description` prop(`aria-describedby`로 연결)                                    |
| P2   | 폼 수준 검사 도구 없음                              | `validateProfile`로 검사해 `Field error`에 넘기고, 첫 오류 칸 포커스는 `querySelector`로 직접(`ProfileForm.tsx`)                                                                                                                     | 제출 검사 예시 또는 `Form` 래퍼(오류 요약, 첫 오류 포커스)                       |
| P3   | `Badge` 아이콘 자리·간격 없음                       | 아이콘을 children에 넣고 `className="gap-1"`(`src/components/ChangeBadge.tsx`)                                                                                                                                                       | `startIcon` 또는 기본 gap                                                        |
| P3   | `Field` 가로 배치 없음                              | 그대로 둠. 알림 채널은 label → Switch → 설명이 세로로 쌓임(`NotificationsForm.tsx`)                                                                                                                                                  | 설정 화면용 가로 `Field` 또는 Switch `description`                               |
| P3   | `Typography`에 색 prop 없음                         | 보조 글자는 `className="text-muted"`(15곳)                                                                                                                                                                                           | `tone="muted"` 같은 prop(토큰 class로 충분하면 문서화)                           |
| P3   | `Link`를 `<button>`으로 렌더하면 손가락 커서가 없음 | `className="cursor-pointer"`(`CustomerRow.tsx`)                                                                                                                                                                                      | `render`가 button이어도 링크 커서                                                |
| P3   | 표 안처럼 문장 밖에서 쓰는 링크 모양 없음           | `Link`는 늘 밑줄이라 고객 표 이름이 행마다 밑줄로 줄지음. `no-underline hover:underline`으로 덮어씀(`CustomerRow.tsx`)                                                                                                               | 밑줄을 가리킬 때만 보이는 `underline="hover"` 같은 선택지                        |
| P3   | 내비게이션용 링크 모양 없음                         | 사이드바 메뉴는 Next `Link`에 토큰 class(`SidebarNavItem.tsx`)                                                                                                                                                                       | 블록형 내비게이션 링크(밑줄 없음, hover·active 배경). Sidebar가 생기면 함께 해결 |

## 토큰·테마

| 우선 | 항목                                                                         | 우회                                                                                                                                                                                            | 바라는 것                                                               |
| ---- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| P1   | 차트 토큰 없음(계열 색 순서, 막대·범례·격자·툴팁)                            | 계열 둘째부터 `--tide-purple-solid`·`--tide-mint-solid`를 임시 순서로, 막대 `--tide-bg-primary-solid`, 막대 hover `--tide-bg-hover`, 범례·축 `--tide-text-muted`(`src/constants/chartTheme.ts`) | 대비가 검증된 계열 색 순서(light·dark)와 차트 토큰 묶음                 |
| P2   | dark `bg-overlay`가 거의 안 어두움(`#28292c` 70%가 canvas gray-950보다 밝음) | 그대로 둠. 모바일 오버레이 사이드바·Dialog 뒤 본문이 잘 구분되지 않음                                                                                                                           | dark overlay를 canvas보다 어둡게                                        |
| P2   | dark `Badge variant="faint"`(neutral) 배경이 surface와 거의 같음             | 그대로 둠(사이드바 메뉴 배지가 숫자만 떠 보임)                                                                                                                                                  | dark faint 배경 대비 보강                                               |
| P2   | `bg-canvas`와 `bg-surface`가 light·dark 모두 같은 값                         | 본문 바탕에 `bg-neutral-faint`를 깔아 흰 카드와 구분(`AppShell.tsx`). light는 gray-50 바탕 + 흰 카드로 층이 생기지만, dark는 `neutral-faint`도 gray-950이라 여전히 경계선으로만 구분            | 카드보다 한 단계 낮은 바탕 토큰(`bg-sunken` 등), dark에서도 차이가 나게 |

## 문서·배포

| 우선 | 항목                                                                              | 우회                                                                                        | 바라는 것                                 |
| ---- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------- |
| P1   | npm 배포본에 README 없음                                                          | 설치 방법을 `styles.css` 첫 줄 주석과 tide 저장소 `apps/smoke-next`에서 확인                | 패키지에 설치 안내 README                 |
| P3   | `Select`에 `aria-label`만 주면 이름이 「고른 값 + label」(예: 「모든 상태 상태」) | 그대로 둠(React Aria `useSelect` 동작). 테스트도 그 이름으로 찾음(`CustomerTable.test.tsx`) | 보이는 label 없는 Select의 이름 규칙 문서 |

## `className`으로 덮어쓴 곳 정리

티켓 09에서 tide 컴포넌트에 `className`을 준 곳을 모두 찾았다(66곳). 대부분은 배치(바깥 여백·폭·정렬·열 숨기기)라 tide의 모양을 바꾸지 않는다. 모양을 바꾼 곳은 위 표에 모두 있다.

| 종류                | 예                                                                                                                                                                                                                       | 판단                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| 배치                | `Card`의 `flex flex-col gap-*`, `Tabs`의 `flex gap-*`, `TabList self-start`, `TabPanel` grid, `Select sm:w-40`, `Skeleton` 크기, 표 칸 `w-10`·`whitespace-nowrap`·`hidden sm:table-cell`, `Avatar hidden sm:inline-flex` | 앱 몫. 기록하지 않음 |
| tide가 권하는 class | 숫자 칸 `text-end tabular-nums`(`TableCell` 설명에 있음)                                                                                                                                                                 | 그대로               |
| 모양 바꿈           | `Card` 여백, `Input` 여백, `Badge gap-1`, `TableRow` 선택 배경, `MenuTrigger` 카드형, `Link cursor-pointer`·`no-underline hover:underline`, `Typography text-muted`                                                      | 위 표에 기록         |
| 덮어쓰다 되돌림     | AlertDialog·Dialog `DialogFooter`의 `mt-6` → tide 기본(`DialogContent gap-4` + footer `mt-2`)이 충분해 지움. 사이드바 공지 `Card` + absolute 닫기 `IconButton` → tide `Alert`(`onClose`)로 바꿈                          | 해결                 |

## 쓰지 않은 tide 컴포넌트

다섯 화면에서 쓰지 않은 것과 이유다. 나머지(Avatar, Badge, Breadcrumb, Button, Card, Checkbox, CheckboxGroup, Combobox, Dialog, AlertDialog, Field, IconButton, Input, Link, Menu, Pagination, Progress, Radio, RadioGroup, Select, Separator, Skeleton, Switch, Table, Tabs, Textarea, Toast, Typography, Alert)는 실제 화면에서 썼다.

| 컴포넌트       | 쓰지 않은 이유                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Accordion      | 다섯 화면에 접고 펼 내용(FAQ, 긴 설정 묶음)이 없다                                                                                    |
| Popover        | 메뉴(Menu)도 다이얼로그도 아닌 떠 있는 내용이 필요한 자리가 없었다                                                                    |
| Tooltip        | 아이콘만 있는 버튼은 모두 `aria-label`로 이름을 줬고, 더보기 버튼은 `MenuTrigger`라 Tooltip 트리거와 겹쳐 쓰는 방법을 확인하지 않았다 |
| Spinner        | 로딩은 `Button loading`(안에서 Spinner를 씀)과 Skeleton으로 충분했다                                                                  |
| Tag·TagGroup   | 지울 수 있는 값 목록이 없다. 고객 상태 필터를 칩으로 만들 수도 있었지만 Select를 골랐다                                               |
| VisuallyHidden | 숨긴 텍스트가 필요한 곳은 `aria-label`로 이름을 줬다                                                                                  |

## 잘 맞았던 점

옮길 때 함께 전할 만한, 그대로 쓰기 좋았던 점이다.

- `Field`가 label·설명·오류·`aria-invalid`·`required`를 자동으로 잇는다. 오류 표시만 앱이 넘기면 됐다.
- `Checkbox indeterminate`, `Dialog`·`AlertDialog`의 포커스 가둠과 닫은 뒤 트리거로 포커스 복귀, `Tabs`·`Menu`의 화살표 키 이동이 별도 작업 없이 됐다.
- `data-color` + accent 토큰으로 색 계열을 바꾸는 방식이 카드 비주얼·Avatar에서 light·dark 모두 잘 따라갔다.
- 서버 컴포넌트에서 바로 import되어 `'use client'` 경계를 잎에 둘 수 있었다.
