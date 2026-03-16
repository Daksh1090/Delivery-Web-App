import { useState } from "react";
import { toast } from "react-toastify";
import api from "../Api/api";
import Input from "../Components/Input";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  try {
    e.preventDefault();
    setLoading(true);

    await api.post("/api/register", formData);

    navigate("/verify-otp", { state: { email: formData.email } });

    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
    });

    toast.success("Register Successful. Check your email for OTP");

  } catch (error) {
    toast.error(error?.response?.data?.message || "Registration Failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChanges}
            required
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChanges}
            required
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChanges}
            required
          />

          <Input
            type="text"
            name="phone"
            placeholder="Phone"
            maxLength={10}
            value={formData.phone}
            onChange={handleChanges}
            required
          />

          <button
            type="submit"
           className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Signing..." : "Sign Up"}
          </button>

        </form>
 <div className="flex flex-col justify-center items-center pt-2">
           <p>Already have account</p>
           <Link to="/login"><button className="underline">Login</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Register;