import React from "react";
import { createRoot } from "react-dom/client";
import AppPage from "./AppPage";
import "./product.css";
import "./app-page.css";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppPage />
  </React.StrictMode>,
);
