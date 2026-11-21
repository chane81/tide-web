import { tailwindMergeConfig } from "@tide-design/foundation/tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tide 토큰(text-muted, bg-active 등)도 충돌을 풀도록 tide 설정으로 확장한다.
const twMerge = extendTailwindMerge(tailwindMergeConfig);

/** class를 조건부로 합치고 Tailwind 충돌을 푼다. 뒤에 온 class가 이긴다. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
