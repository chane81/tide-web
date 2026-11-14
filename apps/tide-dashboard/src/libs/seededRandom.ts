/**
 * 시드 고정 난수(mulberry32). 같은 시드면 늘 같은 수열을 돌려 목업이 결정적이 된다
 * (서버·클라이언트 렌더 결과가 같아야 hydration 오류가 없다).
 */
export function seededRandom(seed: number): () => number {
  let t = seed;

  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;

    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
