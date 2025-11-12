// src/components/TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  BarChart3,
  Eye,
  RefreshCw,
  CheckCircle,
  Clock
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || "https://backend-8ryu.onrender.com";

export default function TeacherDashboard() {
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchActivity = async () => {
    try {
      const response = await fetch(`${API_URL}/api/teacher/activity`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setActivityData(data);
        setLastUpdate(new Date());
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch activity:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();

    // Auto-refresh every 5 seconds if enabled
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchActivity, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const getSeverity = (usage) => {
    if (usage > 10) return { color: 'red', label: 'High' };
    if (usage > 5) return { color: 'yellow', label: 'Medium' };
    return { color: 'green', label: 'Normal' };
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (!activityData) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <p className="text-white/60">Failed to load activity data</p>
      </div>
    );
  }

  const { stats, recentActivity, students } = activityData;

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Real-Time Monitoring</h2>
          <p className="text-white/60 text-sm">
            Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString() : '---'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              autoRefresh
                ? 'bg-green-500 text-white'
                : 'bg-white/20 text-white/60'
            }`}
          >
            {autoRefresh ? '● Auto-Refresh ON' : '○ Auto-Refresh OFF'}
          </button>
          <button
            onClick={fetchActivity}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Now
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <Users className="w-8 h-8 text-blue-400 mb-2" />
          <p className="text-white/60 text-sm">Total Students</p>
          <p className="text-3xl font-bold text-white">{stats.totalStudents}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <Activity className="w-8 h-8 text-green-400 mb-2" />
          <p className="text-white/60 text-sm">Active Now</p>
          <p className="text-3xl font-bold text-white">{stats.activeNow}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <Eye className="w-8 h-8 text-purple-400 mb-2" />
          <p className="text-white/60 text-sm">Total AI Usage</p>
          <p className="text-3xl font-bold text-white">{stats.totalUsage}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <BarChart3 className="w-8 h-8 text-yellow-400 mb-2" />
          <p className="text-white/60 text-sm">Avg per Student</p>
          <p className="text-3xl font-bold text-white">{stats.averageUsage}</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Feed */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Recent AI Activity
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivity.length > 0 ? (
              recentActivity.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-white/5 rounded-lg border-l-4 border-purple-400"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-white font-semibold">{log.userName}</p>
                    <span className="text-white/60 text-xs">
                      {getTimeAgo(log.timestamp)}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Used AI: <span className="font-semibold">{log.remixType}</span>
                  </p>
                  <p className="text-white/50 text-xs mt-1">
                    Content: {log.originalContent}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Eye className="w-12 h-12 text-white/20 mx-auto mb-2" />
                <p className="text-white/40">No AI activity yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-400" />
            Students ({students.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {students.length > 0 ? (
              students.map((student) => {
                const severity = getSeverity(student.aiUsageCount);
                return (
                  <div
                    key={student.id}
                    className="p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="text-white font-semibold flex items-center gap-2">
                          {student.name}
                          {student.isActive && (
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          )}
                        </p>
                        <p className="text-white/50 text-xs">{student.email}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            severity.color === 'red'
                              ? 'bg-red-500/20 text-red-300'
                              : severity.color === 'yellow'
                              ? 'bg-yellow-500/20 text-yellow-300'
                              : 'bg-green-500/20 text-green-300'
                          }`}
                        >
                          {student.aiUsageCount} uses
                        </span>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs">
                      Last active: {getTimeAgo(student.lastActive)}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-white/20 mx-auto mb-2" />
                <p className="text-white/40">No students registered yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Alerts & Notifications
        </h3>
        <div className="space-y-2">
          {students.filter(s => s.aiUsageCount > 10).length > 0 ? (
            students
              .filter(s => s.aiUsageCount > 10)
              .map(student => (
                <div
                  key={student.id}
                  className="p-3 bg-red-500/20 border-l-4 border-red-500 rounded"
                >
                  <p className="text-white font-semibold">High AI Usage Alert</p>
                  <p className="text-white/70 text-sm">
                    {student.name} has used AI {student.aiUsageCount} times - consider reviewing
                  </p>
                </div>
              ))
          ) : (
            <div className="p-4 bg-green-500/20 border-l-4 border-green-500 rounded flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <p className="text-white/80">All students within normal usage limits</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}