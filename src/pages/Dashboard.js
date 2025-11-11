// src/components/Dashboard.js
import React from "react";
import { useAuth } from "../AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome, {user?.name || "User"}!</h1>
        <p className="text-white/70 mb-6">You are logged in as: <strong>{user?.role || "student"}</strong></p>
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}