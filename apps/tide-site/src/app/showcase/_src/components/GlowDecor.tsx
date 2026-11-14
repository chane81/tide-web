/**
 * 빛 번짐 장식: 흐린 색 덩어리 셋(위는 옅게, 아래는 진하게)과 오른쪽 가장자리에 걸친 흐린 고리. 모두 이 요소의
 * 배경 여러 겹이다(globals.css `.glow-decor`). 장식이라 스크린 리더에 숨긴다.
 * 판 뒤의 거의 안 보이는 큰 글자는 넣었다가 뺐다: 검사기가 「보이지 않는 그림」(empty-visual)과 카드에 덮인 상자(spill)로 잡는다.
 */
export function GlowDecor() {
  return <div className="glow-decor" aria-hidden="true" />;
}
