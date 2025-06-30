import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
          const BASE_URL = import.meta.env.VITE_API_URL;


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await axios.post( `${BASE_URL}/api/auth/reset-password`, form);
      setMsg(res.data.message || "Password reset successful.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleReset}
        className="bg-zinc-900 p-8 rounded-lg text-white w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-3 bg-zinc-800 border border-zinc-600 rounded"
        />

        <input
          name="otp"
          type="text"
          placeholder="Enter OTP"
          value={form.otp}
          onChange={handleChange}
          required
          className="w-full mb-3 p-3 bg-zinc-800 border border-zinc-600 rounded"
        />

        <input
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 bg-zinc-800 border border-zinc-600 rounded"
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-700 rounded"
        >
          Reset Password
        </button>

        {msg && <p className="mt-3 text-green-400">{msg}</p>}
        {error && <p className="mt-3 text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
