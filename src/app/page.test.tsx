import { render, screen } from "@testing-library/react";

import Page from "./page";

describe("첫 화면", () => {
  it("제목과 tide Button을 보여 준다", () => {
    render(<Page />);

    expect(screen.getByRole("heading", { name: "tide-web" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "시작하기" })).toBeInTheDocument();
  });
});
