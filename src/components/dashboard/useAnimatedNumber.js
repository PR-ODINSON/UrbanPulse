import { useEffect, useRef, useState } from "react";

const useAnimatedNumber = (target, precision = 0) => {
  const [value, setValue] = useState(target);
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      setValue((prev) => {
        const next = prev + (target - prev) * 0.14;
        if (Math.abs(next - target) < 0.02) {
          return target;
        }
        rafRef.current = window.requestAnimationFrame(animate);
        return next;
      });
    };
    rafRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target]);

  return Number(value.toFixed(precision));
};

export default useAnimatedNumber;
