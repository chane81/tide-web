import { Button } from "@tide-design/components";

/**
 * 키보드 견본: 포커스 링이 보이는 버튼과 Tab·화살표 키.
 * 정지 견본이라 `focus-visible:` 없이 링을 붙인다. solid Button은 tide가 `focus-visible:`에만 canvas 2px 틈을 붙여서,
 * 견본에도 같은 틈(`inset-ring-2` + canvas)을 적는다(tide 0.14.0 CHANGELOG 「바탕이 accent solid인 요소」).
 */
export function KeyboardPanel() {
  return (
    <div className="access-panel" aria-hidden="true">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" color="neutral" tabIndex={-1}>
          이전
        </Button>
        <Button
          className="focus-ring inset-ring-2 inset-ring-(color:--tide-bg-canvas)"
          tabIndex={-1}
        >
          저장
        </Button>
        <Button variant="outline" color="neutral" tabIndex={-1}>
          취소
        </Button>
      </div>
      <p className="flex flex-wrap items-center gap-2 text-body-sm text-muted">
        <kbd className="kbd">Tab</kbd> 다음 칸 <kbd className="kbd">←</kbd>
        <kbd className="kbd">→</kbd> 탭·메뉴 안에서 이동 <kbd className="kbd">Esc</kbd> 닫기
      </p>
    </div>
  );
}
