import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OtpVerify() {
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const verifyOtp = async () => {
    `${BASE_URL}/api/auth/verify-otp`
    try {
      await axios.post( `${BASE_URL}/api/auth/verify-otp`, { email, otp });
      alert("Email verified!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-semibold mb-6 text-center">Verify OTP</h2>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-3 mb-6 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={verifyOtp}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition-colors"
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default OtpVerify;
