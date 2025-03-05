import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Log the request
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, 
      config.params || {}, 
      config.data || {}
    );
    
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log the response
    console.log(`API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, 
      response.data
    );
    
    return response;
  },
  (error) => {
    // Log the error
    console.error('API Response Error:', error.response || error);
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      console.log('Authentication error, redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Handle server errors
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response);
    }
    
    // Handle network errors
    if (error.code === 'ECONNABORTED' || !error.response) {
      console.error('Network error:', error);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
