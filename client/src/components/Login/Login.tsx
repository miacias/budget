import { Section, UI } from '../../components';

export const Login = () => {

  return (
    <Section.Layout title="Login">
      <p>Please enter your credentials to log in.</p>
      <UI.CreateAccountForm />
    </Section.Layout>
  );
}