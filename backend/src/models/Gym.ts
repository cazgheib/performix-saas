export interface Gym {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGymRequest {
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
