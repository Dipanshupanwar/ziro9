import { useState } from "react";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";


function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
            const BASE_URL = import.meta.env.VITE_API_URL;


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await axios.post(`${BASE_URL}/api/auth/signup`, form);
      localStorage.setItem("email", form.email);
      navigate("/verify-otp");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Create Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
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
          className="w-full p-3 mb-6 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition-colors"
        >
          Send OTP
        </button>
          <p className="text-center mt-4 text-sm text-zinc-400">
  Already have an account?{" "}
  <Link to="/login" className="text-purple-500 hover:underline">Login</Link>
</p>

      
      </form>
    </div>
  );
}

export default Signup;
