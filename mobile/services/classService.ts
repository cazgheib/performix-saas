const API_BASE_URL = 'http://localhost:3000';

export interface Class {
  id: string;
  name: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  maxCapacity: number;
  currentCapacity: number;
  coachId: string;
  gymId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClassRequest {
  name: string;
  description?: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  coachId: string;
}

export const classService = {
  async getClasses(token: string): Promise<Class[]> {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch classes');
    }

    return response.json();
  },

  async createClass(classData: CreateClassRequest, token: string): Promise<Class> {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    });

    if (!response.ok) {
      throw new Error('Failed to create class');
    }

    return response.json();
  },

  async getClass(classId: string, token: string): Promise<Class> {
    const response = await fetch(`${API_BASE_URL}/classes/${classId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch class');
    }

    return response.json();
  },

  async updateClass(classId: string, updates: Partial<CreateClassRequest>, token: string): Promise<Class> {
    const response = await fetch(`${API_BASE_URL}/classes/${classId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update class');
    }

    return response.json();
  },

  async deleteClass(classId: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/classes/${classId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete class');
    }
  },
};
