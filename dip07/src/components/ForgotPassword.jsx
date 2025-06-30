import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
        const BASE_URL = import.meta.env.VITE_API_URL;


  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);
  

    try {
      const res = await axios.post(  `${BASE_URL}/api/auth/send-otp`, {
        email,
      });

      setMsg(res.data.message || "OTP sent successfully.");

      // Redirect to Reset Password page with email in state
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSendOTP}
        className="bg-zinc-900 p-8 rounded-lg text-white w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 bg-zinc-800 border border-zinc-600 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 bg-purple-600 hover:bg-purple-700 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        {msg && <p className="mt-3 text-green-400">{msg}</p>}
        {error && <p className="mt-3 text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
