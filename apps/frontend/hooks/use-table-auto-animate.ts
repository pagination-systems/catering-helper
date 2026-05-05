import { useAutoAnimate } from "@formkit/auto-animate/react";

/**
 * Custom auto-animate hook specifically for Table environments.
 * Fixes the issue where auto-animate applies `position: absolute` to exiting 
 * elements, which instantly breaks the <tr/> layout and causes extreme visual jitter.
 */
export function useTableAutoAnimate<T extends Element = HTMLTableSectionElement>() {
  return useAutoAnimate<T>((el, action, oldCoords, newCoords) => {
    let keyframes: Keyframe[] = [];

    if (action === "add") {
      keyframes = [{ opacity: 0 }, { opacity: 1 }];
    } else if (action === "remove") {
      // By returning styleReset: false, we prevent the absolute squishing bug entirely.
      return [
        new KeyframeEffect(el, [{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: "ease-out" }),
        { styleReset: false }
      ];
    } else if (action === "remain" && oldCoords && newCoords) {
      keyframes = [
        { transform: `translate(${oldCoords.left - newCoords.left}px, ${oldCoords.top - newCoords.top}px)` },
        { transform: `translate(0, 0)` },
      ];
    }

    return new KeyframeEffect(el, keyframes, { duration: 150, easing: "ease-in-out" });
  });
}
