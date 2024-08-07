// import { useState } from 'react'
import "./App.css";
import React from "react";
// import AuthenticatedUserPages from "./pages/AuthenticatedUserPages.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import Login from "./components/auth/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/auth/Signup.jsx";
import Chat from "./components/Chat.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <AuthenticatedUserPages /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route path="chat/:id" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
