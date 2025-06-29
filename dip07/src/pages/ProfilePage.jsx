import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated. Please login.");
      setLoading(false);
      return;
    }

    fetch(`${BASE_URL}/api/profile/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ✅ Show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-700">
        Loading your profile...
      </div>
    );
  }

  // ✅ If there's an error (like not logged in), show it and redirect
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-semibold">
        Error: {error}
        <button
          onClick={() => navigate("/login")}
          className="ml-4 bg-red-600 text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // ✅ Render profile safely
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
        {profile?.name && (
          <img
            src={`https://ui-avatars.com/api/?name=${profile.name}&background=random&size=128`}
            alt="Profile Avatar"
            className="mx-auto rounded-full mb-6"
          />
        )}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {profile?.name}!
        </h2>
        <p className="text-gray-600 mb-6">Email: {profile?.email}</p>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
