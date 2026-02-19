/**
 * API Client for Mindhaven Backend
 * Handles all HTTP requests, authentication, and error handling
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
const TOKEN_KEY = 'mindhaven_token';
const USER_KEY = 'mindhaven_user';

export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
  token?: string;
  user?: any;
  otp?: string;
}

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  wellnessScore?: number;
  phoneVerified?: boolean;
  emailVerified?: boolean;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Get stored authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Store authentication token
   */
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Remove authentication token
   */
  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  /**
   * Get stored user data
   */
  getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Store user data
   */
  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Generic fetch method with error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add authorization token if available
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle 401 Unauthorized - clear token and redirect to login
        if (response.status === 401) {
          this.clearToken();
          window.location.href = '/';
        }
        
        throw new Error(data.error || `HTTP Error: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // ==================================================
  // AUTHENTICATION ENDPOINTS
  // ==================================================

  /**
   * Send OTP to phone number
   */
  async sendPhoneOTP(phoneNumber: string): Promise<ApiResponse<{ otp?: string }>> {
    return this.post('/auth/send-otp', { phoneNumber });
  }

  /**
   * Verify OTP and login
   */
  async verifyPhoneOTP(phoneNumber: string, otp: string): Promise<ApiResponse<any>> {
    const response = await this.post<any>('/auth/verify-otp', { phoneNumber, otp });
    
    // Store token and user if login successful
    if (response.token) {
      this.setToken(response.token);
      if (response.user) {
        this.setUser(response.user);
      }
    }
    
    return response;
  }

  /**
   * Google OAuth login
   */
  async googleAuth(credential: string): Promise<ApiResponse<any>> {
    const response = await this.post<any>('/auth/google', { credential });
    
    // Store token and user if login successful
    if (response.token) {
      this.setToken(response.token);
      if (response.user) {
        this.setUser(response.user);
      }
    }
    
    return response;
  }

  /**
   * Register with email and password
   */
  async registerEmail(email: string, password: string, name?: string): Promise<ApiResponse<any>> {
    const response = await this.post<any>('/auth/register', { email, password, name });
    
    // Store token and user if registration successful
    if (response.token) {
      this.setToken(response.token);
      if (response.user) {
        this.setUser(response.user);
      }
    }
    
    return response;
  }

  /**
   * Login with email and password
   */
  async loginEmail(email: string, password: string): Promise<ApiResponse<any>> {
    const response = await this.post<any>('/auth/login', { email, password });
    
    // Store token and user if login successful
    if (response.token) {
      this.setToken(response.token);
      if (response.user) {
        this.setUser(response.user);
      }
    }
    
    return response;
  }

  /**
   * Logout
   */
  logout(): void {
    this.clearToken();
  }

  // ==================================================
  // FEATURE ENDPOINTS
  // ==================================================

  /**
   * Get user dashboard data
   */
  async getDashboard<T = any>(): Promise<ApiResponse<T>> {
    return this.get<T>('/features/dashboard');
  }

  /**
   * Submit quick check-in assessment
   */
  async submitCheckIn(data: any): Promise<ApiResponse<any>> {
    return this.post('/features/checkin', data);
  }

  /**
   * Get user assessments
   */
  async getAssessments(): Promise<ApiResponse<any[]>> {
    return this.get<any[]>('/features/assessments');
  }

  /**
   * Submit mental health assessment
   */
  async submitAssessment(answers: any): Promise<ApiResponse<any>> {
    return this.post('/features/assessment', { answers });
  }

  /**
   * Get available therapists
   */
  async getTherapists(): Promise<ApiResponse<any[]>> {
    return this.get<any[]>('/features/therapists');
  }

  /**
   * Book a therapy session
   */
  async bookTherapy(therapistId: string, data: any): Promise<ApiResponse<any>> {
    return this.post(`/features/bookings/${therapistId}`, data);
  }

  /**
   * Get user bookings
   */
  async getBookings(): Promise<ApiResponse<any[]>> {
    return this.get<any[]>('/features/bookings');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

export default apiClient;
