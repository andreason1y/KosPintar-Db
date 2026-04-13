import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app/App";
import "@/index.css";

/**
 * Application entry point
 * Initializes React and renders the App component
 */

// Mount React application
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
