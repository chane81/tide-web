# 04: /showcase를 사진 대신 빛 번짐 판 위 흰 카드로

Status: done
Blocked by: 02
Spec: [../spec.md](../spec.md)

## What to build

`/showcase`에서 사진을 모두 빼고, 흰 판 안에 흐린 색 덩어리가 번지고 그 위에 흰 카드가 뜨는 구성으로 바꾼다. 카드에는 실제 tide 조각이나 확인된 tide 사실만 넣고, 사람 이름·후기는 만들지 않는다. 사진이 사이트에 남지 않으면 `/credits`와 푸터 출처 줄을 지운다.

## Acceptance criteria

- [x] 사진 파일·`photos.ts`·출처 데이터, `/credits` 라우트, 푸터 credits 자리 삭제(사진이 사이트에 남지 않음)
- [x] 히어로(centred로 다시 배정: film은 사진이 필요) 빛 판 위 카드: tide Field·Input + 출처 라벨
- [x] 둘째 화면: 판 두 장, 대비 기준(사실)과 색 Role(tide Badge·Progress)
- [x] 빛 바탕 코드를 `--glow-ground` 하나로 승격(히어로 창·콜라주·#access·패키지 판·묶음 판)
- [x] 게이트 PASS

## Comments

- 판 뒤의 「거의 안 보이는 큰 글자」는 넣었다가 뺐다: 검사기가 보이지 않는 그림(empty-visual)과 카드에 덮인 상자(spill)로 잡는다. 색 덩어리·고리도 처음엔 자식 요소였으나 spill로 잡혀 판 자신의 배경 겹으로 그린다.
- 라벨은 대문자로 쓰지 않았다(스킬 copy.md 「all-caps labels」 금지). 패키지 이름을 굵은 고정폭 글자로.
- 게이트: 첫 빌드 3라운드 OPEN(히어로 창이 「글자만 든 띠」로 잡힘) → 창을 그림(role=img, 카드 inert)으로 알리고 tide 아이콘을 더해 새 빌드에서 PASS. 390 폭 `menu-toggle` FAIL이 한 번 났으나 단독 재검사에서 재현되지 않아(키트 스크립트가 늦게 붙은 경우) 새 빌드로 다시 돌려 PASS.
- 보라: 사용자 예외(2026-11-14)로 판 색 덩어리에 `--tide-purple-solid`를 섞었다. 게이트는 보라를 잡지 않았다(면제 없음).
