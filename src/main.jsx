import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import AuthProvider from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProfileProvider>
        <AuthProvider>
        <StoreContextProvider>
          <App />
        </StoreContextProvider>
      </AuthProvider>
      </ProfileProvider>
    </BrowserRouter>
  </StrictMode>
);
