# 05: 모든 라우트에 다색 메시 배경

Status: done
Blocked by: 04
Spec: [../spec.md](../spec.md)

## What to build

흰 바탕만인 페이지에 부드러운 다색 메시 배경을 깐다. 히어로는 진하게, 그 아래 구역은 같은 계열을 옅게 위치·조합을 바꿔 깐다. 기존 surface 띠·히어로 파랑 빛·쇼케이스 카드 빛과 한 시스템(공통 CSS 한 곳)으로 정리한다.

## Acceptance criteria

- [x] 색은 tide Token만(원색 red-400·amber-400·blue-400·purple-400, color-mix로 농도 조절), 셰이더 없음
- [x] 히어로 글자 뒤에 바탕색 빛을 둬 AA 유지(측정값은 아래)
- [x] dark에서 같은 색을 더 묽게(`--mesh-k: 0.55`)
- [x] 네 라우트 게이트 PASS, 면제 5개 그대로

## Comments

- 대비(/catalog 히어로, 글자 상자 둘레에서 가장 진한 바탕 픽셀 기준): light 바탕 rgb(245,217,201) 위 text-default 7.52:1, text-muted 4.72:1. dark 바탕 rgb(72,57,51) 위 text-default 10.1:1, text-muted 6.09:1. 버튼은 tide primary solid 그대로(4.36:1, 기존 면제).
- tide에 밝은 노랑이 없어 amber-400(겨자색)을 쓴다(docs/tide-gaps.md).
- 함께 고침: /stats 합계 카드가 1024px 밑에서 표를 덮었다(앱 CSS `display`가 키트의 폰 숨김을 이김).
