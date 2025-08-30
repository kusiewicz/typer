import { ReactNode } from "react";
import { Spacer } from "./spacer";

interface SectionProps {
  title?: ReactNode;
  children: ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
  const Title = () => {
    return title ? (
      <>
        {title}
        <Spacer size="medium" />
      </>
    ) : null;
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <Title />
      {children}
    </div>
  );
};
