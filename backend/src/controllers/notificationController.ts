import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../middleware/auth';
import { Notification, CreateNotificationInput } from '../models/Notification';

const notifications: Notification[] = [];

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, isRead, type } = req.query;

    let filteredNotifications = notifications.filter(n => n.gymId === req.user?.gymId);

    if (req.user?.role === 'athlete') {
      filteredNotifications = filteredNotifications.filter(n => n.userId === req.user?.id);
    } else if (userId) {
      filteredNotifications = filteredNotifications.filter(n => n.userId === userId);
    }

    if (isRead !== undefined) {
      filteredNotifications = filteredNotifications.filter(n => n.isRead === (isRead === 'true'));
    }

    if (type) {
      filteredNotifications = filteredNotifications.filter(n => n.type === type);
    }

    filteredNotifications.sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());

    res.json({
      success: true,
      notifications: filteredNotifications
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createNotification = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { userId, gymId, type, title, message, data } = req.body;

    const newNotification: Notification = {
      id: uuidv4(),
      userId,
      gymId,
      type,
      title,
      message,
      data,
      isRead: false,
      sentAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    notifications.push(newNotification);

    console.log(`Push notification sent to user ${userId}: ${title}`);

    res.status(201).json({
      success: true,
      notification: newNotification
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const notificationIndex = notifications.findIndex(n => n.id === id);
    if (notificationIndex === -1) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    const notification = notifications[notificationIndex];

    if (req.user?.id !== notification.userId && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    notifications[notificationIndex] = {
      ...notification,
      isRead: true,
      readAt: new Date(),
      updatedAt: new Date()
    };

    res.json({
      success: true,
      notification: notifications[notificationIndex]
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteNotification = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const notificationIndex = notifications.findIndex(n => n.id === id);
    if (notificationIndex === -1) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    const notification = notifications[notificationIndex];

    if (req.user?.id !== notification.userId && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    notifications.splice(notificationIndex, 1);

    res.json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
