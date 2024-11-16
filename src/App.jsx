import React from "react";
// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Auth/Login/Login";
import Register from "./Component/Auth/Register/Register";
import Profile from "./Component/Auth/Profile/Profile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </>
  );
}

export default App;
