import { Button } from "@tide-design/components";
import { PlusIcon } from "@tide-design/icons";

import { CodeBlock } from "./components/CodeBlock";

/** 7번 화면: Next.js App Router에서 Button 하나를 띄우기까지(README 「시작하기」 그대로, steps). */
export function InstallSection() {
  return (
    <section className="section" id="install" aria-labelledby="install-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="install-h">
            Next.js에 3단계로 설치합니다.{" "}
            <span className="muted">React 19, Tailwind CSS 4.3 이상.</span>
          </h2>
        </div>
        <ol className="grid steps">
          <li className="card card--row span-4">
            <span className="step-num">1</span>
            <h3>패키지를 설치합니다</h3>
            <p>foundation은 components와 함께 들어옵니다. 아이콘을 안 쓰면 icons는 빼도 됩니다.</p>
            <div className="panel panel--flush">
              <CodeBlock
                label="터미널"
                code={"pnpm add \\\n  @tide-design/components \\\n  @tide-design/icons"}
              />
            </div>
          </li>
          <li className="card card--row span-4">
            <span className="step-num">2</span>
            <h3>전역 CSS에 두 줄을 넣습니다</h3>
            <p>Tailwind 다음에 tide styles.css를 읽으면 토큰과 Component class가 생깁니다.</p>
            <div className="panel panel--flush">
              <CodeBlock
                label="app/globals.css"
                code={'@import "tailwindcss";\n@import\n  "@tide-design/components/styles.css";'}
              />
            </div>
          </li>
          <li className="card card--row span-4">
            <span className="step-num">3</span>
            <h3>Component를 가져다 씁니다</h3>
            <p>서버 컴포넌트에서도 바로 import합니다. 아래 버튼이 이 코드의 결과입니다.</p>
            <div className="panel panel--flush">
              <CodeBlock
                label="app/page.tsx"
                code={
                  'import { Button } from\n  "@tide-design/components";\nimport { PlusIcon } from\n  "@tide-design/icons";\n\n<Button size="lg"\n  startIcon={<PlusIcon />}>\n  추가\n</Button>'
                }
              />
              {/* 위 코드의 결과. 페이지의 다른 주 버튼과 같은 lg 크기로 그린다. */}
              <div className="code-result">
                <Button size="lg" startIcon={<PlusIcon />}>
                  추가
                </Button>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
