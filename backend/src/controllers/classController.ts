import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Class, CreateClassRequest } from '../models/Class';
import { AuthRequest } from '../middleware/auth';

const classes: Class[] = [];

export const createClass = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { name, description, date, startTime, endTime, maxCapacity, classType, workoutId, coachId } = req.body;
    const gymId = req.user?.gymId;

    if (!gymId) {
      return res.status(400).json({ error: 'Gym ID required' });
    }

    const newClass: Class = {
      id: uuidv4(),
      gymId,
      name,
      description,
      coachId,
      date: new Date(date),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      maxCapacity,
      currentBookings: 0,
      classType,
      workoutId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    classes.push(newClass);
    return res.status(201).json(newClass);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getClasses = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const gymId = req.user?.gymId;
    if (!gymId) {
      return res.status(400).json({ error: 'Gym ID required' });
    }

    const gymClasses = classes.filter(c => c.gymId === gymId);
    return res.json(gymClasses);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getClass = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const gymId = req.user?.gymId;

    const classItem = classes.find(c => c.id === id && c.gymId === gymId);
    if (!classItem) {
      return res.status(404).json({ error: 'Class not found' });
    }

    return res.json(classItem);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateClass = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const gymId = req.user?.gymId;
    const updates = req.body;

    const classIndex = classes.findIndex(c => c.id === id && c.gymId === gymId);
    if (classIndex === -1) {
      return res.status(404).json({ error: 'Class not found' });
    }

    classes[classIndex] = {
      ...classes[classIndex],
      ...updates,
      updatedAt: new Date()
    };

    return res.json(classes[classIndex]);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteClass = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const gymId = req.user?.gymId;

    const classIndex = classes.findIndex(c => c.id === id && c.gymId === gymId);
    if (classIndex === -1) {
      return res.status(404).json({ error: 'Class not found' });
    }

    classes.splice(classIndex, 1);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { classes };
