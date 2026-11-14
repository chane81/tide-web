import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "tide-web",
  description: "tide 디자인 시스템으로 만든 대시보드",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body className="bg-canvas text-default">{children}</body>
    </html>
  );
}
