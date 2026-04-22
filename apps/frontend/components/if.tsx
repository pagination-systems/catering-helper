import React from "react";

interface IfProps {
  expression: unknown;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const If: React.FC<IfProps> = ({ expression = null, fallback = null, children }) => {
  return expression ? <React.Fragment>{children}</React.Fragment> : fallback;
};
