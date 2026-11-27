/**
 * 카드를 겹쳐 쌓을 때 각 카드의 자리(0 = 맨 앞)를 돌려준다.
 * 고른 카드가 0이고, 나머지는 원래 순서대로 1, 2, … 뒤로 간다. 고른 카드가 목록에 없으면 원래 순서 그대로다.
 */
export function getDeckPositions(ids: readonly string[], selectedId: string): Map<string, number> {
  const rest = ids.filter((id) => id !== selectedId);
  const order = rest.length < ids.length ? [selectedId, ...rest] : rest;
  return new Map(order.map((id, position) => [id, position]));
}
