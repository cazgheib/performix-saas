import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../middleware/auth';
import { Workout, CreateWorkoutInput, WorkoutMovement } from '../models/Workout';

const workouts: Workout[] = [];

export const getWorkouts = async (req: AuthRequest, res: Response) => {
  try {
    const { gymId, type, difficulty, isTemplate, isPublic } = req.query;

    let filteredWorkouts = workouts.filter(w => w.isActive);

    if (gymId) {
      filteredWorkouts = filteredWorkouts.filter(w => 
        w.gymId === gymId || (w.isPublic && w.isTemplate)
      );
    } else if (req.user?.gymId) {
      filteredWorkouts = filteredWorkouts.filter(w => 
        w.gymId === req.user!.gymId || (w.isPublic && w.isTemplate)
      );
    }

    if (type) {
      filteredWorkouts = filteredWorkouts.filter(w => w.type === type);
    }

    if (difficulty) {
      filteredWorkouts = filteredWorkouts.filter(w => w.difficulty === difficulty);
    }

    if (isTemplate !== undefined) {
      filteredWorkouts = filteredWorkouts.filter(w => w.isTemplate === (isTemplate === 'true'));
    }

    if (isPublic !== undefined) {
      filteredWorkouts = filteredWorkouts.filter(w => w.isPublic === (isPublic === 'true'));
    }

    filteredWorkouts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    res.json({
      success: true,
      workouts: filteredWorkouts
    });
  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createWorkout = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      gymId, name, description, type, duration, difficulty,
      instructions, videoUrl, imageUrl, movements, scoringType,
      isTemplate, isPublic, price
    } = req.body;

    const movementsWithIds: WorkoutMovement[] = movements.map((movement: any, index: number) => ({
      id: uuidv4(),
      ...movement,
      order: index + 1
    }));

    const newWorkout: Workout = {
      id: uuidv4(),
      gymId,
      createdBy: req.user!.id,
      name,
      description,
      type,
      duration,
      difficulty,
      instructions,
      videoUrl,
      imageUrl,
      movements: movementsWithIds,
      scoringType,
      isTemplate,
      isPublic: isPublic || false,
      price,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    workouts.push(newWorkout);

    res.status(201).json({
      success: true,
      workout: newWorkout
    });
  } catch (error) {
    console.error('Create workout error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getWorkoutDetails = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const workout = workouts.find(w => w.id === id);
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }

    if (!workout.isPublic && req.user?.gymId !== workout.gymId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({
      success: true,
      workout
    });
  } catch (error) {
    console.error('Get workout details error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateWorkout = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.params;
    const updates = req.body;

    const workoutIndex = workouts.findIndex(w => w.id === id);
    if (workoutIndex === -1) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }

    const workout = workouts[workoutIndex];

    if (req.user?.gymId !== workout.gymId && req.user?.id !== workout.createdBy) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (updates.movements) {
      updates.movements = updates.movements.map((movement: any, index: number) => ({
        id: movement.id || uuidv4(),
        ...movement,
        order: index + 1
      }));
    }

    workouts[workoutIndex] = {
      ...workout,
      ...updates,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      workout: workouts[workoutIndex]
    });
  } catch (error) {
    console.error('Update workout error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteWorkout = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const workoutIndex = workouts.findIndex(w => w.id === id);
    if (workoutIndex === -1) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }

    const workout = workouts[workoutIndex];

    if (req.user?.gymId !== workout.gymId && req.user?.id !== workout.createdBy) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    workouts[workoutIndex].isActive = false;
    workouts[workoutIndex].updatedAt = new Date();

    res.json({
      success: true,
      message: 'Workout deleted successfully'
    });
  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
