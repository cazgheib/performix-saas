import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../middleware/auth';
import { User, CreateUserInput } from '../models/User';

const users: User[] = [];

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const gymUsers = users.filter(u => u.gymId === req.user?.gymId && u.isActive);
    
    const usersResponse = gymUsers.map(({ password, ...user }) => user);

    res.json({
      success: true,
      users: usersResponse
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const inviteUser = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, role, firstName, lastName } = req.body;

    const existingUser = users.find(u => u.email === email && u.gymId === req.user?.gymId);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists in this gym' });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempPassword, salt);

    const newUser: User = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      gymId: req.user!.gymId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);

    console.log(`Invitation sent to ${email} with temporary password: ${tempPassword}`);

    const { password: _, ...userResponse } = newUser;

    res.status(201).json({
      success: true,
      user: userResponse,
      tempPassword // Only for development - remove in production
    });
  } catch (error) {
    console.error('Invite user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = users.find(u => u.id === id && u.gymId === req.user?.gymId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { password: _, ...userResponse } = user;

    res.json({
      success: true,
      user: userResponse
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.params;
    const updates = req.body;

    const userIndex = users.findIndex(u => u.id === id && u.gymId === req.user?.gymId);
    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (req.user?.id !== id && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date()
    };

    const { password: _, ...userResponse } = users[userIndex];

    res.json({
      success: true,
      user: userResponse
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const userIndex = users.findIndex(u => u.id === id && u.gymId === req.user?.gymId);
    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    users[userIndex].isActive = false;
    users[userIndex].updatedAt = new Date();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
