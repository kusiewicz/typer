interface Spacer {
  size?: "small" | "medium" | "large";
}

export const Spacer = ({ size = "medium" }: Spacer) => {
  const sizeClass = {
    small: "h-2",
    medium: "h-4",
    large: "h-8",
  }[size];

  return <div className={sizeClass} />;
};
