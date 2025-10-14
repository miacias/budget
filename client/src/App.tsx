// third party
import { Routes, Route } from "react-router-dom";
// redux
import { useAppSelector } from "./redux/hooks";
import { useValidateTokenQuery } from "./features/auth/authApi.slice";
// components
import { Page } from "./components";
import { ProtectedRoute } from "./components/ProtectedRoute";
// styles
import "./App.css";

function App() {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  // Validate token on app start if user appears to be logged in
  const { isLoading: isValidating } = useValidateTokenQuery(undefined, {
    skip: !isAuthenticated // Only validate if we think user is authenticated
  });

  if (isLoading || isValidating) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Page.Login />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Page.Home />
            </ProtectedRoute>
          }
        />

        {/* protected routes */}
        <Route
          path="/budget"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Page.BudgetDashboard />
            </ProtectedRoute>
          }
        />

        {/* catch-all */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
}

export default App;
