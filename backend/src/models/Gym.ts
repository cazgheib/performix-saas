export interface Gym {
  id: string;
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
  description?: string;
  subscriptionStatus: 'active' | 'inactive' | 'trial' | 'cancelled';
  subscriptionPlan: 'basic' | 'premium' | 'enterprise';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGymInput {
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
  description?: string;
  subscriptionPlan: 'basic' | 'premium' | 'enterprise';
}

export interface UpdateGymInput {
  name?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  subscriptionPlan?: 'basic' | 'premium' | 'enterprise';
}
