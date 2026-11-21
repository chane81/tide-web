// toBeInTheDocument 등 DOM 단언을 vitest expect에 붙인다.
import "@testing-library/jest-dom/vitest";

// jsdom에는 ResizeObserver가 없다. tide 0.18 Tabs는 고른 표시 위치를 재려고 쓴다.
// 테스트는 크기를 보지 않으므로 아무것도 하지 않는 스텁으로 둔다.
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
