import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";  
import { Page, Section } from "./components";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Check if user is logged in (e.g., check JWT token)
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])
  
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Section.Navigation />
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
