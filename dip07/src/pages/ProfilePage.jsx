import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated. Please login.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/profile/me", {
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-700">
        Loading your profile...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-semibold">
        Error: {error}
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
        <img
          src={`https://ui-avatars.com/api/?name=${profile.name}&background=random&size=128`}
          alt="Profile Avatar"
          className="mx-auto rounded-full mb-6"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {profile.name}!
        </h2>
        <p className="text-gray-600 mb-6">Email: {profile.email}</p>

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
