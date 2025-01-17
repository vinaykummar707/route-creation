import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import BusRoutes from "./components/BusRoutes";
import RouteLanguageSettings from "./components/RouteLanguageSettings";
import RouteDisplaySettings from "./components/RouteDisplaySettings";
import LedSignBoard from "./components/LedSignBoard";
import EntryPage from "./components/EntryPage";
import Bus from "./components/test";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className=" p-4 gap-4  flex flex-col bg-neutral-100">
      <EntryPage />
    </div>
  </React.StrictMode>
);
