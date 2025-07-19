import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../middleware/auth';
import { Class, CreateClassInput } from '../models/Class';

const classes: Class[] = [];

export const getClasses = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { gymId, date, coachId } = req.query;

    let filteredClasses = classes.filter(c => c.gymId === gymId && c.isActive);

    if (date) {
      const filterDate = new Date(date as string);
      filteredClasses = filteredClasses.filter(c => 
        c.date.toDateString() === filterDate.toDateString()
      );
    }

    if (coachId) {
      filteredClasses = filteredClasses.filter(c => c.coachId === coachId);
    }

    filteredClasses.sort((a, b) => {
      const dateCompare = a.date.getTime() - b.date.getTime();
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    });

    res.json({
      success: true,
      classes: filteredClasses
    });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createClass = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      gymId, name, description, coachId, workoutId,
      date, startTime, endTime, maxCapacity
    } = req.body;

    const newClass: Class = {
      id: uuidv4(),
      gymId,
      name,
      description,
      coachId,
      workoutId,
      date: new Date(date),
      startTime,
      endTime,
      maxCapacity,
      currentBookings: 0,
      waitlistCount: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    classes.push(newClass);

    res.status(201).json({
      success: true,
      class: newClass
    });
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getClassDetails = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const classDetails = classes.find(c => c.id === id);
    if (!classDetails) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    if (req.user?.gymId !== classDetails.gymId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({
      success: true,
      class: classDetails
    });
  } catch (error) {
    console.error('Get class details error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateClass = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.params;
    const updates = req.body;

    const classIndex = classes.findIndex(c => c.id === id);
    if (classIndex === -1) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    if (req.user?.gymId !== classes[classIndex].gymId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (updates.date) {
      updates.date = new Date(updates.date);
    }

    classes[classIndex] = {
      ...classes[classIndex],
      ...updates,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      class: classes[classIndex]
    });
  } catch (error) {
    console.error('Update class error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteClass = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const classIndex = classes.findIndex(c => c.id === id);
    if (classIndex === -1) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    if (req.user?.gymId !== classes[classIndex].gymId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    classes[classIndex].isActive = false;
    classes[classIndex].updatedAt = new Date();

    res.json({
      success: true,
      message: 'Class deleted successfully'
    });
  } catch (error) {
    console.error('Delete class error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
