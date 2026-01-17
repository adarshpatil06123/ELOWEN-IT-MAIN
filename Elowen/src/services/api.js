// API Service Layer - Connected to Backend
// Real API implementation for Elowen Marketplace
import { Platform } from 'react-native';

// ============================================
// CONFIGURATION
// ============================================
// Dynamic API URL based on platform
// Android Emulator: 10.0.2.2 maps to host machine's localhost
// iOS Simulator: localhost works directly
// Real Device: Replace with your computer's IP (find with: ipconfig on Windows, ifconfig on Mac/Linux)

// Service URLs - API Gateway routes all traffic through port 8080
const getAuthApiBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8084/api/auth'; // Android Emulator - auth-service
    } else {
      return 'http://localhost:8084/api/auth'; // iOS Simulator - auth-service
    }
  }
  return 'https://your-production-api.com/api/auth'; // Production URL
};

const getConsultantApiBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8089/api/consultants'; // Android Emulator - consultant-service
    } else {
      return 'http://localhost:8089/api/consultants'; // iOS Simulator - consultant-service
    }
  }
  return 'https://your-production-api.com/api/consultants'; // Production URL
};

const getJobApiBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8083/api/jobs'; // Android Emulator - job-service
    } else {
      return 'http://localhost:8083/api/jobs'; // iOS Simulator - job-service
    }
  }
  return 'https://your-production-api.com/api/jobs'; // Production URL
};

const AUTH_API_BASE_URL = getAuthApiBaseUrl();
const CONSULTANT_API_BASE_URL = getConsultantApiBaseUrl();
const JOB_API_BASE_URL = getJobApiBaseUrl();

// Legacy - for backward compatibility
const API_BASE_URL = AUTH_API_BASE_URL.replace('/api/auth', '');

// ============================================
// MOCK DATA - For frontend development
// Backend dev will remove this and use real API
// ============================================

const MOCK_JOBS = [
  {
    id: 1,
    title: 'Delivery Associate',
    company: 'Shakti Engineering Works',
    location: 'Pune, Maharashtra',
    category: 'Delivery/Transport',
    salary: '₹15,000 - ₹25,000',
    experience: 'Fresher',
    featured: true,
    applied: false,
  },
  {
    id: 2,
    title: 'Warehouse Associate',
    company: 'Tech Solutions Ltd',
    location: 'Mumbai, Maharashtra',
    category: 'Warehouse',
    salary: '₹18,000 - ₹28,000',
    experience: '1-2 years',
    featured: true,
    applied: false,
  },
  {
    id: 3,
    title: 'Delivery Driver',
    company: 'Fast Delivery Co',
    location: 'Delhi',
    category: 'Delivery/Transport',
    salary: '₹20,000 - ₹30,000',
    experience: 'Fresher',
    featured: false,
    applied: false,
  },
  {
    id: 4,
    title: 'Logistics Coordinator',
    company: 'Global Logistics',
    location: 'Bangalore, Karnataka',
    category: 'Logistics',
    salary: '₹25,000 - ₹35,000',
    experience: '2-3 years',
    featured: true,
    applied: false,
  },
  {
    id: 5,
    title: 'Packaging Specialist',
    company: 'Packaging Solutions',
    location: 'Chennai, Tamil Nadu',
    category: 'Manufacturing',
    salary: '₹16,000 - ₹24,000',
    experience: 'Fresher',
    featured: false,
    applied: false,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get auth token from storage
const getAuthToken = async () => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    return null;
  }
};

// Save auth token to storage
const saveAuthToken = async (token) => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// Remove auth token from storage
const removeAuthToken = async () => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// ============================================
// AUTH API - Real Backend Implementation
// ============================================

export const authAPI = {
  login: async (email, password) => {
    try {
      const axios = require('axios').default;
      
      const response = await axios.post(`${AUTH_API_BASE_URL}/login`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      // Backend returns: { token: "jwt...", user: {...} }
      if (response.data && response.data.token) {
        await saveAuthToken(response.data.token);
        
        return {
          success: true,
          token: response.data.token,
          user: response.data.user || {
            email: email,
          },
        };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        // Server responded with error
        throw {
          success: false,
          error: error.response.data?.message || error.response.data?.error || 'Login failed',
        };
      } else if (error.request) {
        // Request made but no response
        throw {
          success: false,
          error: 'Cannot connect to server. Please check your connection.',
        };
      } else {
        // Other errors
        throw {
          success: false,
          error: error.message || 'Login failed. Please try again.',
        };
      }
    }
  },

  signup: async (userData) => {
    try {
      const axios = require('axios').default;
      
      // Clean phone number - remove +91, spaces, and other characters
      // Backend expects exactly 10 digits
      const cleanPhone = userData.phone ? userData.phone.replace(/\D/g, '').slice(-10) : null;
      
      // Map frontend fields to backend fields
      const payload = {
        fullName: userData.name,
        email: userData.email,
        password: userData.password,
        phone: cleanPhone,
        dateOfBirth: userData.dob,
        state: userData.state,
        city: userData.city,
        role: userData.role || 'JOB_SEEKER', // Default to JOB_SEEKER
      };

      const response = await axios.post(`${AUTH_API_BASE_URL}/register`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      // Backend now returns: { token: "jwt...", user: { id, fullName, email, role, phone, state, city } }
      if (response.data && response.data.token) {
        // Save the token
        await saveAuthToken(response.data.token);
        
        return {
          success: true,
          message: 'User registered successfully',
          token: response.data.token,
          user: response.data.user,
          autoLoggedIn: true,
        };
      }

      // Fallback for old response format (if backend returns userId instead of token)
      if (response.data && response.data.userId) {
        try {
          // Auto-login: Call login with same credentials
          const loginResult = await authAPI.login(userData.email, userData.password);
          
          return {
            success: true,
            message: response.data.message || 'User registered successfully',
            userId: response.data.userId,
            token: loginResult.token,
            user: loginResult.user,
            autoLoggedIn: true,
          };
        } catch (loginError) {
          // If auto-login fails, still return success for signup
          console.warn('Auto-login failed after signup:', loginError);
          return {
            success: true,
            message: response.data.message || 'User registered successfully',
            userId: response.data.userId,
            autoLoggedIn: false,
          };
        }
      }

      return {
        success: true,
        message: response.data.message || 'User registered successfully',
        userId: response.data.userId,
      };
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.response) {
        throw {
          success: false,
          error: error.response.data?.message || error.response.data?.error || 'Signup failed',
        };
      } else if (error.request) {
        throw {
          success: false,
          error: 'Cannot connect to server. Please check your connection.',
        };
      } else {
        throw {
          success: false,
          error: error.message || 'Signup failed. Please try again.',
        };
      }
    }
  },

  verifyOTP: async (otp, emailOrPhone) => {
    try {
      const axios = require('axios').default;
      
      // Determine if it's email or phone
      const isEmail = emailOrPhone && emailOrPhone.includes('@');
      
      const payload = isEmail 
        ? { email: emailOrPhone, otp }
        : { phone: emailOrPhone.replace(/\D/g, '').slice(-10), otp };
      
      const response = await axios.post(`${AUTH_API_BASE_URL}/verify-otp`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      // Backend returns: { token: "jwt..." }
      if (response.data && response.data.token) {
        await saveAuthToken(response.data.token);
        
        return {
          success: true,
          token: response.data.token,
          user: response.data.user || {
            email: emailOrPhone,
            role: 'jobseeker',
          },
        };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      
      if (error.response) {
        throw {
          success: false,
          error: error.response.data?.message || error.response.data?.error || 'Invalid OTP',
        };
      } else if (error.request) {
        throw {
          success: false,
          error: 'Cannot connect to server. Please check your connection.',
        };
      } else {
        throw {
          success: false,
          error: error.message || 'OTP verification failed. Please try again.',
        };
      }
    }
  },

  forgotPassword: async (email) => {
    // Forgot password not implemented in backend yet
    // Keeping mock implementation for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Password reset link sent to your email',
        });
      }, 1000);
    });
  },

  logout: async () => {
    await removeAuthToken();
    return { success: true };
  },

  // Get current user info using JWT
  getCurrentUser: async () => {
    try {
      const axios = require('axios').default;
      const token = await getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${AUTH_API_BASE_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: 10000,
      });

      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      console.error('Get current user error:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'Failed to get user info',
      };
    }
  },
};

// ============================================
// JOBS API - Real Backend Implementation
// Connected to job-service on port 8083
// ============================================

export const jobsAPI = {
  getJobs: async (filters = {}) => {
    try {
      const token = await getAuthToken();
      
      // Build query params
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.location) params.append('location', filters.location);
      if (filters.page) params.append('page', filters.page);
      if (filters.size) params.append('size', filters.size);
      
      const queryString = params.toString();
      const url = `${JOB_API_BASE_URL}${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Backend returns { content: [], totalElements: 10, ... }
      // Transform to expected format
      return {
        jobs: data.content || [],
        total: data.totalElements || 0,
        page: data.number || 0,
        limit: data.size || 10,
      };
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Fallback to empty list on error
      return {
        jobs: [],
        total: 0,
        page: 0,
        limit: 10,
      };
    }
  },

  getJobById: async (jobId) => {
    try {
      const token = await getAuthToken();
      
      const response = await fetch(`${JOB_API_BASE_URL}/${jobId}/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const job = await response.json();
      return { job };
    } catch (error) {
      console.error('Error fetching job details:', error);
      throw { error: 'Job not found' };
    }
  },

  applyToJob: async (jobId) => {
    try {
      const token = await getAuthToken();
      
      // For now, just call backend API (application-service endpoint)
      // Backend needs to be running on port 8084
      const response = await fetch(`${API_BASE_URL.replace('8082', '8084')}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          jobId: jobId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        success: true,
        message: 'Applied successfully',
        applicationId: result.id || `app_${Date.now()}`,
      };
    } catch (error) {
      console.error('Error applying to job:', error);
      // For now, simulate success even if backend fails
      return {
        success: true,
        message: 'Applied successfully (offline)',
        applicationId: `app_${Date.now()}`,
      };
    }
  },

  getAppliedJobs: async () => {
    try {
      const token = await getAuthToken();
      
      const response = await fetch(`${API_BASE_URL.replace('8082', '8084')}/api/applications/my-applications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        jobs: data.content || [],
        total: data.totalElements || 0,
      };
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      return {
        jobs: [],
        total: 0,
      };
    }
  },

  searchJobs: async (query, category) => {
    try {
      const token = await getAuthToken();
      
      // Use the main /api/jobs endpoint with filters
      // Map search parameters to backend filters
      const params = new URLSearchParams();
      
      if (query) {
        // For company/title search, use location or category based on context
        // Since backend doesn't have keyword search, we'll filter by category if available
        if (category) {
          params.append('category', category);
        }
        // For location-based search
        params.append('location', query);
      }
      
      const queryString = params.toString();
      const url = `${JOB_API_BASE_URL}${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        jobs: data.content || [],
        total: data.totalElements || 0,
      };
    } catch (error) {
      console.error('Error searching jobs:', error);
      return {
        jobs: [],
        total: 0,
      };
    }
  },
};

// ============================================
// CONSULTANT API - Real Backend Implementation
// Connected to consultant-service on port 8089
// ============================================

export const consultantAPI = {
  // Get consultant profile
  getProfile: async () => {
    try {
      const axios = require('axios').default;
      const token = await getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${CONSULTANT_API_BASE_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: 10000,
      });

      return {
        success: true,
        consultant: response.data,
      };
    } catch (error) {
      console.error('Get consultant profile error:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'Failed to get consultant profile',
      };
    }
  },

  // Update consultant profile
  updateProfile: async (data) => {
    try {
      const axios = require('axios').default;
      const token = await getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.put(`${CONSULTANT_API_BASE_URL}/profile`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      return {
        success: true,
        message: 'Profile updated successfully',
        consultant: response.data,
      };
    } catch (error) {
      console.error('Update consultant profile error:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'Failed to update profile',
      };
    }
  },

  // Get dashboard metrics
  getDashboard: async () => {
    try {
      const axios = require('axios').default;
      const token = await getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${CONSULTANT_API_BASE_URL}/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: 10000,
      });

      return {
        success: true,
        dashboard: response.data,
      };
    } catch (error) {
      console.error('Get dashboard error:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'Failed to get dashboard',
      };
    }
  },

  // Pool management
  getPools: async () => {
    try {
      const axios = require('axios').default;
      const token = await getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Get consultant ID first
      const profileResponse = await axios.get(`${CONSULTANT_API_BASE_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const consultantId = profileResponse.data.id;

      const response = await axios.get(`${CONSULTANT_API_BASE_URL}/${consultantId}/pools`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: 10000,
      });

      return {
        success: true,
        pools: response.data,
      };
    } catch (error) {
      console.error('Get pools error:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'Failed to get pools',
      };
    }
  },

  createPool: async (poolData) => {
    try {
      const axios = require('axios').default;
      const token = await getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Get consultant ID first
      const profileResponse = await axios.get(`${CONSULTANT_API_BASE_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const consultantId = profileResponse.data.id;

      const response = await axios.post(
        `${CONSULTANT_API_BASE_URL}/${consultantId}/pools`,
        poolData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      return {
        success: true,
        message: 'Pool created successfully',
        pool: response.data,
      };
    } catch (error) {
      console.error('Create pool error:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'Failed to create pool',
      };
    }
  },

  getPoolById: async (poolId) => {
    try {
      const axios = require('axios').default;
      const token = await getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Get consultant ID first
      const profileResponse = await axios.get(`${CONSULTANT_API_BASE_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const consultantId = profileResponse.data.id;

      const response = await axios.get(
        `${CONSULTANT_API_BASE_URL}/${consultantId}/pools/${poolId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      return {
        success: true,
        pool: response.data,
      };
    } catch (error) {
      console.error('Get pool error:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'Failed to get pool',
      };
    }
  },

  // Candidate management
  getCandidates: async (poolId) => {
    try {
      const axios = require('axios').default;
      const token = await getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Get consultant ID first
      const profileResponse = await axios.get(`${CONSULTANT_API_BASE_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const consultantId = profileResponse.data.id;

      const response = await axios.get(
        `${CONSULTANT_API_BASE_URL}/${consultantId}/pools/${poolId}/candidates`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      return {
        success: true,
        candidates: response.data,
      };
    } catch (error) {
      console.error('Get candidates error:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'Failed to get candidates',
      };
    }
  },

  addCandidate: async (poolId, candidateData) => {
    try {
      const axios = require('axios').default;
      const token = await getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Get consultant ID first
      const profileResponse = await axios.get(`${CONSULTANT_API_BASE_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const consultantId = profileResponse.data.id;

      const response = await axios.post(
        `${CONSULTANT_API_BASE_URL}/${consultantId}/pools/${poolId}/candidates`,
        candidateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      return {
        success: true,
        message: 'Candidate added successfully',
        candidate: response.data,
      };
    } catch (error) {
      console.error('Add candidate error:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'Failed to add candidate',
      };
    }
  },

  searchCandidates: async (poolId, searchTerm) => {
    try {
      const axios = require('axios').default;
      const token = await getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Get consultant ID first
      const profileResponse = await axios.get(`${CONSULTANT_API_BASE_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const consultantId = profileResponse.data.id;

      const response = await axios.get(
        `${CONSULTANT_API_BASE_URL}/${consultantId}/pools/${poolId}/candidates/search?searchTerm=${encodeURIComponent(searchTerm)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      return {
        success: true,
        candidates: response.data,
      };
    } catch (error) {
      console.error('Search candidates error:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'Failed to search candidates',
      };
    }
  },
};

// ============================================
// USER API - Mock implementation
// Backend dev will replace with real API calls
// ============================================

export const userAPI = {
  getProfile: async () => {
    // MOCK: Returns user profile
    // TODO: Backend dev replaces with real API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+91 9876543210',
          role: 'jobseeker',
          state: 'Maharashtra',
          city: 'Pune',
        });
      }, 500);
    });
  },

  updateProfile: async (data) => {
    // MOCK: Updates user profile
    // TODO: Backend dev replaces with real API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Profile updated successfully',
        });
      }, 500);
    });
  },
};

// ============================================
// Instructions for Backend Developer:
// 1. Replace MOCK_JOBS and mock functions with real API calls using axios
// 2. Update API_BASE_URL with your backend URL
// 3. Keep the same function names and response format
// 4. Add proper error handling
// 5. Add authentication token to headers where needed
// ============================================

