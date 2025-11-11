import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../AuthContext';

export default function AuthPage({ initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Get auth functions from context
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login flow
        const result = await login(email, password);
        
        if (result.success) {
          navigate('/dashboard');
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        // Registration flow
        const result = await register(name, email, password, accessCode || null);
        
        if (result.success) {
          setSuccess(result.message || 'Registration successful! Please login.');
          // Clear form
          setName('');
          setEmail('');
          setPassword('');
          setAccessCode('');
          // Switch to login after 2 seconds
          setTimeout(() => {
            setIsLogin(true);
            setSuccess('');
          }, 2000);
        } else {
          setError(result.error || 'Registration failed');
        }
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setName('');
    setEmail('');
    setPassword('');
    setAccessCode('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Auth Card */}
      <div className="w-full max-w-md">
        {/* Purple accent bar */}
        <div className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-xl" />
        
        <div className="bg-white rounded-b-xl shadow-lg p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className="text-gray-600">
              {isLogin 
                ? 'Sign in to your NextLogic AI account' 
                : 'Create your free NextLogic AI account'}
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Signup Only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="John Smith"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="teacher@school.edu"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
              />
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              )}
            </div>

            {/* School Access Code (Signup Only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Access Code
                  <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="SCHOOL123"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Have a code from your school? Enter it here
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Please wait...
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleMode}
                className="text-purple-600 font-semibold hover:text-purple-700 transition"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>FERPA Compliant • SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}