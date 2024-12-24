import { LogIn } from "lucide-react";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./componants/Login";
import { UserForm } from "./componants/UserForm";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./componants/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* redirecting to the routing path */}

          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<UserForm />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
