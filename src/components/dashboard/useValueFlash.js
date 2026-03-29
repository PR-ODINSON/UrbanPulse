import { useEffect, useRef } from "react";

function useValueFlash(value) {
  const ref = useRef(null);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value && ref.current) {
      ref.current.classList.remove("updating");
      void ref.current.offsetWidth;
      ref.current.classList.add("updating");
      const timer = window.setTimeout(() => {
        ref.current?.classList.remove("updating");
      }, 400);
      prev.current = value;
      return () => window.clearTimeout(timer);
    }
    prev.current = value;
    return undefined;
  }, [value]);

  return ref;
}

export default useValueFlash;
