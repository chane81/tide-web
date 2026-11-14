import { STEP_PHOTOS, type ShowcasePhoto } from "../constants/photos";

const STEPS: { title: string; body: string; photo: ShowcasePhoto }[] = [
  {
    title: "스케치 칸에 Component 이름을 적습니다",
    body: "Card, Table, Badge처럼 tide에 있는 이름으로 칸을 나누면 코드로 옮길 때 고칠 말이 없습니다.",
    photo: STEP_PHOTOS.sketch,
  },
  {
    title: "import 한 줄로 화면에 올립니다",
    body: "서버 컴포넌트에서도 바로 import합니다. 색은 hex 대신 tide 토큰 이름으로 칠합니다.",
    photo: STEP_PHOTOS.code,
  },
  {
    title: "키보드 하나로 끝까지 눌러 봅니다",
    body: "Tab·화살표·Esc로 모든 Component를 다룹니다. 포커스 링은 지우지 않습니다.",
    photo: STEP_PHOTOS.check,
  },
];

/** 2번 화면: 작업 세 장면. 카드마다 사진 한 장과 그 장면에서 tide가 맡는 일 한 줄(사진 설명 문구는 두지 않는다). */
export function ShowcaseStepsSection() {
  return (
    <section className="section" id="steps" aria-labelledby="steps-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="steps-h">스케치에서 검사까지 같은 이름을 씁니다</h2>
        </div>
        <div className="grid">
          {STEPS.map((step) => (
            <article key={step.title} className="card card--row span-4">
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <div className="panel panel--flush">
                {/* oxlint-disable-next-line nextjs/no-img-element */}
                <img
                  className="frame__img"
                  src={step.photo.src}
                  srcSet={step.photo.srcSet}
                  sizes="(max-width: 1023px) 100vw, 33vw"
                  width={1280}
                  height={853}
                  alt={step.photo.alt}
                  loading="lazy"
                  decoding="async"
                  data-source="stand-in"
                  data-subject="stand-in"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
