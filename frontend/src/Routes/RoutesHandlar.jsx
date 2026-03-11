import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "../Pages/Login";
import OtpVerify from "../Pages/OtpVerify";
import ResendOtp from "../Pages/ResendOtp";
import Users from "../Pages/Admin/Users";
import AdminLayout from "../Layouts/AdminLayout";
import Dashboard from "../Pages/Admin/Dashboard";
import Restaurants from "../Pages/Admin/Restaurants";

function RoutesHandlar() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/resend-otp" element={<ResendOtp />} />


        <Route path="/admin" element={<AdminLayout />}> 
          <Route index element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/restaurents" element={<Restaurants />} />
        </Route>
      </Routes>
    </>
  );
}

export default RoutesHandlar;
