import { useState } from "react";
import { toast } from "react-toastify";
import api from "../Api/api";
import Input from "../Container/Input";
import { Link, useNavigate } from "react-router-dom";

function ResendOtp() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      await api.post("/api/resend-otp", { email });

      navigate("/verify-otp", { state: { email } });

      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Resend OTP</h1>

        <p className="text-gray-500 text-center mb-4">
          Enter your email to receive a new OTP
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Resend OTP"}
          </button>
        </form>

        <div className="flex flex-col justify-center items-center pt-3">
          <p>Remember your password?</p>
          <Link to="/verify-otp">
            <button className="underline text-blue-600">Verify Otp</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResendOtp;
