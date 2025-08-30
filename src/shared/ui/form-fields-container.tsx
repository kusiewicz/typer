import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const FieldsContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const classes = twMerge("flex flex-col gap-2", className);

  return <div className={classes}>{children}</div>;
};
