# 01: 디자인 게이트 통과와 개발 모드 오류

Status: done
Blocked by: None (can start immediately)
Spec: [../spec.md](../spec.md)

## What to build

design-taste-frontend gate FAIL 27개를 고치거나, 검사가 tide 우선 결정과 부딪히는 곳은 이유를 적어 면제한다. `next dev`에서 hydration 뒤 `<html>`의 `data-theme`·class가 사라지는 문제를 고친다.

## Acceptance criteria

- [x] `gate.mjs out/index.html --root out`이 `GATE: PASS`(면제 5개 이하, 키트 파일 수정 없음)
- [x] layout check 다섯 크기에서 면제한 `hero-lines` 말고 지적 없음
- [x] `next dev`에서 페이지가 오류 화면으로 바뀌지 않고 `data-theme`·키트 class가 남음
- [x] tide 부족한 점을 `docs/tide-gaps.md`에 기록

## Comments

- 검사기가 살아 있는 tide UI를 시각물로 못 알아본 것은 키트의 「제품 UI 조각」 표시 `data-ui`(값 없음: 키트가 자기 조각을 그려 넣지 않음)를 히어로 창·Component 창·테마 견본에 붙여 맞췄다.
- 개발 모드 원인: 서버 컴포넌트가 넘긴 `Button render={<a />}`가 개발 모드에서 lazy 참조로 넘어와 tide `renderElement`가 TypeError를 내고 Next가 페이지를 오류 화면(`<html id="__next_error__">`)으로 바꿨다. 속성이 「지워진」 것처럼 보인 이유다. `ButtonLink`(client)로 고쳤다. 함께 `InlineScript`를 client 컴포넌트로 바꿔 script 경고를 없애고, Strict Mode 재마운트가 지우는 키트 class는 `KitScripts`가 다시 붙인다.
- 면제 5개: motion-layer(@import로 읽은 motion.css를 검사기가 못 읽음), text-contrast(tide dark primary solid 4.36:1), hero-lines(36자 기준이 라틴 글자 기준), button-styles 한 화면(Component 창의 Button 변형), dark-ground(테마 견본의 dark 바탕).
