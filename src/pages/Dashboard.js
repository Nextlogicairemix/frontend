import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import AIRemixTool from "../components/AIRemixTool";
import { 
  Shield, 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Eye,
  LogOut,
  BarChart3,
  BookOpen,
  Settings
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Mock data for demonstration
  const mockStudentData = {
    activeSessions: 2,
    aiUsageToday: 5,
    assignmentsActive: 3,
    recentActivity: [
      { time: "10 min ago", action: "Used AI for math help", status: "approved" },
      { time: "1 hour ago", action: "Completed Essay Assignment", status: "success" },
      { time: "2 hours ago", action: "Requested citation help", status: "approved" }
    ],
    assignments: [
      { name: "Essay: American History", deadline: "Tomorrow", aiAllowed: true, status: "In Progress" },
      { name: "Math Problem Set", deadline: "2 days", aiAllowed: false, status: "Not Started" },
      { name: "Science Lab Report", deadline: "1 week", aiAllowed: true, status: "In Progress" }
    ]
  };

  const mockTeacherData = {
    totalStudents: 28,
    activeNow: 12,
    alertsToday: 3,
    recentAlerts: [
      { student: "Sarah M.", issue: "Excessive AI usage", time: "5 min ago", severity: "warning" },
      { student: "John D.", issue: "AI used on restricted assignment", time: "15 min ago", severity: "high" },
      { student: "Emma R.", issue: "Normal AI usage", time: "30 min ago", severity: "low" }
    ],
    activeStudents: [
      { name: "Sarah Martinez", activity: "Working on Essay", aiUsage: 3, status: "active" },
      { name: "John Davis", activity: "Math Assignment", aiUsage: 0, status: "active" },
      { name: "Emma Rodriguez", activity: "Research", aiUsage: 1, status: "active" },
      { name: "Michael Chen", activity: "Reading", aiUsage: 0, status: "idle" }
    ]
  };

  const isTeacher = user?.role === "admin";

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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {isTeacher ? (
            <>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Users className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-white/60 text-sm">Total Students</p>
                <p className="text-3xl font-bold text-white">{mockTeacherData.totalStudents}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Activity className="w-8 h-8 text-green-400 mb-2" />
                <p className="text-white/60 text-sm">Active Now</p>
                <p className="text-3xl font-bold text-white">{mockTeacherData.activeNow}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <AlertTriangle className="w-8 h-8 text-yellow-400 mb-2" />
                <p className="text-white/60 text-sm">Alerts Today</p>
                <p className="text-3xl font-bold text-white">{mockTeacherData.alertsToday}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <BarChart3 className="w-8 h-8 text-purple-400 mb-2" />
                <p className="text-white/60 text-sm">Avg AI Usage</p>
                <p className="text-3xl font-bold text-white">2.4</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Activity className="w-8 h-8 text-green-400 mb-2" />
                <p className="text-white/60 text-sm">Active Sessions</p>
                <p className="text-3xl font-bold text-white">{mockStudentData.activeSessions}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Eye className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-white/60 text-sm">AI Uses Today</p>
                <p className="text-3xl font-bold text-white">{mockStudentData.aiUsageToday}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <BookOpen className="w-8 h-8 text-purple-400 mb-2" />
                <p className="text-white/60 text-sm">Active Assignments</p>
                <p className="text-3xl font-bold text-white">{mockStudentData.assignmentsActive}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                <p className="text-white/60 text-sm">Status</p>
                <p className="text-xl font-bold text-white">All Clear</p>
              </div>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Activity/Alerts */}
          <div className="lg:col-span-2 space-y-6">
            {isTeacher ? (
              <>
                {/* Recent Alerts */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    Recent Alerts
                  </h2>
                  <div className="space-y-3">
                    {mockTeacherData.recentAlerts.map((alert, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-lg border-l-4 ${
                          alert.severity === "high"
                            ? "bg-red-500/20 border-red-500"
                            : alert.severity === "warning"
                            ? "bg-yellow-500/20 border-yellow-500"
                            : "bg-blue-500/20 border-blue-500"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white font-semibold">{alert.student}</p>
                            <p className="text-white/70 text-sm">{alert.issue}</p>
                          </div>
                          <span className="text-white/60 text-xs">{alert.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Students */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-400" />
                    Active Students
                  </h2>
                  <div className="space-y-3">
                    {mockTeacherData.activeStudents.map((student, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">{student.name}</p>
                          <p className="text-white/60 text-sm">{student.activity}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white/70 text-sm">AI: {student.aiUsage}x</span>
                          <div
                            className={`w-3 h-3 rounded-full ${
                              student.status === "active" ? "bg-green-400 animate-pulse" : "bg-gray-400"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Assignments */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                    My Assignments
                  </h2>
                  <div className="space-y-3">
                    {mockStudentData.assignments.map((assignment, i) => (
                      <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-white font-semibold">{assignment.name}</p>
                            <p className="text-white/60 text-sm">Due: {assignment.deadline}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              assignment.status === "In Progress"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-gray-500/20 text-gray-300"
                            }`}
                          >
                            {assignment.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {assignment.aiAllowed ? (
                            <span className="text-green-400 text-xs flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              AI Allowed
                            </span>
                          ) : (
                            <span className="text-red-400 text-xs flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              AI Restricted
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-blue-400" />
                    Recent Activity
                  </h2>
                  <div className="space-y-3">
                    {mockStudentData.recentActivity.map((activity, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            activity.status === "approved" ? "bg-green-400" : "bg-blue-400"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-white text-sm">{activity.action}</p>
                          <p className="text-white/60 text-xs">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {isTeacher ? (
                  <>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition">
                      View All Students
                    </button>
                    <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition">
                      Create Assignment
                    </button>
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition">
                      View Analytics
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition">
                      Start New Session
                    </button>
                    <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition">
                      View Assignments
                    </button>
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition">
                      Request Help
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </h2>
              <div className="space-y-3">
                <button className="w-full text-left text-white/80 hover:text-white py-2 transition">
                  Profile Settings
                </button>
                <button className="w-full text-left text-white/80 hover:text-white py-2 transition">
                  Notification Preferences
                </button>
                <button className="w-full text-left text-white/80 hover:text-white py-2 transition">
                  Privacy & Security
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}