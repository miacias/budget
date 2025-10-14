// thid party
import { Button, Container, Flex, Heading } from "@chakra-ui/react";
import { type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
// redux
import { useAppSelector } from "../../redux/hooks";
import { useLogoutMutation } from "../../features/auth/authApi.slice";
// components
import { Section } from "../../components";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const [logoutMutation] = useLogoutMutation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logoutMutation();
    navigate("/login");
  };

  const handleRouteToLogin = () => {
    navigate("/login");
  };

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const handleSignOut = async () => {
  //   const response = await fetchUtil({
  //     url: "/api/auth/logout",
  //     method: "POST",
  //   });
  //   if (response.success) {
  //     localStorage.removeItem("authToken");
  //     localStorage.removeItem("user");
  //     setIsAuthenticated(false);
  //     window.location.href = "/";
  //   }
  // };
  // const handleRouteToLogin = () => {
  //   window.location.href = "/login";
  // };

  return (
    <Container maxW="container.lg">
      <Flex mb={4} justify={"space-between"}>
        <Section.Navigation />
        <Button onClick={isAuthenticated ? handleSignOut : handleRouteToLogin}>
          {isAuthenticated ? "Log Out" : "Log In"}
        </Button>
      </Flex>

      {title && (
        <Heading size={"4xl"} my={4}>
          {title}
        </Heading>
      )}
      {children}
    </Container>
  );
};
