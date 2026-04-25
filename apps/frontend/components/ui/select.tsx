"use client";

import * as React from "react";
import ReactSelect, { type Props as ReactSelectProps } from "react-select";

import { cn } from "@/lib/utils";

export type SelectOption<T extends string | number = string> = {
  label: string;
  value: T;
};

type SelectProps<T extends string | number = string> = Omit<
  ReactSelectProps<SelectOption<T>, false>,
  "classNames" | "onChange" | "options" | "unstyled" | "value"
> & {
  className?: string;
  options: SelectOption<T>[];
  value?: T;
  onValueChange?: (value: T) => void;
};

export function Select<T extends string | number = string>({
  className,
  onValueChange,
  options,
  value,
  ...props
}: SelectProps<T>) {
  const reactSelectId = React.useId();
  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  return (
    <ReactSelect<SelectOption<T>, false>
      unstyled
      instanceId={props.instanceId ?? reactSelectId}
      inputId={props.inputId ?? reactSelectId}
      options={options}
      value={selectedOption}
      onChange={(option) => {
        if (!option) {
          return;
        }

        onValueChange?.(option.value);
      }}
      classNames={{
        container: () => "w-full",
        control: ({ isFocused }) =>
          cn(
            "h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm shadow-none outline-none transition-colors",
            "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
            isFocused && "border-ring ring-3 ring-ring/50",
            className,
          ),
        valueContainer: () => "h-full gap-1 px-0 py-0",
        input: () => "m-0 p-0 text-sm",
        placeholder: () => "text-sm text-muted-foreground",
        singleValue: () => "text-sm text-foreground",
        indicatorsContainer: () => "h-full",
        indicatorSeparator: () => "bg-border",
        dropdownIndicator: () => "px-1 text-muted-foreground",
        clearIndicator: () => "px-1 text-muted-foreground",
        menu: () => "z-50 mt-1 rounded-lg border border-border bg-popover shadow-md",
        menuList: () => "max-h-56 p-1",
        option: ({ isFocused, isSelected }) =>
          cn(
            "cursor-pointer rounded-md px-2 py-1.5 text-sm text-popover-foreground",
            isFocused && "bg-accent/70",
            isSelected && "bg-secondary text-secondary-foreground",
          ),
        noOptionsMessage: () => "px-2 py-1.5 text-sm text-muted-foreground",
      }}
      {...props}
    />
  );
}
