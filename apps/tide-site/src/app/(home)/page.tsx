import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "tide",
  description: "Next.js 앱을 위한 React 디자인 시스템",
};

/* 소개 사이트를 새로 짓는 중이다. 뼈대만 둔다. */
export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-heading-lg">tide</h1>
    </main>
  );
}
