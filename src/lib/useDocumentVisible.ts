import { useEffect, useState } from "react";

/**
 * Tracks document visibility. Returns false when the tab is hidden so
 * 3D canvases can pause rendering and avoid GPU context loss under
 * browser background-tab throttling.
 */
export function useDocumentVisible(): boolean {
  const [visible, setVisible] = useState(() =>
    typeof document === "undefined" ? true : !document.hidden
  );

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return visible;
}
