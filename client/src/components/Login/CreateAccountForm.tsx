import { Button, Card, Field, Fieldset, Input } from "@chakra-ui/react";
import { useState } from "react";
import { fetchUtil, httpMethods } from "../../utils";

interface CreateAccountData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface CreateAccountResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const CreateAccountForm = () => {
  const [formData, setFormData] = useState<CreateAccountData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      return alert("Please fill in all fields");
    }

    const response = await fetchUtil<CreateAccountResponse>({
      url: "/api/users",
      method: httpMethods.POST,
      body: formData,
      options: { retries: 3, retryDelay: 1000, requireAuth: false },
    });
    if (response.data) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.location.href = "/";
    } else if (response.error) {
      console.error("Account creation failed:", response.error);
      // alert("Account creation failed. Please try again.");
    }
  };

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Create Account</Card.Title>
        <Card.Description>
          Fill in the form below to create a new account.
        </Card.Description>
      </Card.Header>

      <Card.Body>
        <form onSubmit={handleCreateAccount}>
          <Fieldset.Root>
            <Fieldset.Legend>Personal Information</Fieldset.Legend>

            <Field.Root>
              <Field.Label>First Name</Field.Label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Last Name</Field.Label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Field.Root>
          </Fieldset.Root>

          <Button type="submit" my={4}>
            {"Create Account"}
          </Button>
        </form>
      </Card.Body>
    </Card.Root>
  );
};
