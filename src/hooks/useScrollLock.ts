import { useCallback } from "react";

export function useScrollLocks(): Record<string, () => void> {
  const lockScroll = useCallback(() => {
    const htmlElement = document.getElementsByTagName("html")[0];
    if (htmlElement) htmlElement.classList.add("overflow-hidden");
  }, []);
  const unlockScroll = useCallback(() => {
    const htmlElement = document.getElementsByTagName("html")[0];
    if (htmlElement) htmlElement.classList.remove("overflow-hidden");
  }, []);
  return { lockScroll, unlockScroll };
}
