import { useState } from "react";
import Input from "../Container/Input";
import { useLocation, useNavigate , Link} from "react-router-dom";
import api from "../Api/api";
import { toast } from "react-toastify";

function OtpVerify() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      await api.post("/api/otp-verify", { email, otp });

      toast.success("OTP Verified Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Verification Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Verify Otp</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            maxLength={6}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <div className="flex flex-col justify-center items-center pt-3">
          <p>Didn't receive OTP?</p>
         <Link to="/resend-otp"> <button className="underline text-blue-600">
            Resend OTP
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
