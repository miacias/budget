// thid party
import { useState } from "react";
import { Button, Card, Field, Fieldset, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// redux
import { useLoginMutation } from "@/features/auth";
// components
import { Section } from "../../components";
import { CreateAccountForm } from "./CreateAccountForm";

interface LoginData {
  email: string;
  password: string;
}

export const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleNewUserClick = () => {
    setIsNewUser(!isNewUser);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return alert("Please fill in all fields");
    }
    try {
      await login(formData).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Section.Layout title="Login">
      <Button onClick={handleNewUserClick} my={4}>
        {isNewUser ? 'Back to Login' : 'Create Account'}
      </Button>

      {isNewUser ? 
        <CreateAccountForm />
      : (
        <Card.Root>
          <Card.Header>
            <Card.Title>Log in to Your Account</Card.Title>
            <Card.Description>
              Please enter your credentials to log in.
            </Card.Description>
          </Card.Header>

          <Card.Body>
            <form onSubmit={handleLogin}>
              <Fieldset.Root>
                <Field.Root>
                  <Field.Label>Email</Field.Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Password</Field.Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Field.Root>
              </Fieldset.Root>

              <Button type="submit" my={4}>
                Log In
              </Button>
            </form>
          </Card.Body>
        </Card.Root>
      )}
    </Section.Layout>
  );
};
