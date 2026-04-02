import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./state/AppContext";
import { AuthProvider } from "./state/AuthContext";
import { ARProvider } from "./state/ARContext";
import AppShell from "./AppShell";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
        <ARProvider>
          <AppShell />
        </ARProvider>
      </AppProvider>
    </AuthProvider>
  </StrictMode>
);
