import { Section } from "~/shared/ui/section";
import { SignInForm } from "./ui/sign-in-form";
import { FormFooter } from "./ui/form-footer";
import { Spacer } from "~/shared/ui/spacer";

export const SignInPage = () => (
  <div className="w-full h-full flex justify-center items-center">
    <Section title={<h1 className="font-semibold text-xl">Login</h1>}>
      <SignInForm />
      <Spacer size="medium" />
      <FormFooter
        descriptionText="Nie masz konta? "
        buttonText="Zarejestruj się"
        buttonLink="/signup"
      />
    </Section>
  </div>
);
