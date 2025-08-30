import { Link } from "@tanstack/react-router";

interface FormFooterProps {
  descriptionText: string;
  buttonText: string;
  buttonLink: string;
}

export const FormFooter = ({
  descriptionText,
  buttonText,
  buttonLink,
}: FormFooterProps) => (
  <p className="text-sm">
    {descriptionText}
    <Link to={buttonLink} className="text-blue-300 hover:text-blue-400">
      {buttonText}
    </Link>
  </p>
);
