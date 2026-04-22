"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form({ className, ...props }, ref) {
  return <form ref={ref} className={cn("space-y-4", className)} noValidate {...props} />;
});

Form.displayName = "Form";
