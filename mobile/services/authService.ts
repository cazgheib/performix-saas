import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'coach' | 'athlete';
  gymId?: string;
  bio?: string;
  profileImage?: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'coach' | 'athlete';
    gymId?: string;
    profileImage?: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    return response.data;
  },

  async getMe(token: string): Promise<AuthResponse['user']> {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
