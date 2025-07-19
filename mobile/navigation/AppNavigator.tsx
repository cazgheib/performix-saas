import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AdminDashboard from '../screens/AdminDashboard';
import CoachDashboard from '../screens/CoachDashboard';
import AthleteDashboard from '../screens/AthleteDashboard';
import GymSetupScreen from '../screens/GymSetupScreen';
import ClassScheduleScreen from '../screens/ClassScheduleScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const MainTabs = () => {
  const { user } = useAuth();

  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'admin':
        return AdminDashboard;
      case 'coach':
        return CoachDashboard;
      case 'athlete':
        return AthleteDashboard;
      default:
        return AthleteDashboard;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e8ecf0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#6c5ce7',
        tabBarInactiveTintColor: '#7f8c8d',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={getDashboardComponent()}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Classes" 
        component={ClassScheduleScreen}
        options={{
          tabBarLabel: 'Classes',
        }}
      />
      <Tab.Screen 
        name="Workouts" 
        component={WorkoutScreen}
        options={{
          tabBarLabel: 'Workouts',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="GymSetup" component={GymSetupScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
