import { useState } from "react";
import { useFormField } from "../../hooks";
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

  const firstNameField = useFormField("firstName");
  const lastNameField = useFormField("lastName");
  const emailField = useFormField("email");
  const passwordField = useFormField("password");

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
      alert("Please fill in all fields");
      return;
    }

    const response = await fetchUtil<CreateAccountResponse>({
      url: "/api/users",
      method: httpMethods.POST,
      body: formData,
      options: { retries: 3, retryDelay: 1000, requireAuth: false }
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
    <form onSubmit={handleCreateAccount}>
      <h2>Create Account</h2>
{/* 
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          Error: {error.message}
        </div>
      )} */}

      <label htmlFor={firstNameField.id}>First Name</label>
      <input
        id={firstNameField.id}
        name={firstNameField.name}
        type="text"
        value={formData.firstName}
        onChange={handleInputChange}
        required
        // disabled={loading}
      />

      <label htmlFor={lastNameField.id}>Last Name</label>
      <input
        id={lastNameField.id}
        name={lastNameField.name}
        type="text"
        value={formData.lastName}
        onChange={handleInputChange}
        required
        // disabled={loading}
      />

      <label htmlFor={emailField.id}>Email</label>
      <input
        id={emailField.id}
        name={emailField.name}
        type="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        // disabled={loading}
      />

      <label htmlFor={passwordField.id}>Password</label>
      <input
        id={passwordField.id}
        name={passwordField.name}
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        required
        // disabled={loading}
      />

      {/* <button type="submit" disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </button> */}
      <button type="submit" disabled={false}>
        {"Create Account"}
      </button>
    </form>
  );
};
