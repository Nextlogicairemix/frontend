// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import AIRemixTool from "../components/AIRemixTool";
import TeacherDashboard from "../components/TeacherDashboard";
import { Shield, LogOut, Activity, Eye, BookOpen, CheckCircle } from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || "https://backend-8ryu.onrender.com";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isTeacher = user?.role === "admin";

  // Fetch assignments for students
  useEffect(() => {
    if (!isTeacher) {
      fetch(`${API_URL}/api/student/assignments`, {
        credentials: 'include'
      })
        .then(r => r.json())
        .then(data => {
          if (data.assignments) {
            setAssignments(data.assignments);
          }
        })
        .catch(console.error);
    }
  }, [isTeacher]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">NextLogic AI</h1>
                <p className="text-white/60 text-sm">
                  {isTeacher ? "Teacher Dashboard" : "Student Dashboard"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-semibold">{user?.name || "User"}</p>
                <p className="text-white/60 text-sm capitalize">{user?.role || "Student"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Teacher View */}
        {isTeacher ? (
          <TeacherDashboard />
        ) : (
          /* Student View */
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Activity className="w-8 h-8 text-green-400 mb-2" />
                <p className="text-white/60 text-sm">AI Uses Today</p>
                <p className="text-3xl font-bold text-white">{user?.aiUsageCount || 0}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <BookOpen className="w-8 h-8 text-purple-400 mb-2" />
                <p className="text-white/60 text-sm">Active Assignments</p>
                <p className="text-3xl font-bold text-white">{assignments.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                <p className="text-white/60 text-sm">Status</p>
                <p className="text-xl font-bold text-white">All Clear</p>
              </div>
            </div>

            {/* AI Remix Tool */}
            <AIRemixTool />

            {/* Assignments */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-400" />
                My Assignments
              </h2>
              <div className="space-y-3">
                {assignments.length > 0 ? (
                  assignments.map((assignment) => (
                    <div key={assignment.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white font-semibold">{assignment.name}</p>
                          <p className="text-white/60 text-sm">Due: {assignment.deadline}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300">
                          {assignment.status}
                        </span>
                      </div>
                      <p className="text-white/50 text-sm mb-2">{assignment.description}</p>
                      <div className="flex items-center gap-2">
                        {assignment.aiAllowed ? (
                          <span className="text-green-400 text-xs flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            AI Allowed
                          </span>
                        ) : (
                          <span className="text-red-400 text-xs flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            AI Restricted
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white/40 text-center py-8">No assignments yet</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}