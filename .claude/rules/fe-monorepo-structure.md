# 프론트엔드 모노레포 구조 규칙

tide-web 모노레포(Next.js App Router 앱 여럿 + 내부 패키지)의 **콜로케이션** 구조 규칙. 파일·폴더를 만들거나 옮길 때, 앱·패키지를 추가할 때 따른다.
[fe-monorepo-architecture](https://github.com/chane81/fe-monorepo-architecture)의 규칙을 이 저장소(oxlint·oxfmt, tide 디자인 시스템, 목업 데이터, 반응형 한 벌)에 맞춘 것이다.

- 스코프 `@tide-web`, 앱 `tide-dashboard`(대시보드) · `tide-site`(tide 소개 사이트)
- 규칙 번호별 ✅/❌ 예시: `fe-monorepo-structure.examples.md`. 배치가 애매하면 같은 번호 예시부터 본다.

## 골격

```
<root>/
├── apps/
│   ├── tide-dashboard/src/
│   └── tide-site/src/
│       ├── app/                        # App Router
│       │   ├── layout.tsx
│       │   ├── (home)/                 # 루트 라우트 `/`(URL에 안 나오는 그룹)
│       │   │   ├── page.tsx
│       │   │   └── _src/               # `/` 전용
│       │   └── <route>/
│       │       ├── page.tsx
│       │       └── _src/               # 이 라우트(와 하위 라우트) 전용
│       │           └── {apis,components,hooks,libs,constants}/
│       └── {apis,components,hooks,libs,constants,types}/   # 앱 전역
├── packages/
│   ├── shared/{components,hooks,libs,constants}/   # 범용, 패키지 하나씩
│   ├── domains/<domain>/src/{apis,hooks,components,libs,constants}/   # 필요해질 때
│   ├── widgets/src/<Widget>/                        # 필요해질 때
│   └── config/typescript/                           # @tide-web/tsconfig
├── docs/                           # 저장소 전체 문서(tide-gaps, ADR, 트래커)
├── pnpm-workspace.yaml             # workspace + catalog
└── turbo.json
```

스택: pnpm workspace, Turborepo, 앱은 Next.js(Turbopack), packages는 Rslib로 `dist` 빌드. 린트·포맷은 루트에서 oxlint·oxfmt 한 번에. UI는 `@tide-design/components`·`@tide-design/icons`, 차트는 Recharts.

## 배치

1. **폴더 이름은 `components` `hooks` `libs` `constants` `apis` 다섯 개.** 어느 깊이에서든 같은 뜻이다(순수 함수 = `libs`, 데이터 읽기 = `apis`). `utils`·`helpers`·`services`·`common`이 떠오르면 이 다섯 중 하나를 고른다. 타입만 모은 파일은 `types.ts`(앱 전역은 `src/types/`).
2. **쓰는 곳 가장 가까이 둔다.** 범용 코드만 예외(4번).
3. **쓰는 곳이 실제로 늘면 가장 가까운 공통 부모로 승격한다.** 컴포넌트 내부 → 라우트 `_src` → 앱 `src/` → `packages/*`. 형제 라우트끼리면 부모 라우트 `_src`가 공통 부모다.
4. **packages 층마다 들어가는 조건이 다르다.**
   - `shared`: **범용** 코드는 앱 수와 상관없이 둔다. 범용 = 앱·도메인·화면 이름 없이 설명되고, 다른 앱에 옮겨도 그대로 동작한다(`formatDate`, `createThemeInitScript`).
   - `domains`(단일 도메인) / `widgets`(여러 도메인 조합): **2개 이상 앱**이 쓸 때. 앱 하나면 앱 안에 둔다.
5. **층을 넘을 때는 코드의 주인이 먼저다.** 2번은 같은 층 안에서만 적용한다. 앱 라우트에 달린 것(메뉴 목록, 저장 키 등)은 주인이 앱이다. 앱이 정의하고 props·인자로 넘긴다.
6. **플랫폼 분기는 하지 않는다.** 두 앱 모두 반응형 한 벌이다. desktop·mobile UI가 실제로 갈라지면 그 컴포넌트 안에서 `<C>/desktop/`·`<C>/mobile/`로 나누고(참고 저장소 6번), 이 규칙을 고친다.

## tide 디자인 시스템

7. **tide에 있는 UI는 다시 만들지 않는다.** 버튼·카드·표·탭 등은 `@tide-design/components`를 그대로 쓴다. tide에 없어서 조립한 UI(사이드바, 차트 래퍼, 사이트 헤더 등)는 쓰는 범위대로 앱 `src/components` 또는 `packages/*`에 두고, 부족한 점은 `docs/tide-gaps.md`에 적는다.
8. **색·간격·반경·글꼴은 tide 토큰(Tailwind 유틸리티, CSS 변수)으로만 쓴다.** hex를 직접 쓰지 않는다. 차트·SVG·그라디언트 색도 tide CSS 변수를 넘긴다(ADR 0002). tide 컴포넌트 모양을 `className`으로 덮어쓰기 전에, 그 필요를 `docs/tide-gaps.md`에 적을 만한지 먼저 본다.
   - 외부 도구가 자기 팔레트·글꼴을 내놓아도(예: `design-taste-frontend` 스킬) tide 토큰이 우선이다. 도구에서는 구성·카피·모션·검사만 가져온다.

## 의존 방향

9. **`apps → widgets → domains → shared` 한 방향.** packages는 apps(`@/` alias, 앱 패키지 이름)를 import하지 않는다. 앱끼리도 서로 import하지 않는다(필요하면 packages로 승격).
10. **(잠정) 도메인끼리 독립.** 조각은 각 도메인에, 조합은 widgets(2개 이상 앱) 또는 앱(앱 하나)이 맡는다.

9번 중 "packages → apps"는 루트 `.oxlintrc.json`의 `overrides` + `no-restricted-imports`가 막는다. 층 사이 방향(widgets·domains·shared)은 해당 층이 생길 때 같은 방식으로 추가한다.

## 데이터

11. **데이터는 목업이다. 읽기는 `apis/` 함수로만 한다.** 컴포넌트가 목업 파일을 직접 import하지 않는다. 나중에 실제 API로 바꿀 때 `apis/` 함수 안만 바뀐다.
    - 라우트 하나 → `_src/apis` · 같은 앱 여러 라우트 → `src/apis` · 2개 이상 앱 → `packages/domains/<domain>/src/apis`.
    - 파일: `<resource>.api.ts` + `<resource>.types.ts`, 목업 원본은 같은 폴더의 `<resource>.mock.ts`. 함수·타입은 HTTP 메서드 + 리소스(`getTransactions`, `GetTransactionsResponse`).
    - 도메인은 화면 이름이 아니라 **리소스**(transactions, customers)로 나눈다.
12. **차트·표에 넣기 전 가공(집계, 정렬, 포맷)은 `libs/` 순수 함수로 뺀다.** 테스트는 여기에 먼저 쓴다.

## 라우트

13. **라우트 파일(`page.tsx` / `layout.tsx`)에는 default export와 세그먼트 설정만 둔다.**
    - **13-1.** 보조 컴포넌트·데이터·상수는 `_src/`(라우트 전용) 또는 `src/`(앱 전역)로 내린다.
    - **13-2.** 캐시 선언(`'use cache'`, `cacheLife()`, `connection()`)은 정책의 주인 안에 적는다. 컴포넌트·데이터의 성질이면 그 컴포넌트나 `apis/` 함수 안이다.
    - **13-3. 예외:** 공용 컴포넌트 하나를 라우트마다 다른 정책으로 쓰면, 라우트 파일에 "디렉티브 + 컴포넌트 반환"만 하는 래퍼를 둔다. 래퍼에 마크업·데이터 읽기가 섞이면 그 부분은 `_src/components`로 내린다.
14. **Slot(서버에서 쿠키·헤더를 읽어 client 컴포넌트에 넘기는 껍데기)은 두 경우에만 만든다.** ① 라우트 둘 이상이 같은 읽기를 한다. ② 읽기가 `<Suspense>` 안쪽이어야 한다(layout 본문에서 읽으면 프리렌더가 깨진다). 그 밖에는 `page.tsx`가 직접 읽는다.
15. **루트 라우트(`/`)는 `(home)` 그룹으로 두고 그 전용 코드는 `app/(home)/_src`에 둔다. 그룹 밖 `app/_src`는 만들지 않는다.** `app/_src`는 모든 라우트가 import할 수 있어 앱 전역과 같은 뜻이다. `(home)`은 URL에 나오지 않으므로 `/`는 그대로이고, 다른 라우트는 `(home)/_src`를 import하지 않는다(형제 라우트 규칙). 두 앱 모두에 적용한다.

## 파일 하나의 범위

16. **파일 하나에 컴포넌트 하나.** 공개·비공개, 앱·패키지를 가리지 않고 컴포넌트 함수는 파일마다 하나다. 본문 파일(`<C>.tsx`)에는 대표 컴포넌트와 그 props 타입만 남기고 나머지는 컴포넌트 폴더 안으로 뺀다(1번 폴더 이름 그대로).
    - 하위·보조 컴포넌트 → `<C>/components/<Name>.tsx`. props 타입은 그 컴포넌트 파일에 같이 둔다.
    - Context와 그것을 읽는 훅 → `<C>/hooks/use<C>Context.ts`. 상태·이벤트 로직 → `<C>/hooks/useXxx.ts`.
    - 하위 컴포넌트들이 함께 쓰는 타입 → `<C>/types.ts`. 상수 → `<C>/constants/`, 순수 함수 → `<C>/libs/`.
    - 같은 파일에 남겨도 되는 것: 그 컴포넌트만 쓰는 몇 줄짜리 비-컴포넌트 헬퍼. 다른 파일이 쓰기 시작하면 위 폴더로 뺀다.
    - 신호: 본문 파일이 200줄을 넘거나 컴포넌트 함수가 둘 이상 보이면 나눌 곳부터 찾는다.
    - 13-1번(라우트 파일)은 이 규칙을 라우트에 적용한 것이다.

## 위치 표

| 코드                                 | 2개 이상 앱                       | 앱 하나                      |
| ------------------------------------ | --------------------------------- | ---------------------------- |
| 범용 (`formatDate`, `ThemeToggle`)   | `packages/shared/*`               | `packages/shared/*`          |
| 단일 리소스 (`getTransactions`)      | `packages/domains/<domain>/src/*` | 라우트 `_src/*` 또는 `src/*` |
| 여러 리소스 조합 (`Sidebar`, Header) | `packages/widgets/src/<Widget>`   | `src/components`             |

- hooks·libs·constants는 범위대로 내려간다: 컴포넌트 하나 → `<C>/hooks` · 라우트 하나 → `_src/hooks` · 앱 전역 → `src/hooks`.
- 라우트 하나의 `_src`: 루트 라우트(`/`)는 `app/(home)/_src`, 나머지는 `app/<route>/_src`(15번).

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
- **훅:** `useXxx.ts`. **테스트:** 대상 옆에 `<name>.test.ts(x)`.
- **앱:** `tide-<역할>`(`tide-dashboard`, `tide-site`). **패키지:** `@tide-web/<name>`(`@tide-web/libs`, `@tide-web/components`, `@tide-web/tsconfig`).

## import와 배럴

- **경로:** 라우트 안은 상대경로, 라우트 밖은 `@/`(= 그 앱의 `src/`). 하위 라우트는 부모 라우트의 `_src`를 쓸 수 있다. 반대 방향(부모 → 자식 `_src`)과 형제 라우트 `_src` 간 import는 쓰지 않는다. 필요해지면 공통 부모로 승격한다(3번).
- **앱 소스 배럴:** 컴포넌트 폴더마다 `index.ts` 하나, **대표 컴포넌트만** 네임드로 재수출한다. 내부 `components/`·`hooks/`·`libs/`에는 배럴을 두지 않고, 조각은 파일 경로로 import한다.
  - 이유: 배럴은 재수출한 모듈을 모두 소비자 청크와 client reference manifest에 싣는다. 조각 경로를 여러 곳이 쓰면 그 조각은 이미 그 컴포넌트의 것이 아니다 → 승격(3번).
  ```ts
  export { X } from "./X";
  export type { XProps } from "./X"; // 타입은 값과 다른 줄
  ```
- **패키지 진입점:** `src/index.ts`에서 `export *`로 공개하고 `.` 하나만 둔다. 컴포넌트별 subpath는 두지 않는다. dist(파일 단위) + `"sideEffects": false` + Turbopack이면 안 쓰는 파일은 빠진다.
- **`'use client'`는 파일 단위다. 배럴은 디렉티브를 전달하지 않는다.** 경계가 필요한 파일이 자기 머리에 적고, 그 코드를 다른 파일로 옮길 때 디렉티브도 같이 옮긴다. 배럴에는 적지 않는다.
  - tide 컴포넌트는 서버 컴포넌트에서 바로 import된다. `'use client'`는 앱 코드가 상태·이벤트·브라우저 API를 쓸 때, 그리고 Recharts를 감싸는 파일에만 적는다.
  - 경계는 가능한 한 아래(잎)에 둔다. 페이지 전체를 client로 만들지 않는다.

## 빌드·패키지 설정

1. **workspace:** `pnpm-workspace.yaml`에 `apps/*`, `packages/config/*`, `packages/shared/*`(층이 생기면 `packages/domains/*`, `packages/widgets`)를 등록한다. 내부 패키지 의존은 `"workspace:*"`.
   - 외부 의존성 버전은 `pnpm-workspace.yaml`의 `catalog`에서만 정하고 `package.json`에는 `"catalog:"`로 적는다(`catalogMode: strict`).
2. **패키지:** Rslib bundleless로 `dist`에 빌드한다. 소스 파일마다 출력 파일이 하나씩 생기고 `'use client'`도 파일별로 남는다. 앱은 `dist`를 쓴다(`transpilePackages` 없음).
   ```ts
   // rslib.config.ts
   export default defineConfig({
     lib: [{ format: "esm", bundle: false, outBase: "./src", dts: { isolated: true } }],
     output: { target: "web" },
     plugins: [pluginReact()], // React 패키지만
   });
   ```
   ```json
   {
     "type": "module",
     "sideEffects": false,
     "exports": { ".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" } },
     "scripts": {
       "build": "rslib build",
       "dev": "rslib build --watch --no-clean",
       "typecheck": "tsc --noEmit"
     }
   }
   ```
   - `outBase: './src'`: 없으면 JS와 d.ts 경로가 어긋난다. `dts: { isolated: true }`면 export하는 함수·컴포넌트에 반환 타입을 적는다.
   - `--no-clean`: watch들이 동시에 dist를 비우면 다른 패키지가 잠시 d.ts를 못 찾는다.
3. **앱:** Tailwind v4는 `globals.css`에 `@source '<packages 경로>';`를 적어 패키지 클래스를 스캔한다. 포트는 앱마다 고정한다(`tide-dashboard` 3000, `tide-site` 3001).
4. **`turbo.json`:** `build`·`dev`·`typecheck`·`test`는 `"dependsOn": ["^build"]`, `dev`는 `"cache": false, "persistent": true`.
5. **`packages/config/typescript`(`@tide-web/tsconfig`):** `base` / `nextjs`(라이브러리 패키지가 생기면 `react-library`). 앱 `tsconfig.json`은 `extends`하고 `paths`·`types`만 더한다.
6. **린트·포맷:** 루트 `.oxlintrc.json`·`.oxfmtrc.json` 하나로 저장소 전체를 검사한다(`pnpm lint`, `pnpm format:check`). 범위별 규칙은 `overrides`로 더한다.
7. **검사 명령:** 루트에서 `pnpm typecheck`·`pnpm lint`·`pnpm format:check`·`pnpm test`·`pnpm build`. 앱 `typecheck`는 `next typegen && tsc --noEmit`.

## 애매할 때

1~3번과 16번은 빼거나 느슨하게 바꾸지 않는다. 규칙으로 정해지지 않는 배치는 선택지와 근거(쓰는 범위, 코드의 주인, 리소스 조합 여부)를 제시해 사용자에게 묻는다.
