// src/App.js
import React from 'react';
import { AuthProvider, useAuth } from './components/AuthContext.js';
import AuthPage from './components/AuthPage.js';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 text-lg">Loading NextLogicAI...</p>
        </div>
      </div>
    );
  }

  // Not logged in - show auth page
  if (!user) {
    return <AuthPage />;
  }

  // Logged in as teacher/admin - show teacher dashboard
  if (user.role === 'admin') {
    return <TeacherDashboard />;
  }

  // Logged in as student - show student dashboard
  return <StudentDashboard />;
};

function App() {
  return (
    function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-purple-900 flex items-center justify-center p-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-4">TAILWIND IS WORKING!</h1>
        <p className="text-white/70">Dark glass card with blur and gradient.</p>
      </div>
    </div>
  );
}

export default App;