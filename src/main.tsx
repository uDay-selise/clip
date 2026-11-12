import "./app/styles.css";
import "./app/design-kit.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";

document.body.classList.add("ds-root");
document.getElementById("root")?.classList.add("ds-root");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
