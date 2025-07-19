export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'coach' | 'athlete';
  gymId: string;
  profileImage?: string;
  bio?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'coach' | 'athlete';
  gymId: string;
  profileImage?: string;
  bio?: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  bio?: string;
  isActive?: boolean;
}
