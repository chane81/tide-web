# 02: 공통 셸

Status: done
Blocked by: 01
Spec: [../spec.md](../spec.md) (User Stories 12–19, 64)

## What to build

모든 화면을 감싸는 셸. 왼쪽 사이드바에서 다섯 화면(개요, 매출, 카드, 고객, 설정)으로 이동하고, 각 화면 위에 페이지 헤더가 있다. tide에 Sidebar가 없으므로 tide 컴포넌트로 조립하고 `docs/tide-gaps.md`에 기록한다. 각 라우트는 페이지 헤더와 빈 본문 자리만 둔다.

## Acceptance criteria

- [x] 사이드바: 로고, 검색 입력과 ⌘K 표시(동작 없음), 메뉴 항목(아이콘, 이름, 숫자 배지), 아래쪽 지원·설정 링크, 닫을 수 있는 공지 카드, 유저 카드(Avatar, 이름, 이메일).
- [x] 메뉴 항목 목록은 앱 상수로 두고 props로 넘긴다.
- [x] 현재 경로의 메뉴 항목이 강조되고 `aria-current="page"`를 가진다(RTL 테스트).
- [x] 유저 카드를 누르면 tide Menu로 계정 메뉴(프로필, 설정, 로그아웃)가 열린다.
- [x] 페이지 헤더: 제목, 설명, Breadcrumb, 액션 자리.
- [x] 좁은 화면에서는 사이드바가 숨고 메뉴 버튼으로 오버레이 사이드바를 열고 닫는다. 키보드로도 된다.
- [x] tide Toast를 띄울 수 있는 영역이 셸에 준비되어 있다.
- [x] 없는 주소는 안내와 홈 링크가 있는 not-found 화면을 보인다.
- [x] `docs/tide-gaps.md`에 Sidebar 조립 방식과 아쉬운 점을 기록한다.
- [x] 검사 명령(typecheck·lint·format:check·test·build) 통과.

## Comments

### 2026-11-14 구현 결과

구성:

- 셸: `src/components/AppShell/` — 넓은 화면은 왼쪽 고정 사이드바, `lg` 미만은 상단 바 + 메뉴 버튼으로 여는 오버레이(`MobileSidebar`, 네이티브 `<dialog>` 모달). Toast 영역(`AppToastRegion`)과 큐(`src/libs/toasts.ts`)를 셸에 둔다.
- 사이드바: `src/components/Sidebar/` — 서버 컴포넌트. client는 잎 조각만(`SidebarNavItem` 활성 판정, `SidebarAnnouncement` 닫기, `SidebarUserMenu` 계정 메뉴).
- 메뉴 목록: `src/constants/navItems.tsx`(앱 상수) → layout에서 props로 넘김.
- 사용자: `src/apis/currentUser.api.ts`(`'use cache'`, 목업)를 layout이 읽어 props로 넘김. 캐시되므로 Slot 없이 프리렌더된다.
- 페이지 헤더: `src/components/PageHeader.tsx`. 다섯 라우트는 헤더 + 빈 본문 자리(`PageBodyPlaceholder`).
- not-found: `src/app/not-found.tsx`(404 안내 + 홈 버튼).

사용자 요청으로 추가: `fetch`를 쓰는 서버 컴포넌트 예시

- `src/apis/tidePackage.api.ts`: npm registry에서 `@tide-design/components` 최신 버전을 `fetch`로 읽는다. `'use cache'` + `cacheLife("hours")`, 실패하면 `null`.
- `src/components/Sidebar/components/SidebarTideVersion.tsx`: 위 함수를 await하는 async 서버 컴포넌트. 사이드바 맨 아래에 「npm 최신 tide 0.11.4」로 보인다. 빌드 때 프리렌더 HTML에 들어간 것을 확인했다.
- 테스트: `tidePackage.api.test.ts`(응답 모양, HTTP 실패·네트워크 오류 시 `null`). async 서버 컴포넌트 렌더는 스펙대로 테스트하지 않는다.

확인:

- 테스트: `SidebarNavItem`(aria-current, 하위 경로, 배지, 바깥 링크), `SidebarUserMenu`(열기, 항목, 설정 이동), `PageHeader`, `getTidePackage`.
- 브라우저(`next start`): 1440px·390px 폭. 오버레이를 메뉴 버튼으로 열면 닫기 버튼에 포커스, Esc로 닫고 여는 버튼으로 포커스 복귀, 메뉴 링크를 누르면 이동하면서 닫힘. 계정 메뉴를 키보드(↓·Enter)로 로그아웃 → Toast 표시.
- 오버레이 `<dialog>`의 바깥 클릭 닫기는 마우스 보조 동작이라 해당 줄만 `jsx-a11y` 규칙을 끄고 근거 주석을 남겼다.
- 첫 티켓 샘플 테스트 `src/app/page.test.tsx`는 첫 화면이 바뀌어 지웠다. tide 렌더 테스트는 `PageHeader.test.tsx` 등이 대신한다.
- `docs/tide-gaps.md`: Sidebar 행 갱신, 내비게이션 링크·Drawer·Input 장식·Kbd·점선 Card 5건 추가.
- 커밋: `909df68`(공통 셸), `2514d35`(fetch 서버 컴포넌트 예시).
