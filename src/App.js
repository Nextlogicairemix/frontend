// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import SEOWrapper from './components/SEOWrapper';
import LandingPage from './pages/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <SEOWrapper
                title="NextLogic AI - Stop AI Cheating | Teacher-Controlled AI Learning Platform"
                description="Empower students with AI while preventing cheating. Monitor every AI interaction, get instant visual alerts, and control AI features per assignment. Trusted by 500+ schools."
                keywords="AI cheating prevention, teacher AI control, student AI monitoring, academic integrity tools, AI detection for teachers, supervised AI learning"
                canonical="https://www.nextlogicai.com/"
              >
                <LandingPage />
              </SEOWrapper>
            }
          />

          <Route
            path="/login"
            element={
              <SEOWrapper
                title="Login - NextLogic AI | Teacher Dashboard Access"
                description="Log in to your NextLogic AI teacher dashboard. Monitor student AI usage, view session logs, and manage assignments with full oversight."
                noindex={true}
              >
                <AuthPage initialMode="login" />
              </SEOWrapper>
            }
          />

          <Route
            path="/signup"
            element={
              <SEOWrapper
                title="Sign Up Free - NextLogic AI | Start Your 3 Free Sessions"
                description="Create your free NextLogic AI account. Get 3 monitored sessions to try our AI cheating prevention platform. No credit card required."
                canonical="https://www.nextlogicai.com/signup"
              >
                <AuthPage initialMode="signup" />
              </SEOWrapper>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <SEOWrapper
                  title="Dashboard - NextLogic AI"
                  description="Your NextLogic AI teacher dashboard"
                  noindex={true}
                >
                  <Dashboard />
                </SEOWrapper>
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;