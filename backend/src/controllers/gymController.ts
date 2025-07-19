import { v4 as uuidv4 } from 'uuid';
import { Gym, CreateGymRequest } from '../models/Gym';
import { gyms } from './authController';

export const createGym = (req: any, res: any) => {
  try {
    const { name, logo, primaryColor, secondaryColor, location, contactEmail, contactPhone, description, subscriptionPlan }: CreateGymRequest = req.body;

    const gymId = uuidv4();
    const newGym: Gym = {
      id: gymId,
      name,
      logo,
      primaryColor,
      secondaryColor,
      location,
      contactEmail,
      contactPhone,
      description,
      subscriptionStatus: 'trial',
      subscriptionPlan,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    gyms.push(newGym);
    res.status(201).json(newGym);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGyms = (req: any, res: any) => {
  try {
    res.json(gyms);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGym = (req: any, res: any) => {
  try {
    const { id } = req.params;
    const gym = gyms.find(g => g.id === id);
    
    if (!gym) {
      return res.status(404).json({ error: 'Gym not found' });
    }

    if (req.user.gymId !== gym.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(gym);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateGym = (req: any, res: any) => {
  try {
    const { id } = req.params;
    const gymIndex = gyms.findIndex(g => g.id === id);
    
    if (gymIndex === -1) {
      return res.status(404).json({ error: 'Gym not found' });
    }

    if (req.user.gymId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedGym = {
      ...gyms[gymIndex],
      ...req.body,
      updatedAt: new Date()
    };

    gyms[gymIndex] = updatedGym;
    res.json(updatedGym);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGymStats = (req: any, res: any) => {
  try {
    const gymId = req.user.gymId;
    
    const stats = {
      memberCount: 0,
      weeklyBookings: 0,
      attendanceRate: 0,
      activeClasses: 0
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
