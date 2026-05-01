import type { ReactNode } from "react";

interface IfProps {
  expression: unknown;
  fallback?: ReactNode;
  children: ReactNode;
}

export const If = ({ expression, fallback = null, children }: IfProps) => {
  return expression ? children : fallback;
};
