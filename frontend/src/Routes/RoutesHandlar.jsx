import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import OtpVerify from "../Pages/OtpVerify";
import ResendOtp from "../Pages/ResendOtp";

// Admin
import AdminLayout from "../Layouts/AdminLayout";
import Dashboard from "../Pages/Admin/Dashboard";
import Users from "../Pages/Admin/Users";
import Restaurants from "../Pages/Admin/Restaurants";

// Restaurant
import RestaurantLayout from "../Layouts/RestaurantLayout";
import AddFood from "../Pages/Reastaurant/AddFood";
import FoodList from "../Pages/Reastaurant/FoodList";
import Orders from "../Pages/Reastaurant/Orders";
import RestaurantDashboard from "../Pages/Reastaurant/RestaurantDashboard";
import RestaurantRegister from "../Pages/Reastaurant/RestaurantRegister";
import RestaurantOtpVerify from "../Pages/Reastaurant/RestaurantOtpVerify";
import RestaurantLogin from "../Pages/Reastaurant/RestaurantLogin";
import RestaurantResendOtp from "../Pages/Reastaurant/RestaurantResendOtp";
import RestruantEditrFood from "../Pages/Reastaurant/RestruantEditrFood";
import Category from "../Pages/Admin/Category"
function RoutesHandlar() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/resend-otp" element={<ResendOtp />} />
        <Route path="/restaurant/register" element={<RestaurantRegister/>}/>
        <Route path="/restaurant/verify-otp" element={<RestaurantOtpVerify/>}/>
        <Route path="/restaurant/login" element={<RestaurantLogin/>}/>
        <Route path="/restaurant/resend-otp" element={<RestaurantResendOtp/>}/>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="category" element={<Category />} />
        </Route>

        {/* Restaurant routes */}
        <Route path="/restaurant" element={<RestaurantLayout />}>
          <Route index element={<RestaurantDashboard />} />
          <Route path="add-food" element={<AddFood />} />
          <Route path="foods" element={<FoodList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="edit-food" element={<RestruantEditrFood />} />
          
        </Route>
      </Routes>
    </>
  );
}

export default RoutesHandlar;