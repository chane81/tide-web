# 09: 마무리 점검

Status: done
Blocked by: 03, 05, 06, 07, 08
Spec: [../spec.md](../spec.md) (User Stories 1–11)

## What to build

다섯 화면을 한 번에 훑어 디자인 시스템 확인이라는 목적을 마무리한다. 반응형·키보드·테마를 점검하고, `docs/tide-gaps.md`를 tide 저장소에 옮길 수 있게 정리한다.

## Acceptance criteria

- [x] 다섯 화면을 데스크톱·태블릿·모바일 폭에서 light/dark로 확인하고, 무너지는 곳을 고친다.
- [x] 사이드바·탭·테이블·메뉴·다이얼로그를 키보드만으로 조작할 수 있다.
- [x] 앱 코드에 hex 색이 없다(검색으로 확인).
- [x] tide 컴포넌트를 `className`으로 덮어쓴 곳을 모두 찾아 `docs/tide-gaps.md`에 반영한다.
- [x] `docs/tide-gaps.md`를 항목별(없는 컴포넌트, 부족한 API, 토큰, 문서)로 정리하고 우선순위를 붙인다.
- [x] 쓰지 않은 tide 컴포넌트가 있으면 이유와 함께 적는다.
- [x] 검사 명령 통과.

## Comments

### 2026-11-14 점검 결과

반응형·테마:

- 다섯 화면을 390px(dark)·768px(light)·1024px(dark)로 한 번에 찍어 비교했다. 1440px light·dark와 모바일 일부는 06~08에서 이미 확인.
- 고친 곳
  - 1024px 고객 표: 사이드바 때문에 본문이 좁아 결제 금액 열이 잘리고 머리글이 줄바꿈됐다 → `xl` 미만에서는 이메일 열을 숨기고 이름 아래에 이메일을 보인다. 정렬 머리글은 줄바꿈 금지.
  - 390px 고객 표: `md` 미만은 가입일 열, `sm` 미만은 상태 열과 Avatar를 숨기고 상태 Badge를 이름 옆에, 이메일은 한 줄 말줄임(전체는 상세에서). 390px에서 가로 넘침 없음, 360px은 18px 넘쳐 가로 스크롤로 본다.
  - 390px 거래 표: `sm` 미만은 날짜 열을 숨기고 카테고리 옆에 날짜를 보인다.
- 커밋: `b3d779e`.

키보드(dev 서버, 키 입력으로 확인):

- 고객 표: 이름 버튼 Enter → 상세 Dialog, Esc → 닫히고 이름 버튼으로 포커스 복귀, 체크박스 Space 선택, 정렬 버튼 Enter, 페이지 버튼 Enter.
- 설정 Tabs ←→ 이동, 카드 고르기 Enter, 카드 추가 Dialog 열기·Esc 후 트리거로 복귀, 매출 KPI 더보기 Menu(Enter·↓·Esc 후 트리거로 복귀).
- 사이드바·모바일 오버레이·계정 메뉴는 02에서 확인한 그대로.

hex 색: `src`의 `.ts`·`.tsx`·`.css`에서 `#` 뒤 16진수 3~8자리 검색, 0건.

`className` 덮어쓰기:

- tide 컴포넌트에 `className`을 준 곳 66곳을 찾았다(중괄호 깊이를 세어 여러 줄 태그까지). 대부분은 배치였고, 모양을 바꾼 곳은 `docs/tide-gaps.md`에 모두 반영했다(Typography `text-muted`, Link `cursor-pointer`, MenuTrigger 카드형 추가).
- 점검 중 되돌린 것: AlertDialog·Dialog `DialogFooter`의 `mt-6`은 tide 기본 간격(`gap-4` + `mt-2`)과 겹쳐 지웠다. 사이드바 공지는 `Card` + absolute 닫기 버튼으로 조립했었는데 tide `Alert`(`title`, `onClose`)가 같은 일을 해서 바꿨다(테스트 추가). 커밋: `8f71774`.

`docs/tide-gaps.md` 정리:

- 분류(없는 컴포넌트 · 부족한 API · 토큰·테마 · 문서·배포)와 우선순위(P1~P3, 기준은 문서 머리에)로 다시 썼다.
- `className` 덮어쓰기 정리표, 쓰지 않은 tide 컴포넌트 6종(Accordion, Popover, Tooltip, Spinner, Tag·TagGroup, VisuallyHidden)과 이유, 잘 맞았던 점을 더했다.

검사 다섯 개 통과(테스트 121개).
