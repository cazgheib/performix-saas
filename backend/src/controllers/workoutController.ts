import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Workout, CreateWorkoutRequest } from '../models/Workout';
import { AuthRequest } from '../middleware/auth';

const workouts: Workout[] = [];

export const createWorkout = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { name, description, movements }: CreateWorkoutRequest = req.body;
    const gymId = req.user?.gymId;
    const createdBy = req.user?.id;

    if (!gymId || !createdBy) {
      return res.status(400).json({ error: 'Gym ID and User ID required' });
    }

    const newWorkout: Workout = {
      id: uuidv4(),
      name,
      description,
      movements: movements.map(movement => ({
        ...movement,
        id: uuidv4()
      })),
      gymId,
      createdBy,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    workouts.push(newWorkout);
    return res.status(201).json(newWorkout);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWorkouts = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const gymId = req.user?.gymId;
    if (!gymId) {
      return res.status(400).json({ error: 'Gym ID required' });
    }

    const gymWorkouts = workouts.filter(w => w.gymId === gymId);
    return res.json(gymWorkouts);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWorkout = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const gymId = req.user?.gymId;

    const workout = workouts.find(w => w.id === id && w.gymId === gymId);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    return res.json(workout);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateWorkout = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const gymId = req.user?.gymId;
    const updates = req.body;

    const workoutIndex = workouts.findIndex(w => w.id === id && w.gymId === gymId);
    if (workoutIndex === -1) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    workouts[workoutIndex] = {
      ...workouts[workoutIndex],
      ...updates,
      updatedAt: new Date()
    };

    return res.json(workouts[workoutIndex]);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteWorkout = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const gymId = req.user?.gymId;

    const workoutIndex = workouts.findIndex(w => w.id === id && w.gymId === gymId);
    if (workoutIndex === -1) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    workouts.splice(workoutIndex, 1);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { workouts };
