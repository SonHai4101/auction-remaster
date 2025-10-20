import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "./utils/jwt.ts"

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer
        closeButton={false}
        toastClassName="!p-0"
        autoClose={5000}
        closeOnClick={true}
        hideProgressBar={true}
      />
    </QueryClientProvider>
  </StrictMode>
);
