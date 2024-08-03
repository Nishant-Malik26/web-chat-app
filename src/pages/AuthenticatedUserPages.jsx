import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Dashboard from "../components/Dashboard";
import DashboardPage from "./dashboard/DashboardPage.jsx";

const AuthenticatedUserPages = () => {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
    </BrowserRouter>
    // <div>AuthenticatedUserPages</div>
  );
};

export default AuthenticatedUserPages;
