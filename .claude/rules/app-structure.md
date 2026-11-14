# 앱 구조 규칙

Next.js(App Router) 단일 앱의 **콜로케이션** 구조 규칙. 파일·폴더를 만들거나 옮길 때 따른다.

- 규칙 번호별 ✅/❌ 예시: `app-structure.examples.md`. 배치가 애매하면 같은 번호 예시부터 본다.

## 골격

```
<root>/
├── src/
│   ├── app/                        # App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── <route>/
│   │       ├── page.tsx
│   │       └── _src/               # 이 라우트(와 하위 라우트) 전용
│   │           └── {apis,components,hooks,libs,constants}/
│   └── {apis,components,hooks,libs,constants,types}/   # 앱 전역
├── docs/
├── package.json
└── pnpm-workspace.yaml             # catalog, 설치 정책
```

스택: Next.js(Turbopack), pnpm, TypeScript, Tailwind CSS v4, oxlint, oxfmt, Vitest + React Testing Library. UI는 `@tide-design/components`·`@tide-design/icons`, 차트는 Recharts.

## 배치

1. **폴더 이름은 `components` `hooks` `libs` `constants` `apis` 다섯 개.** 어느 깊이에서든 같은 뜻이다(순수 함수 = `libs`, 데이터 읽기 = `apis`). `utils`·`helpers`·`services`·`common`이 떠오르면 이 다섯 중 하나를 고른다. 타입만 모은 파일은 `types.ts`(앱 전역은 `src/types/`).
2. **쓰는 곳 가장 가까이 둔다.** 처음부터 "언젠가 다른 데서도 쓸 테니" 위로 올리지 않는다.
3. **쓰는 곳이 실제로 늘면 가장 가까운 공통 부모로 승격한다.** 컴포넌트 내부 → 라우트 `_src` → 앱 `src/`. 형제 라우트끼리면 부모 라우트 `_src`가 공통 부모다.
4. **tide에 있는 UI는 다시 만들지 않는다.** 버튼·카드·테이블 등은 `@tide-design/components`를 그대로 쓴다. tide에 없어서 조립한 UI(사이드바, 차트 래퍼 등)는 `src/components`에 두고, 부족한 점은 `docs/tide-gaps.md`에 적는다.
5. **앱 레이아웃에 달린 것(메뉴 목록, 사이드바 항목 등)은 주인이 앱이다.** 상수는 `src/constants`에 두고 props로 넘긴다.

## 데이터

6. **데이터는 목업이다. 읽기는 `apis/` 함수로만 한다.** 컴포넌트가 목업 파일을 직접 import하지 않는다. 나중에 실제 API로 바꿀 때 `apis/` 함수 안만 바뀐다.
   - 라우트 하나 → `_src/apis` · 여러 라우트 → `src/apis`.
   - 파일: `<resource>.api.ts` + `<resource>.types.ts`. 함수·타입은 HTTP 메서드 + 리소스(`getTransactions`, `GetTransactionsResponse`).
   - 목업 원본은 같은 `apis/` 폴더의 `<resource>.mock.ts`에 둔다.
7. **차트·표에 넣기 전 가공(집계, 정렬, 포맷)은 `libs/` 순수 함수로 뺀다.** 테스트는 여기에 먼저 쓴다.

## 라우트

8. **라우트 파일(`page.tsx` / `layout.tsx`)에는 default export와 세그먼트 설정만 둔다.**
   - **8-1.** 보조 컴포넌트·데이터·상수는 `_src/`(라우트 전용) 또는 `src/`(앱 전역)로 내린다.
   - **8-2.** 캐시 선언(`'use cache'`, `cacheLife()`, `connection()`)은 정책의 주인 안에 적는다. 컴포넌트·데이터의 성질이면 그 컴포넌트나 `apis/` 함수 안이다.
   - **8-3. 예외:** 공용 컴포넌트 하나를 라우트마다 다른 정책으로 쓰면, 라우트 파일에 "디렉티브 + 컴포넌트 반환"만 하는 래퍼를 둔다. 디렉티브는 prop으로 켤 수 없기 때문이다. 래퍼에 마크업·데이터 읽기가 섞이면 그 부분은 `_src/components`로 내린다.
9. **루트 라우트 전용 코드는 `src/`에 둔다.** `app/_src`는 모든 라우트가 import할 수 있어 앱 전역과 같은 뜻이다. `_src`는 루트가 아닌 세그먼트에만 둔다.

## 파일 하나의 범위

10. **파일 하나에 컴포넌트 하나.** 공개·비공개를 가리지 않고 컴포넌트 함수는 파일마다 하나다. 본문 파일(`<C>.tsx`)에는 대표 컴포넌트와 그 props 타입만 남기고 나머지는 컴포넌트 폴더 안으로 뺀다(1번 폴더 이름 그대로).
    - 하위·보조 컴포넌트 → `<C>/components/<Name>.tsx`. props 타입은 그 컴포넌트 파일에 같이 둔다.
    - Context와 그것을 읽는 훅 → `<C>/hooks/use<C>Context.ts`. 상태·이벤트 로직 → `<C>/hooks/useXxx.ts`.
    - 하위 컴포넌트들이 함께 쓰는 타입 → `<C>/types.ts`. 상수 → `<C>/constants/`, 순수 함수 → `<C>/libs/`.
    - 같은 파일에 남겨도 되는 것: 그 컴포넌트만 쓰는 몇 줄짜리 비-컴포넌트 헬퍼. 다른 파일이 쓰기 시작하면 위 폴더로 뺀다.
    - 신호: 본문 파일이 200줄을 넘거나 컴포넌트 함수가 둘 이상 보이면 나눌 곳부터 찾는다.
    - 8-1번(라우트 파일)은 이 규칙을 라우트에 적용한 것이다.

## 위치 표

| 코드 | 라우트 하나 | 여러 라우트 |
|---|---|---|
| 컴포넌트 (`TransactionTable`) | `app/<route>/_src/components` | `src/components` |
| 훅 (`useTableSelection`) | `app/<route>/_src/hooks` | `src/hooks` |
| 순수 함수 (`formatCurrency`) | `app/<route>/_src/libs` | `src/libs` |
| 데이터 읽기 (`getTransactions`) | `app/<route>/_src/apis` | `src/apis` |

- 컴포넌트 하나만 쓰면 `<C>/hooks`·`<C>/libs`처럼 컴포넌트 폴더 안이 먼저다.

## 이름

- **컴포넌트:** 단순하면 `PascalCase.tsx` 파일 하나. 전용 `components`·`hooks`·`libs`·`constants`나 `types.ts`가 생기면 폴더로 바꾼다. 폴더로 바꿔도 import 경로는 같다.
  ```
  components/
  ├── StatCard.tsx
  └── Sidebar/
      ├── index.ts           # 재수출만
      ├── Sidebar.tsx        # 본문 (index.tsx에 쓰지 않는다: 에디터·diff에서 구분 안 됨)
      ├── components/SidebarNavItem.tsx
      └── hooks/useSidebarCollapse.ts
  ```
- **훅:** `useXxx.ts`.
- **테스트:** 대상 옆에 `<name>.test.ts(x)`.

## import와 배럴

- **경로:** 라우트 안은 상대경로, 라우트 밖은 `@/`(= `src/`). 하위 라우트는 부모 라우트의 `_src`를 쓸 수 있다. 반대 방향(부모 → 자식 `_src`)과 형제 라우트 `_src` 간 import는 쓰지 않는다. 필요해지면 공통 부모로 승격한다(3번).
- **배럴:** 컴포넌트 폴더마다 `index.ts` 하나, **대표 컴포넌트만** 네임드로 재수출한다. 내부 `components/`·`hooks/`·`libs/`에는 배럴을 두지 않고, 조각은 파일 경로로 import한다.
  - 이유: 배럴은 재수출한 모듈을 모두 소비자 청크와 client reference manifest에 싣는다. 조각 경로를 여러 곳이 쓰면 그 조각은 이미 그 컴포넌트의 것이 아니다 → 승격(3번).
  ```ts
  export { X } from './X';
  export type { XProps } from './X';   // 타입은 값과 다른 줄
  ```
- **`'use client'`는 파일 단위다. 배럴은 디렉티브를 전달하지 않는다.** 경계가 필요한 파일이 자기 머리에 적고, 그 코드를 다른 파일로 옮길 때 디렉티브도 같이 옮긴다. 배럴에는 적지 않는다.
  - tide 컴포넌트는 서버 컴포넌트에서 바로 import된다. `'use client'`는 앱 코드가 상태·이벤트·브라우저 API를 쓸 때, 그리고 Recharts를 감싸는 파일에만 적는다.
  - 경계는 가능한 한 아래(잎)에 둔다. 페이지 전체를 client로 만들지 않는다.

## 스타일

- 색·간격·반경은 tide 토큰(Tailwind 유틸리티, CSS 변수)으로만 쓴다. hex를 직접 쓰지 않는다. 차트 색도 tide CSS 변수를 넘긴다(다크 테마를 따라가게).
- tide 컴포넌트의 모양을 `className`으로 덮어쓰기 전에, 그 필요를 `docs/tide-gaps.md`에 적을 만한지 먼저 본다.

## 애매할 때

1~3번과 10번은 빼거나 느슨하게 바꾸지 않는다. 규칙으로 정해지지 않는 배치는 선택지와 근거(쓰는 범위, 코드의 주인)를 제시해 사용자에게 묻는다.
