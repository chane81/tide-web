# 03: 테마 전환

Status: ready-for-agent
Blocked by: 02
Spec: [../spec.md](../spec.md) (User Stories 5, 20–23)

## What to build

셸에서 light/dark 테마를 바꾼다. tide 방식대로 `<html data-theme>`로 전환하고, 선택은 저장되며, 첫 방문은 운영체제 설정을 따른다. 첫 렌더부터 올바른 테마라 깜빡임이 없다.

## Acceptance criteria

- [ ] 셸에 테마 토글이 있다. 누르면 `<html>`의 `data-theme`이 바뀌고 선택이 저장된다(RTL 테스트).
- [ ] 저장된 선택이 없으면 `prefers-color-scheme`을 따른다.
- [ ] 새로고침 시 hydration 전에 테마가 정해져 깜빡임이 없고, hydration 경고도 없다.
- [ ] 다섯 화면을 dark로 눈 확인하고, 어색한 점은 `docs/tide-gaps.md`에 기록한다.
- [ ] 검사 명령 통과.

## Comments
