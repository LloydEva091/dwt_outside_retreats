import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { RetreatProvider } from "./context/RetreatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RetreatProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </RetreatProvider>
);

serviceWorkerRegistration.register();
