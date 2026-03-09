import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../Pages/Login";
import OtpVerify from "../Pages/OtpVerify";
import ResendOtp from "../Pages/ResendOtp";

function RoutesHandlar() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/verify-otp" element={<OtpVerify/>} />
        <Route path="/resend-otp" element={<ResendOtp/>} />
      </Routes>
    </>
  );
}

export default RoutesHandlar;