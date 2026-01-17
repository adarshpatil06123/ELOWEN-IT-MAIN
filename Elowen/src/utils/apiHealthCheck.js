/**
 * API Health Check Utility
 * Use this to verify backend connectivity from the frontend
 */

import { Platform } from 'react-native';

// Get the API base URLs (matching api.js configuration)
const getAuthApiBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8084'; // auth-service
    } else {
      return 'http://localhost:8084'; // auth-service
    }
  }
  return 'https://your-production-api.com';
};

const getConsultantApiBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8089'; // consultant-service
    } else {
      return 'http://localhost:8089'; // consultant-service
    }
  }
  return 'https://your-production-api.com';
};

const getJobApiBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8083'; // job-service
    } else {
      return 'http://localhost:8083'; // job-service
    }
  }
  return 'https://your-production-api.com';
};

/**
 * Check if a specific backend service is reachable
 * @param {string} serviceName - Name of the service (auth, consultant, job)
 * @returns {Promise<Object>} Health check result
 */
const checkServiceHealth = async (serviceName, baseUrl) => {
  const startTime = Date.now();

  try {
    const axios = require('axios').default;
    
    // Try to reach the actuator health endpoint
    const response = await axios.get(`${baseUrl}/actuator/health`, {
      timeout: 5000,
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    return {
      service: serviceName,
      success: true,
      status: response.data.status || 'UP',
      responseTime: `${responseTime}ms`,
      baseUrl: baseUrl,
      message: `${serviceName} service is reachable`,
    };
  } catch (error) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    return {
      service: serviceName,
      success: false,
      status: 'DOWN',
      responseTime: `${responseTime}ms`,
      baseUrl: baseUrl,
      message: `Cannot reach ${serviceName} service`,
      error: error.message,
    };
  }
};

/**
 * Check if all backend services are reachable
 * @returns {Promise<Object>} Comprehensive health check result
 */
export const checkBackendHealth = async () => {
  const platform = Platform.OS;
  
  // Check all services
  const [authHealth, consultantHealth, jobHealth] = await Promise.all([
    checkServiceHealth('auth-service', getAuthApiBaseUrl()),
    checkServiceHealth('consultant-service', getConsultantApiBaseUrl()),
    checkServiceHealth('job-service', getJobApiBaseUrl()),
  ]);

  const allHealthy = authHealth.success && consultantHealth.success && jobHealth.success;

  return {
    success: allHealthy,
    platform: platform,
    services: {
      auth: authHealth,
      consultant: consultantHealth,
      job: jobHealth,
    },
    summary: {
      total: 3,
      healthy: [authHealth, consultantHealth, jobHealth].filter(s => s.success).length,
      unhealthy: [authHealth, consultantHealth, jobHealth].filter(s => !s.success).length,
    },
    message: allHealthy 
      ? 'All backend services are reachable' 
      : 'Some backend services are not reachable',
  };
};

/**
 * Test authentication endpoint specifically
 * @returns {Promise<Object>} Auth endpoint test result
 */
export const testAuthEndpoint = async () => {
  const AUTH_API_BASE_URL = getAuthApiBaseUrl();

  try {
    const axios = require('axios').default;
    
    // Try to call login with invalid credentials to see if endpoint exists
    const response = await axios.post(
      `${AUTH_API_BASE_URL}/api/auth/login`,
      {
        email: 'test@healthcheck.com',
        password: 'test',
      },
      {
        timeout: 5000,
        validateStatus: (status) => status < 500, // Accept 4xx as valid (endpoint exists)
      }
    );

    return {
      success: true,
      endpointExists: true,
      statusCode: response.status,
      message: 'Auth endpoint is accessible',
      baseUrl: AUTH_API_BASE_URL,
    };
  } catch (error) {
    if (error.request && !error.response) {
      return {
        success: false,
        endpointExists: false,
        message: 'Cannot reach auth endpoint',
        baseUrl: AUTH_API_BASE_URL,
        error: 'Network Error',
      };
    }

    return {
      success: true,
      endpointExists: true,
      statusCode: error.response?.status,
      message: 'Auth endpoint responded (even with error)',
      baseUrl: AUTH_API_BASE_URL,
    };
  }
};

/**
 * Run comprehensive diagnostics
 * @returns {Promise<Object>} Complete diagnostic report
 */
export const runDiagnostics = async () => {
  console.log('🔍 Running API Diagnostics...\n');

  const healthCheck = await checkBackendHealth();
  console.log('1. Backend Health:', healthCheck);

  const authCheck = await testAuthEndpoint();
  console.log('2. Auth Endpoint:', authCheck);

  const summary = {
    timestamp: new Date().toISOString(),
    platform: Platform.OS,
    services: {
      auth: getAuthApiBaseUrl(),
      consultant: getConsultantApiBaseUrl(),
      job: getJobApiBaseUrl(),
    },
    backendHealth: healthCheck,
    authEndpoint: authCheck,
    overallStatus: healthCheck.success && authCheck.success ? 'PASS' : 'FAIL',
  };

  console.log('\n📊 Diagnostic Summary:', summary);

  return summary;
};

export default {
  checkBackendHealth,
  testAuthEndpoint,
  runDiagnostics,
};
