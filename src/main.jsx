import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider i18n={{}}>
      <App />
    </AppProvider>
  </StrictMode>
);
