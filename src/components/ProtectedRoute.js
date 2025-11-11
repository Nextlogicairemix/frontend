// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  // If user is logged in, show the protected page
  // If not logged in, redirect to login page
  return user ? children : <Navigate to="/login" replace />;
}