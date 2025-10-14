import { Section, UI } from '../../components';
// import { useFormField } from "../../hooks";
// import { fetchUtil, httpMethods } from "../../utils";

export const Login = () => {
  // const handleLogin = (email: string, password: string) => {};

  return (
    <Section.Layout title="Login">
      <p>Please enter your credentials to log in.</p>
      <form>
        <UI.Field.Root>
          <UI.Field.Label>Email</UI.Field.Label>
          <UI.Field.Input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          {/* <Field.HelperText>We'll never share your email.</Field.HelperText> */}
        </UI.Field.Root>
      </form>
      <UI.CreateAccountForm />
    </Section.Layout>
  );
}