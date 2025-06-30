import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false); // 🔹 Forgot password toggle
        const BASE_URL = import.meta.env.VITE_API_URL;


  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const syncLocalCartAfterLogin = async (token) => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    const res = await fetch(`${BASE_URL}/api/cart/sync`
, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items: localCart }),
    });
    if (res.ok) localStorage.removeItem("cart");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowForgot(false); // Reset on each submit

    try {
      const endpoint = isAdminLogin
     

        ?  `${BASE_URL}/api/auth/admin/login`
        :`${BASE_URL}/api/auth/login`

      const res = await axios.post(endpoint, form);

      if (isAdminLogin) {
        if (res.data.success) {
          localStorage.setItem('isAdmin', 'true');
          navigate("/admin/dashboard");
        } else {
          throw new Error(res.data.message || "Admin authentication failed");
        }
      } else {
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        await syncLocalCartAfterLogin(token);
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");

      if (!isAdminLogin) {
        setShowForgot(true); // Show forgot password if regular user login fails
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-md text-white relative"
      >
        {/* Admin Login Toggle */}
        <button
          type="button"
          onClick={() => {
            setIsAdminLogin(!isAdminLogin);
            setShowForgot(false); // Reset on mode switch
          }}
          className={`absolute -top-3 right-4 px-4 py-1 rounded-full text-sm font-medium ${
            isAdminLogin ? "bg-red-600" : "bg-gray-600"
          }`}
        >
          {isAdminLogin ? "Admin Mode" : "User Mode"}
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-center">
          {isAdminLogin ? "Admin Login" : "Welcome Back"}
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-3 mb-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* 🔹 Forgot Password Link (shown on error) */}
        {showForgot && !isAdminLogin && (
          <p className="text-sm text-red-400 mb-4">
            Forgot your password?{" "}
            <span
              className="underline cursor-pointer text-blue-400"
              onClick={() => navigate("/forgot-password")}
            >
              Reset it here
            </span>
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading
            ? "Processing..."
            : isAdminLogin
            ? "Login as Admin"
            : "Login"}
        </button>

        {isAdminLogin && (
          <p className="mt-4 text-xs text-gray-400 text-center">
            Note: Only admin credentials will work in this mode
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
