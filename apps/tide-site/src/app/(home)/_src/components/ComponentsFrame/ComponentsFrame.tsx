"use client";

import { useState } from "react";

import { ComponentPreview } from "./components/ComponentPreview";
import { COMPONENT_LIST, type ComponentName } from "./constants/componentList";

/**
 * Component 창(design-taste-frontend app-frame): 왼쪽 목록에서 고르면 오른쪽에 실제 tide Component를 그린다.
 * 키트의 그린 창이 아니라 살아 있는 UI라 role="img"를 붙이지 않는다.
 * `data-ui`: 키트와 검사기가 읽는 「제품 UI 조각」 표시(sections-library.md app-frame). 값이 비어 있어 키트가 자기 조각을 그려 넣지 않는다.
 */
export function ComponentsFrame() {
  const [selected, setSelected] = useState<ComponentName>("Button");

  return (
    <div className="app-frame fill" data-ui="">
      <div className="app-frame__list">
        <p className="app-frame__head text-label-sm text-muted">@tide-design/components</p>
        <ul aria-label="Component 목록">
          {COMPONENT_LIST.map((item) => (
            <li key={item.name}>
              <button
                type="button"
                aria-pressed={selected === item.name}
                onClick={() => setSelected(item.name)}
                className="app-frame__item focus-visible:focus-ring"
              >
                <span className="text-label-md">{item.name}</span>
                <span className="text-body-sm text-muted">{item.summary}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="app-frame__open" aria-live="polite">
        <p className="app-frame__head font-mono text-body-sm text-muted">
          {`import { ${selected} } from "@tide-design/components";`}
        </p>
        <div className="app-frame__stage">
          <ComponentPreview name={selected} />
        </div>
      </div>
    </div>
  );
}
