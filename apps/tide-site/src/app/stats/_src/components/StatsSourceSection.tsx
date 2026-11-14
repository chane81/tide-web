import { SourceFragment } from "./SourceFragment";

/** 숫자의 출처. 모두 npm 공개 API 문서에 적힌 주소다. */
const SOURCES = [
  {
    title: "버전은 registry에서 읽습니다",
    body: "registry.npmjs.org의 latest 태그가 가리키는 버전입니다.",
    request: "GET registry.npmjs.org/<패키지>/latest",
    field: "version",
  },
  {
    title: "다운로드는 지난 7일 합계입니다",
    body: "api.npmjs.org가 하루 늦게 집계한 last-week 값이라 오늘은 빠집니다.",
    request: "GET api.npmjs.org/downloads/point/last-week/<패키지>",
    field: "downloads",
  },
  {
    title: "열 때마다 새로 읽습니다",
    body: "캐시하지 않습니다. npm이 응답하지 않으면 표 대신 안내를 보입니다.",
    request: "await connection()",
    field: "요청마다",
  },
] as const;

/**
 * 2번 화면: 큰 문장(moment liquid-type, 포인터가 지나가면 글자가 물결친다)과 숫자의 출처 세 가지.
 * 문장은 README 「세 패키지는 언제나 같은 버전으로 함께 나갑니다」에서 왔다.
 */
export function StatsSourceSection() {
  return (
    <section className="section statement" id="source" aria-labelledby="source-h">
      <div className="wrap stack-6">
        <div className="section-head" data-moment="liquid-type">
          <h2 id="source-h" className="mo-lt__type">
            세 패키지는 같은 버전으로 나갑니다
          </h2>
          <p className="t-lead muted">
            표의 버전 세 칸이 같은 이유입니다. 다운로드 수는 패키지마다 다릅니다.
          </p>
        </div>
        <div className="grid">
          {SOURCES.map((source) => (
            <article key={source.title} className="card card--row span-4">
              <h3>{source.title}</h3>
              <p>{source.body}</p>
              <div className="panel panel--flush">
                <SourceFragment request={source.request} field={source.field} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
