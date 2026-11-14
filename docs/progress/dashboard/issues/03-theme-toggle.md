# 03: 테마 전환

Status: done
Blocked by: 02
Spec: [../spec.md](../spec.md) (User Stories 5, 20–23)

## What to build

셸에서 light/dark 테마를 바꾼다. tide 방식대로 `<html data-theme>`로 전환하고, 선택은 저장되며, 첫 방문은 운영체제 설정을 따른다. 첫 렌더부터 올바른 테마라 깜빡임이 없다.

## Acceptance criteria

- [x] 셸에 테마 토글이 있다. 누르면 `<html>`의 `data-theme`이 바뀌고 선택이 저장된다(RTL 테스트).
- [x] 저장된 선택이 없으면 `prefers-color-scheme`을 따른다.
- [x] 새로고침 시 hydration 전에 테마가 정해져 깜빡임이 없고, hydration 경고도 없다.
- [x] 다섯 화면을 dark로 눈 확인하고, 어색한 점은 `docs/tide-gaps.md`에 기록한다.
- [x] 검사 명령 통과.

## Comments

### 2026-11-14 구현 결과

근거: Next.js 16.4 설치본 문서 `02-guides/preventing-flash-before-hydration.md`(Themes, Re-applying attributes in development).

- `src/app/layout.tsx`: `<head>`에 인라인 스크립트, `<html suppressHydrationWarning>`. 서버는 `data-theme`을 붙이지 않는다(tide `:root`가 light).
- `src/libs/createThemeInitScript.ts`: 저장된 light·dark → 그 값, 아니면 `prefers-color-scheme`. 판단 규칙은 `src/libs/theme.ts`의 `resolveTheme`과 같다.
- `src/components/ThemeToggle.tsx`: tide `Switch`(「다크 테마」). 상태는 `<html data-theme>`을 `useSyncExternalStore` + `MutationObserver`로 읽는다. 개발 모드 Strict Mode 재마운트가 `<html>` 속성을 지우므로 `useLayoutEffect`에서 다시 붙인다.
- 위치: 사이드바 보조 메뉴 아래(`Sidebar`에 `footerActions` prop 추가, layout에서 넘김). 모바일은 오버레이 사이드바 안에서 쓴다.
- 저장 키: `src/constants/theme.ts`의 `tide-web-theme`.

확인:

- 테스트: `ThemeToggle`(누르면 `data-theme`·저장 변경, 저장 없음 → OS dark, 저장이 OS보다 우선), `createThemeInitScript`(만든 문자열을 실제로 실행), `resolveTheme`·`isTheme`.
- 브라우저(dev 서버): OS dark에서 첫 방문 dark → light로 바꾸고 다시 dark → 새로고침·다른 화면 이동 후에도 dark 유지. 콘솔에 hydration·script 경고 없음.
- dark 눈 확인: 다섯 화면 + not-found + 계정 메뉴 + 모바일 오버레이. 어색한 점 4건을 `docs/tide-gaps.md`에 기록(테마 도구 없음, dark overlay 약함, dark faint 배지 대비, canvas=surface).
- 알려진 한계: 서버는 테마를 몰라 스위치를 꺼진 상태로 그리고, dark 사용자는 hydration 직후 켜짐으로 바뀐다(화면 색은 스크립트가 먼저 정해 깜빡이지 않는다).
- 커밋: `c5c35d9`(테마 전환). 같은 작업 중 사용자 요청으로 `c060e27`(catalog 제거)도 함께 했다.
