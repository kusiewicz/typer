import { Section } from "~/shared/ui/section";
import { Spacer } from "~/shared/ui/spacer";
import { FormFooter } from "./ui/form-footer";
import { SignUpForm } from "../../features/auth/ui/sign-up-form";

export const SignUpPage = () => (
  <div className="w-full h-full flex justify-center items-center">
    <Section title={<h1 className="font-semibold text-xl">Sign up</h1>}>
      <SignUpForm />
      <Spacer size="medium" />
      <FormFooter
        descriptionText="Masz juz konto? "
        buttonText="Zaloguj się"
        buttonLink="/signin"
      />
    </Section>
  </div>
);
