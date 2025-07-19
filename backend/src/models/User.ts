export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'coach' | 'athlete';
  gymId: string;
  profileImage?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'coach' | 'athlete';
  gymId: string;
  profileImage?: string;
  bio?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}
