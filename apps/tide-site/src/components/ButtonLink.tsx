"use client";

import { Button, type ButtonProps } from "@tide-design/components";

export interface ButtonLinkProps extends Omit<ButtonProps, "render"> {
  /** 링크 주소 */
  href: string;
}

/**
 * 링크로 렌더하는 tide Button. `render`의 `<a>`를 client에서 만든다.
 * 서버 컴포넌트가 `render={<a />}`를 넘기면 개발 모드에서 그 요소가 lazy 참조로 넘어와
 * tide `renderElement`가 `render.props`를 읽다가 멈춘다(docs/tide-gaps.md).
 */
export function ButtonLink({ href, ...props }: ButtonLinkProps) {
  return (
    // 링크 이름은 Button의 children이 cloneElement로 <a> 안에 넣는다. lint는 빈 <a>로 본다.
    // oxlint-disable-next-line jsx-a11y/control-has-associated-label
    <Button {...props} render={<a href={href} />} />
  );
}
