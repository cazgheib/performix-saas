import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { User, CreateUserRequest, LoginRequest, AuthResponse } from '../models/User';
import { Gym } from '../models/Gym';
import { AuthRequest } from '../middleware/auth';

const users: User[] = [];
const gyms: Gym[] = [];

export const signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, name, role, gymId, profileImage, bio }: CreateUserRequest = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    if (gymId) {
      const gym = gyms.find(g => g.id === gymId);
      if (!gym) {
        return res.status(400).json({ error: 'Gym not found' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const newUser: User = {
      id: userId,
      email,
      password: hashedPassword,
      name,
      role,
      gymId,
      profileImage,
      bio,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: userId, email, role, gymId },
      process.env.JWT_SECRET || 'default-secret'
    ) as string;

    const response: AuthResponse = {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        gymId: newUser.gymId,
        profileImage: newUser.profileImage,
        bio: newUser.bio,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      },
      token
    };

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password }: LoginRequest = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, gymId: user.gymId },
      process.env.JWT_SECRET || 'default-secret'
    ) as string;

    const response: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        gymId: user.gymId,
        profileImage: user.profileImage,
        bio: user.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    };

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMe = (req: AuthRequest, res: Response): Response => {
  try {
    const user = users.find(u => u.id === req.user?.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      gymId: user.gymId,
      profileImage: user.profileImage,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { users, gyms };
