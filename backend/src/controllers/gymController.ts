import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../middleware/auth';
import { Gym, CreateGymInput } from '../models/Gym';
import { User } from '../models/User';

const gyms: Gym[] = [];
const users: User[] = [];

export const createGym = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      name, email, phone, address, city, state, zipCode,
      primaryColor, secondaryColor, subscriptionPlan,
      adminEmail, adminPassword, adminFirstName, adminLastName,
      logo, website, description
    } = req.body;

    const existingGym = gyms.find(g => g.email === email);
    if (existingGym) {
      return res.status(400).json({ success: false, message: 'Gym already exists' });
    }

    const newGym: Gym = {
      id: uuidv4(),
      name,
      logo,
      primaryColor,
      secondaryColor,
      address,
      city,
      state,
      zipCode,
      phone,
      email,
      website,
      description,
      subscriptionStatus: 'trial',
      subscriptionPlan,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    gyms.push(newGym);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const adminUser: User = {
      id: uuidv4(),
      email: adminEmail,
      password: hashedPassword,
      firstName: adminFirstName,
      lastName: adminLastName,
      role: 'admin',
      gymId: newGym.id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(adminUser);

    res.status(201).json({
      success: true,
      gym: newGym,
      admin: { ...adminUser, password: undefined }
    });
  } catch (error) {
    console.error('Create gym error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getGym = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const gym = gyms.find(g => g.id === id);
    if (!gym) {
      return res.status(404).json({ success: false, message: 'Gym not found' });
    }

    if (req.user?.gymId !== id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({
      success: true,
      gym
    });
  } catch (error) {
    console.error('Get gym error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateGym = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.params;
    const updates = req.body;

    const gymIndex = gyms.findIndex(g => g.id === id);
    if (gymIndex === -1) {
      return res.status(404).json({ success: false, message: 'Gym not found' });
    }

    if (req.user?.gymId !== id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    gyms[gymIndex] = {
      ...gyms[gymIndex],
      ...updates,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      gym: gyms[gymIndex]
    });
  } catch (error) {
    console.error('Update gym error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getGymStats = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (req.user?.gymId !== id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const stats = {
      totalMembers: users.filter(u => u.gymId === id && u.isActive).length,
      totalCoaches: users.filter(u => u.gymId === id && u.role === 'coach' && u.isActive).length,
      totalAthletes: users.filter(u => u.gymId === id && u.role === 'athlete' && u.isActive).length,
      weeklyBookings: 45,
      attendanceRate: 0.85,
      activeClasses: 12,
      totalWorkouts: 25
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get gym stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
