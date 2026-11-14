import {
  ChartLineIcon,
  CodeIcon,
  MoonIcon,
  PaletteIcon,
  ScaleIcon,
  ServerIcon,
} from "@tide-design/icons";

/** 질문과 답. 답은 tide README·문서·tide-web을 만들며 확인한 사실만 쓴다. */
const FAQ = [
  {
    icon: CodeIcon,
    q: "Tailwind CSS 3에서도 쓸 수 있나요?",
    a: "아니요. Tailwind CSS 4.3 이상과 @tailwindcss/postcss 또는 @tailwindcss/turbopack 플러그인이 필요합니다.",
  },
  {
    icon: MoonIcon,
    q: "운영체제 다크 모드를 따르나요?",
    a: "tide는 읽지 않습니다. <html>의 data-theme을 언제 바꿀지는 앱이 정합니다. 이 페이지는 처음에 어둡게 열립니다.",
  },
  {
    icon: ServerIcon,
    q: "React 서버 컴포넌트에서 import할 수 있나요?",
    a: "네. Card, Badge, Typography처럼 상태가 없는 Component는 서버 컴포넌트에서 바로 씁니다.",
  },
  {
    icon: ChartLineIcon,
    q: "차트나 날짜 선택기도 있나요?",
    a: "아직 없습니다. tide로 대시보드를 만들 때는 Recharts에 tide CSS 변수를 넘겨 색을 맞췄습니다.",
  },
  {
    icon: PaletteIcon,
    q: "브랜드 색을 더할 수 있나요?",
    a: 'tide-color CLI로 CSS를 만들어 Role로 더하면 <Button color="brand">처럼 씁니다.',
  },
  {
    icon: ScaleIcon,
    q: "라이선스와 버전은 어떻게 되나요?",
    a: "MIT입니다. components, icons, foundation 세 패키지는 언제나 같은 버전으로 함께 나갑니다.",
  },
] as const;

/** 8번 화면: 질문(faq). 답은 모두 펼친 채로 둔다. 질문마다 주제를 알리는 tide 아이콘을 오른쪽에 둔다. */
export function FaqSection() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-h">
      <div className="wrap">
        <div className="grid">
          <div className="span-5 stack-4">
            <h2 id="faq-h">질문</h2>
            <p className="muted">
              설치 전에 자주 묻는 것을 모았습니다. 나머지는 Storybook 문서에 있습니다.
            </p>
          </div>
          <div className="faq span-6 start-7">
            {FAQ.map((item) => (
              <div className="faq__item" key={item.q}>
                <h3>{item.q}</h3>
                <item.icon size={24} className="faq__icon" aria-hidden="true" />
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
