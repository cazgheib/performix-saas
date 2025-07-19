import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../middleware/auth';
import { WorkoutLog, CreateWorkoutLogInput, WorkoutLogMovement } from '../models/WorkoutLog';

const workoutLogs: WorkoutLog[] = [];

export const createWorkoutLog = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      workoutId, classId, gymId, duration, score, scoreType, notes, movements
    } = req.body;
    const userId = req.user!.id;

    const movementsWithIds: WorkoutLogMovement[] = movements.map((movement: any) => ({
      id: uuidv4(),
      ...movement
    }));

    const existingLogs = workoutLogs.filter(l => 
      l.userId === userId && l.workoutId === workoutId && l.scoreType === scoreType
    );
    
    let isPersonalRecord = false;
    if (score && existingLogs.length > 0) {
      const bestScore = Math.max(...existingLogs.map(l => l.score || 0));
      isPersonalRecord = score > bestScore;
    } else if (score) {
      isPersonalRecord = true;
    }

    const newLog: WorkoutLog = {
      id: uuidv4(),
      userId,
      workoutId,
      classId,
      gymId,
      completedAt: new Date(),
      duration,
      score,
      scoreType,
      notes,
      movements: movementsWithIds,
      isPersonalRecord,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    workoutLogs.push(newLog);

    res.status(201).json({
      success: true,
      log: newLog
    });
  } catch (error) {
    console.error('Create workout log error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getWorkoutLogs = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { userId, workoutId, gymId, startDate, endDate } = req.query;

    let filteredLogs = workoutLogs.filter(l => l.gymId === gymId);

    if (req.user?.role === 'athlete') {
      filteredLogs = filteredLogs.filter(l => l.userId === req.user?.id);
    } else if (userId) {
      filteredLogs = filteredLogs.filter(l => l.userId === userId);
    }

    if (workoutId) {
      filteredLogs = filteredLogs.filter(l => l.workoutId === workoutId);
    }

    if (startDate) {
      const start = new Date(startDate as string);
      filteredLogs = filteredLogs.filter(l => l.completedAt >= start);
    }

    if (endDate) {
      const end = new Date(endDate as string);
      filteredLogs = filteredLogs.filter(l => l.completedAt <= end);
    }

    filteredLogs.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());

    res.json({
      success: true,
      logs: filteredLogs
    });
  } catch (error) {
    console.error('Get workout logs error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateWorkoutLog = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.params;
    const updates = req.body;

    const logIndex = workoutLogs.findIndex(l => l.id === id);
    if (logIndex === -1) {
      return res.status(404).json({ success: false, message: 'Workout log not found' });
    }

    const log = workoutLogs[logIndex];

    if (req.user?.id !== log.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (updates.movements) {
      updates.movements = updates.movements.map((movement: any) => ({
        id: movement.id || uuidv4(),
        ...movement
      }));
    }

    if (updates.score && updates.score !== log.score) {
      const existingLogs = workoutLogs.filter(l => 
        l.userId === log.userId && l.workoutId === log.workoutId && 
        l.scoreType === log.scoreType && l.id !== id
      );
      
      if (existingLogs.length > 0) {
        const bestScore = Math.max(...existingLogs.map(l => l.score || 0));
        updates.isPersonalRecord = updates.score > bestScore;
      } else {
        updates.isPersonalRecord = true;
      }
    }

    workoutLogs[logIndex] = {
      ...log,
      ...updates,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      log: workoutLogs[logIndex]
    });
  } catch (error) {
    console.error('Update workout log error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteWorkoutLog = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const logIndex = workoutLogs.findIndex(l => l.id === id);
    if (logIndex === -1) {
      return res.status(404).json({ success: false, message: 'Workout log not found' });
    }

    const log = workoutLogs[logIndex];

    if (req.user?.id !== log.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    workoutLogs.splice(logIndex, 1);

    res.json({
      success: true,
      message: 'Workout log deleted successfully'
    });
  } catch (error) {
    console.error('Delete workout log error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getLeaderboard = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { gymId, workoutId, period = 'all', limit = '10' } = req.query;

    let filteredLogs = workoutLogs.filter(l => l.gymId === gymId);

    if (workoutId) {
      filteredLogs = filteredLogs.filter(l => l.workoutId === workoutId);
    }

    if (period !== 'all') {
      const now = new Date();
      let startDate: Date;

      switch (period) {
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'year':
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(0);
      }

      filteredLogs = filteredLogs.filter(l => l.completedAt >= startDate);
    }

    const userBestScores = new Map<string, { userId: string; bestScore: number; log: WorkoutLog }>();

    filteredLogs.forEach(log => {
      if (log.score) {
        const existing = userBestScores.get(log.userId);
        if (!existing || log.score > existing.bestScore) {
          userBestScores.set(log.userId, {
            userId: log.userId,
            bestScore: log.score,
            log
          });
        }
      }
    });

    const leaderboard = Array.from(userBestScores.values())
      .sort((a, b) => b.bestScore - a.bestScore)
      .slice(0, parseInt(limit as string))
      .map((entry, index) => ({
        rank: index + 1,
        userId: entry.userId,
        score: entry.bestScore,
        completedAt: entry.log.completedAt,
        workoutId: entry.log.workoutId
      }));

    res.json({
      success: true,
      leaderboard
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
