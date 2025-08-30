import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const ErrorField = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const classes = twMerge("text-red-500 text-xs block", className);

  return (
    <em className={classes} role="alert">
      {children}
    </em>
  );
};
