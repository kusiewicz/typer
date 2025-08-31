import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SubmitButtonProps {
  disabled: boolean;
  isLoading: boolean;
  children: ReactNode;
  className?: string;
}

export const SubmitButton = ({
  children,
  disabled,
  isLoading,
  className,
}: SubmitButtonProps) => {
  const classes = twMerge(
    "text-white bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    className
  );

  return (
    <button type="submit" disabled={isLoading || disabled} className={classes}>
      {children}
    </button>
  );
};
