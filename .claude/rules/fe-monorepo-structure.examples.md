# 프론트엔드 모노레포 구조 규칙 — 예시

`fe-monorepo-structure.md` 규칙의 예시다. 번호는 규칙 번호와 같다.
규칙 본문은 그쪽이 기준이고, 여기는 판단이 갈리는 장면만 보여 준다.

---

## 1. 같은 폴더 이름을 모든 깊이에서 반복한다

```
❌ apps/tide-dashboard/src/app/cards/_src/utils/formatCardNumber.ts
❌ apps/tide-site/src/helpers/scrollTo.ts
❌ packages/shared/common/formatDate.ts

✅ apps/tide-dashboard/src/app/cards/_src/libs/formatCardNumber.ts
✅ apps/tide-site/src/libs/scrollTo.ts
✅ packages/shared/libs/src/formatDate.ts
```

순수 함수 = `libs`, 상수 = `constants`, 훅 = `hooks`, 데이터 읽기 = `apis`. 깊이가 달라도 이름은 같다.

## 2·3. 쓰는 곳 가까이 두고, 공유가 넓어지면 공통 부모로 올린다

거래 필터 `useTransactionFilter`가 처음에는 `TransactionTable`에서만 쓰인다.

```
① 컴포넌트 하나                  apps/tide-dashboard/src/app/cards/_src/components/TransactionTable/hooks/useTransactionFilter.ts
② 같은 라우트의 SpendingChart도 씀 → apps/tide-dashboard/src/app/cards/_src/hooks/useTransactionFilter.ts
③ /sales 라우트도 씀              → apps/tide-dashboard/src/hooks/useTransactionFilter.ts
④ tide-site도 씀                  → packages/domains/transactions/src/hooks/useTransactionFilter.ts
```

- ❌ "언젠가 다른 데서도 쓸 테니" 처음부터 ③이나 ④에 두지 않는다.
- 형제 라우트 `/customers/active`와 `/customers/churned`가 함께 쓰면 공통 부모인 `app/customers/_src/`로 올린다. 바로 `src/`로 건너뛰지 않는다.
- 범용 코드는 이 사다리를 타지 않는다 → 4번.

## 4. packages는 층마다 들어가는 조건이 다르다

| 코드                    | 쓰는 앱            | 범용?                    | 위치                                                     |
| ----------------------- | ------------------ | ------------------------ | -------------------------------------------------------- |
| `createThemeInitScript` | 둘 다              | ✅                       | `packages/shared/libs/src/createThemeInitScript.ts`      |
| `formatCurrency`        | tide-dashboard만   | ✅                       | `packages/shared/libs`로 올려도 되지만, 지금은 앱에 둠 ↓ |
| `getTransactions`       | tide-dashboard만   | ❌ (transactions 리소스) | `apps/tide-dashboard/src/app/cards/_src/apis/`           |
| `THEME_STORAGE_KEY`     | 둘 다, 값은 앱마다 | ❌ (앱이 정한 키)        | 각 앱 `src/constants/theme.ts` → 인자로 넘김(5번)        |

- 범용 판단: 앱·리소스·화면 이름 없이 설명되고, 다른 앱에 그대로 옮겨도 동작하는가.
  - `createThemeInitScript(key)` "저장 키에서 테마를 읽어 `<html data-theme>`을 붙인다" → ✅
  - `formatCardExpiry` "카드 유효기간을 표시한다" → ❌ (카드를 안다)
- 범용 코드를 앱에서 먼저 만들었다면, 다른 앱이 쓰기 시작할 때 한꺼번에 `packages/shared`로 옮긴다. 옮기면서 앱 전용 값(저장 키, 문구)은 인자로 뺀다.
- ❌ "공통 코드 같아 보여서" 대시보드만 쓰는 `getTransactions`를 `packages/domains/transactions`에 두지 않는다.

## 5. 층을 넘을 때는 코드의 주인을 먼저 본다

`ThemeToggle`은 `packages/shared/components`에 있지만, 테마를 저장하는 키는 앱마다 다르다.

```tsx
// ❌ packages/shared/components/src/ThemeToggle.tsx
const KEY = "tide-web-theme"; // 패키지가 앱의 저장 키를 안다

// ✅ apps/tide-site/src/app/layout.tsx
import { ThemeToggle } from "@tide-web/components";
import { THEME_STORAGE_KEY } from "@/constants/theme";
<ThemeToggle storageKey={THEME_STORAGE_KEY} />;
```

사이드바 메뉴 목록도 같다. 주인은 앱이라 `src/constants/navItems.tsx`에 두고 props로 넘긴다.

## 7. tide에 있는 UI는 다시 만들지 않는다

```tsx
// ❌ apps/tide-site/src/components/PillButton.tsx — tide Button과 같은 일을 직접 구현
export function PillButton({ children }: { children: ReactNode }) {
  return <button className="rounded-full bg-blue-600 px-4 py-2 text-white">{children}</button>;
}

// ✅ tide Button을 그대로 쓴다
import { Button } from "@tide-design/components";
<Button>{children}</Button>;
```

tide에 없는 사이트 헤더·푸터는 tide `Link`·`Button`으로 조립해 앱 `src/components`에 두고, `docs/tide-gaps.md`에 적는다.

## 8. 외부 도구가 내놓은 팔레트보다 tide 토큰이 먼저다

```css
/* ❌ apps/tide-site/src/app/globals.css — 스킬이 뽑은 팔레트를 그대로 붙임 */
:root {
  --bg: #f4efe6;
  --accent: #1f5f4a;
}

/* ✅ 바탕·글자·강조는 tide 유틸리티로 */
/* <section className="bg-neutral-faint text-default"> … <Button color="primary"> */
```

## 9. 의존 방향은 apps → widgets → domains → shared

```ts
// ❌ packages/shared/libs/src/formatDate.ts
import { LOCALE } from "@/constants/locale"; // packages → apps(@/ alias)

// ❌ apps/tide-site/src/components/Hero.tsx
import { TrendLineChart } from "../../../tide-dashboard/src/components/TrendLineChart"; // 앱 → 다른 앱

// ✅ 두 앱이 쓰게 되면 packages로 승격한 뒤 패키지 이름으로 import
import { formatDate } from "@tide-web/libs";
```

## 11. 데이터 읽기는 `apis/` 함수로만

```tsx
// ❌ 컴포넌트가 목업을 직접 import
import { transactions } from "../apis/transactions.mock";

// ✅ apis 함수를 거친다
import { getTransactions } from "../apis/transactions.api";
const { items } = await getTransactions({ page: 1 });
```

## 12. 가공은 `libs/` 순수 함수로

```tsx
// ❌ 차트 컴포넌트 안에서 월별 합계를 계산
const data = transactions.reduce(/* 월별 합산 */);

// ✅ apps/tide-dashboard/src/app/cards/_src/libs/sumByMonth.ts + sumByMonth.test.ts
const data = sumByMonth(transactions);
```

## 13. 라우트 파일에는 라우트만 둔다

### 13-1. 보조 컴포넌트는 `_src/components`로 내린다

```tsx
// ❌ apps/tide-dashboard/src/app/sales/page.tsx
async function SalesKpis() {
  const kpis = await getSalesKpis();
  return <div className="grid grid-cols-3 gap-6">{/* ... */}</div>;
}

// ✅ page.tsx는 셸과 경계만, 본문은 src/app/sales/_src/components/SalesKpis.tsx
import { SalesKpis } from "./_src/components/SalesKpis";
```

### 13-2. 정책이 컴포넌트·데이터의 성질이면 그 안에 적는다

```tsx
// ❌ src/app/page.tsx — 정책 하나 + 컴포넌트 하나인데 래퍼를 둠
async function CachedMembers() {
  "use cache";
  cacheLife("hours");
  return <TopMembers />;
}

// ✅ src/components/TopMembers.tsx — 정책을 주인 안에
export async function TopMembers() {
  "use cache";
  cacheLife("hours");
  const members = await getTopMembers();
  return <MemberList items={members} />;
}
```

## 14. 서버 껍데기(Slot)는 조건이 맞을 때만

| 껍데기            | 판단      | 이유                                                                             |
| ----------------- | --------- | -------------------------------------------------------------------------------- |
| `SettingsSlot`    | ❌ 접는다 | 소비자는 `/settings` 하나뿐이고, page가 경계 없이 `return <SettingsSlot />`만 함 |
| `CurrencySlot`    | ✅ 둔다   | ① `/sales`와 `/cards`가 같은 쿠키(표시 통화) 읽기를 함                           |
| `SidebarUserSlot` | ✅ 둔다   | ② layout 본문에서 읽으면 `<Suspense>` 밖이 되어 모든 라우트가 프리렌더에서 빠짐  |

둘째 라우트가 생기면 그때 Slot으로 올린다.

## 15. 루트 라우트는 `(home)` 그룹, `app/_src`는 만들지 않는다

```
❌ apps/tide-site/src/app/_src/components/Hero.tsx        # 모든 라우트가 import할 수 있는 자리 = 앱 전역
❌ apps/tide-site/src/components/Hero.tsx                 # 홈만 쓰는데 앱 전역에 둠
✅ apps/tide-site/src/app/(home)/page.tsx                  # URL은 그대로 `/`
✅ apps/tide-site/src/app/(home)/_src/components/Hero/     # 홈 전용
✅ apps/tide-site/src/components/SiteNav.tsx               # 여러 라우트가 씀 → 앱 전역
✅ apps/tide-site/src/app/catalog/_src/apis/...            # 루트가 아닌 세그먼트의 _src는 그대로
```

- `/catalog`가 `(home)/_src`의 코드를 쓰고 싶어지면 import하지 않고 공통 부모(`src/`)로 승격한다(3번).

## 16. 파일 하나에 컴포넌트 하나

```
❌ Sidebar/Sidebar.tsx   # Sidebar, SidebarNavItem, SidebarUserCard, SidebarContext, useSidebarContext

✅ Sidebar/
   ├── index.ts                        # Sidebar + SidebarProps
   ├── Sidebar.tsx                     # 루트
   ├── types.ts                        # NavItem 등 함께 쓰는 타입
   ├── hooks/useSidebarContext.ts      # Context + 훅
   └── components/
       ├── SidebarNavItem.tsx
       └── SidebarUserCard.tsx         # 비공개 조각도 자기 파일
```

- ❌ "작은 조각이니까" 같은 파일 아래쪽에 둔다. 비공개여도 컴포넌트면 자기 파일이다.
- ✅ 3줄짜리 비-컴포넌트 헬퍼(`isActive(href, pathname)`)는 그대로 둬도 된다. 다른 파일도 쓰기 시작하면 `libs/`로 뺀다.

## import: `'use client'` 경계는 잎에

```tsx
// ❌ apps/tide-dashboard/src/app/sales/page.tsx
"use client"; // 페이지 전체가 client 번들로 간다. 차트 하나 때문에.

// ✅ apps/tide-dashboard/src/app/sales/_src/components/SalesChart.tsx
"use client";
import { LineChart, Line } from "recharts";
```
