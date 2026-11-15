import { ToastQueue } from "@tide-design/components";

/**
 * 앱 전체가 쓰는 Toast 큐. `AppShell`의 `ToastRegion`이 그리고, client 컴포넌트 어디서든 `toasts.add()`로 띄운다.
 * client 모듈에서만 import한다(서버 모듈에서 부르면 서버 쪽 인스턴스라 화면에 안 뜬다).
 */
export const toasts = new ToastQueue({ maxVisible: 3 });
