# 06: 히어로 안쪽 판과 고리 제거

Status: done
Blocked by: 05
Spec: [../spec.md](../spec.md)

## What to build

네 라우트 히어로의 안쪽 둥근 판(빛 바탕 판)과 쇼케이스 판의 고리를 빼고, 창·카드·조각이 라우트 메시 위에 바로 뜨게 한다. 쇼케이스 히어로 카드는 아래쪽이 바탕으로 사라지게 한다. 판이 빠지며 드러난 콜라주 카드 테두리 문제도 고친다.

## Acceptance criteria

- [x] `/`·`/catalog`·`/stats`·`/showcase` 히어로에 판 없음(키트 틀은 자리·높이·아래 흐림만). 쇼케이스 둘째 화면 판 두 장은 유지, 고리만 삭제(고리 CSS 정의도 삭제)
- [x] 쇼케이스 히어로 카드 아래 72px(폰 48px)가 mask로 사라짐. 출처 라벨은 그 위에서 끝남(폰에서는 보조 줄을 숨김)
- [x] 콜라주 조각을 `CollagePiece` 한 규칙으로: 키트 조각의 반경·바탕·그림자·잘라냄을 끄고 tide Card·Alert 본래 테두리 + `--tide-shadow-md` 하나
- [x] 홈 창은 컨테이너 좌우 선까지(container-edges), /stats 창은 글 칸과 위를 맞춤(split-pair)
- [x] 네 라우트 게이트 PASS, 면제 4개(쓰이지 않던 `text-contrast p.hero__lead` 삭제)

## Comments

- 콜라주 테두리가 한쪽만 진하고 모서리가 잘려 보인 원인: 키트 `.ly-collage .ly-piece`의 `overflow: hidden` + 반경 `--r-md`가 tide Card(`rounded-lg`)·Alert 테두리를 모서리에서 잘랐고, 키트 그림자가 테두리 위에 겹쳤다. 숫자 조각은 tide Card가 아니라 키트 조각 바탕이라 테두리가 없었다.
- `--glow-ground`는 #access 띠·패키지 카드 판·묶음 판이 계속 써서 남긴다.
