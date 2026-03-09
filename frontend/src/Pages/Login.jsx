import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../Api/api";
import Input from "../Container/Input";
import { Link , useNavigate} from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      await api.post("/api/login", { email, password });

      navigate("/home")

      toast.success("Login Successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Logging..." : "Login"}
          </button>

        </form>
        <div className="flex flex-col justify-center items-center pt-2">
           <p>Don't Have a Account</p>
           <Link to="/register"><button className="underline">Sign Up</button></Link>
        </div>
      </div>

    </div>
  );
}

export default Login;