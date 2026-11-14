# 앱 구조 규칙 — 예시

`app-structure.md` 규칙의 예시다. 번호는 규칙 번호와 같다.
규칙 본문은 그쪽이 기준이고, 여기는 판단이 갈리는 장면만 보여 준다.

---

## 1. 같은 폴더 이름을 모든 깊이에서 반복한다

```
❌ src/app/cards/_src/utils/formatCardNumber.ts
❌ src/helpers/currency.ts
❌ src/common/StatCard.tsx

✅ src/app/cards/_src/libs/formatCardNumber.ts
✅ src/libs/formatCurrency.ts
✅ src/components/StatCard.tsx
```

순수 함수 = `libs`, 상수 = `constants`, 훅 = `hooks`, 데이터 읽기 = `apis`. 깊이가 달라도 이름은 같다.

## 2·3. 쓰는 곳 가까이 두고, 공유가 넓어지면 공통 부모로 올린다

거래 필터 `useTransactionFilter`가 처음에는 `TransactionTable`에서만 쓰인다.

```
① 컴포넌트 하나                  src/app/cards/_src/components/TransactionTable/hooks/useTransactionFilter.ts
② 같은 라우트의 SpendingChart도 씀 → src/app/cards/_src/hooks/useTransactionFilter.ts
③ /sales 라우트도 씀              → src/hooks/useTransactionFilter.ts
```

- ❌ "언젠가 다른 데서도 쓸 테니" 처음부터 ③에 두지 않는다.
- 형제 라우트 `/customers/active`와 `/customers/churned`가 함께 쓰면 공통 부모인 `src/app/customers/_src/`로 올린다. 바로 `src/`로 건너뛰지 않는다.

## 4. tide에 있는 UI는 다시 만들지 않는다

```tsx
// ❌ src/components/KpiBadge.tsx — tide Badge와 같은 일을 직접 구현
export function KpiBadge({ value }: { value: number }) {
  return <span className="rounded-full bg-green-100 px-2 text-green-700">{value}%</span>;
}

// ✅ tide Badge를 그대로 쓴다
import { Badge } from '@tide-design/components';
<Badge color="success">{value}%</Badge>;
```

tide에 없는 사이드바는 tide `Link`·`Avatar`·`Menu`로 조립해 `src/components/Sidebar/`에 두고, `docs/tide-gaps.md`에 "Sidebar 없음"을 적는다.

## 6. 데이터 읽기는 `apis/` 함수로만

```tsx
// ❌ 컴포넌트가 목업을 직접 import
import { transactions } from '../apis/transactions.mock';

// ✅ apis 함수를 거친다
import { getTransactions } from '../apis/transactions.api';
const { items } = await getTransactions({ page: 1 });
```

## 7. 가공은 `libs/` 순수 함수로

```tsx
// ❌ 차트 컴포넌트 안에서 월별 합계를 계산
const data = transactions.reduce(/* 월별 합산 */);

// ✅ src/app/cards/_src/libs/sumByMonth.ts + sumByMonth.test.ts
const data = sumByMonth(transactions);
```

## 8. 라우트 파일에는 라우트만 둔다

### 8-1. 보조 컴포넌트는 `_src/components`로 내린다

```tsx
// ❌ src/app/sales/page.tsx
async function SalesKpis() {
  const kpis = await getSalesKpis();
  return <div className="grid grid-cols-3 gap-6">{/* ... */}</div>;
}

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <SalesKpis />
    </Suspense>
  );
}
```

```tsx
// ✅ src/app/sales/page.tsx — 셸과 경계만
import { SalesKpis } from './_src/components/SalesKpis';

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <SalesKpis />
    </Suspense>
  );
}
// SalesKpis 본문은 src/app/sales/_src/components/SalesKpis.tsx
```

### 8-2. 정책이 컴포넌트·데이터의 성질이면 그 안에 적는다

```tsx
// ❌ src/app/page.tsx — 정책 하나 + 컴포넌트 하나인데 래퍼를 둠
async function CachedMembers() {
  'use cache';
  cacheLife('hours');
  return <TopMembers />;
}
```

```tsx
// ✅ src/components/TopMembers.tsx — 정책을 주인 안에
export async function TopMembers() {
  'use cache';
  cacheLife('hours');
  const members = await getTopMembers();
  return <MemberList items={members} />;
}
```

## 9. `app/_src`는 만들지 않는다

루트 라우트(`app/page.tsx`)에서만 쓰는 `MrrChart`를 둘 곳.

```
❌ src/app/_src/components/MrrChart.tsx   # 모든 라우트가 import할 수 있는 자리 = 앱 전역과 같은 뜻
✅ src/components/MrrChart.tsx
✅ src/app/sales/_src/components/...      # 루트가 아닌 세그먼트의 _src는 정상
```

## 10. 파일 하나에 컴포넌트 하나

```
❌ Sidebar/Sidebar.tsx   # Sidebar, SidebarNavItem, SidebarUserCard, SidebarContext, useSidebarContext

✅ Sidebar/
   ├── index.ts                        # Sidebar + SidebarProps
   ├── Sidebar.tsx                     # 루트: 접힘 상태 + Context 제공
   ├── types.ts                        # NavItem 등 함께 쓰는 타입
   ├── hooks/useSidebarContext.ts      # SidebarContext + useSidebarContext
   └── components/
       ├── SidebarNavItem.tsx
       └── SidebarUserCard.tsx         # 비공개 조각도 자기 파일
```

- ❌ "Sidebar만 쓰는 작은 조각이니까" `SidebarUserCard`를 `Sidebar.tsx` 아래쪽에 둔다. 비공개여도 컴포넌트면 자기 파일이다.
- ✅ `Sidebar.tsx` 안의 3줄짜리 `isActive(href, pathname)` 같은 비-컴포넌트 헬퍼는 그대로 둬도 된다. 다른 파일도 쓰기 시작하면 `Sidebar/libs/isActive.ts`로 뺀다.
- 라우트 화면도 같다. `TransactionTable.tsx` 안에 `TransactionRow`를 같이 적지 않고 `TransactionTable/components/TransactionRow.tsx`로 뺀다.

## import: `'use client'` 경계는 잎에

```tsx
// ❌ src/app/sales/page.tsx
'use client';
// 페이지 전체가 client 번들로 간다. 차트 하나 때문에.

// ✅ src/app/sales/_src/components/SalesChart.tsx
'use client';
import { LineChart, Line } from 'recharts';
// page.tsx와 나머지 카드는 서버 컴포넌트로 남는다.
```
