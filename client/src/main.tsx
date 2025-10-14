import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { store } from "./redux/store";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
);
