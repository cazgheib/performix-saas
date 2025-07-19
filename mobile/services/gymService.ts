import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

interface CreateGymRequest {
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  description?: string;
  subscriptionPlan: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

interface Gym {
  id: string;
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  description?: string;
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  subscriptionPlan: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export const gymService = {
  async createGym(gymData: CreateGymRequest, token: string): Promise<Gym> {
    const response = await axios.post(`${API_BASE_URL}/gyms`, gymData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async getGym(gymId: string, token: string): Promise<Gym> {
    const response = await axios.get(`${API_BASE_URL}/gyms/${gymId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async updateGym(gymId: string, gymData: Partial<CreateGymRequest>, token: string): Promise<Gym> {
    const response = await axios.put(`${API_BASE_URL}/gyms/${gymId}`, gymData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async getGymStats(gymId: string, token: string): Promise<any> {
    const response = await axios.get(`${API_BASE_URL}/gyms/${gymId}/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
