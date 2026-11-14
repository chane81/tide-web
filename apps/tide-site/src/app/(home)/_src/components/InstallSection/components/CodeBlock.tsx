export interface CodeBlockProps {
  /** 파일 이름이나 셸. 코드 위에 작게 보인다. */
  label: string;
  code: string;
}

/** 코드 한 덩어리. tide에 코드 블록 Component가 없어 tide 토큰으로 칠한 pre를 쓴다(docs/tide-gaps.md). */
export function CodeBlock({ label, code }: CodeBlockProps) {
  return (
    <figure className="code-block">
      <figcaption className="text-label-sm text-muted">{label}</figcaption>
      <pre>
        <code>{code}</code>
      </pre>
    </figure>
  );
}
