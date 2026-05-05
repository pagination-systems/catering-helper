import { useCallback, useState } from "react";

interface UseDualStateReturn<T> {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  toggle: () => void;
  reset: () => void;
}

export function useDualState<T extends boolean | number | string>(initialValue: T): UseDualStateReturn<T> {
  const [state, setState] = useState<T>(initialValue);

  const toggle = useCallback(() => {
    if (typeof state === "boolean") {
      setState((prev) => !prev as T);
    } else {
      console.warn("⚠️ useDualState.toggle only works for boolean states.");
    }
  }, [state]);

  const reset = useCallback(() => setState(initialValue), [initialValue]);

  return { state, setState, toggle, reset };
}
