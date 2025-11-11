// src/config/api.js
// API Configuration for NextLogicAI

const isDevelopment = process.env.NODE_ENV === 'development';

// Your backend URLs
const API_URLS = {
  development: 'http://localhost:5000',
  production: 'https://back-thbr.onrender.com' // Replace with your actual Render URL
};

export const API_URL = process.env.REACT_APP_API_URL || API_URLS[isDevelopment ? 'development' : 'production'];

// API endpoints
export const ENDPOINTS = {
  // Auth
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
  
  // Tools
  TOOLS_AVAILABLE: '/api/tools/available',
  REMIX: '/api/remix',
  
  // Progress
  COURSE_PROGRESS: '/api/progress',
  
  // History
  HISTORY: '/api/history',
  
  // Admin/Teacher
  CREATE_CODE: '/api/admin/create_code',
  ACCESS_CODES: '/api/admin/access_codes',
  STUDENTS: '/api/admin/students',
  TOOL_PERMISSIONS: (code) => `/api/admin/access_code/${code}/tools`,
  BULK_TOOLS: (code) => `/api/admin/access_code/${code}/tools/bulk`,
};

// Fetch helper with credentials
export const apiFetch = async (endpoint, options = {}) => {
  const defaultOptions = {
    credentials: 'include', // Important for cookies/sessions
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Something went wrong');
  }

  return response.json();
};

export default API_URL;