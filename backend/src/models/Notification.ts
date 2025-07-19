export interface Notification {
  id: string;
  userId: string;
  gymId: string;
  type: 'class_reminder' | 'class_cancelled' | 'workout_assigned' | 'announcement' | 'booking_confirmed' | 'waitlist_promoted';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  sentAt: Date;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNotificationInput {
  userId: string;
  gymId: string;
  type: 'class_reminder' | 'class_cancelled' | 'workout_assigned' | 'announcement' | 'booking_confirmed' | 'waitlist_promoted';
  title: string;
  message: string;
  data?: Record<string, any>;
}

export interface UpdateNotificationInput {
  isRead?: boolean;
  readAt?: Date;
}
