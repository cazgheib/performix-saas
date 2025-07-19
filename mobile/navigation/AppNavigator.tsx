import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import HomeScreen from '../screens/HomeScreen';
import GymSetupScreen from '../screens/GymSetupScreen';
import ClassScheduleScreen from '../screens/ClassScheduleScreen';
import ClassDetailScreen from '../screens/ClassDetailScreen';
import BookingScreen from '../screens/BookingScreen';
import WorkoutViewerScreen from '../screens/WorkoutViewerScreen';
import WorkoutHistoryScreen from '../screens/WorkoutHistoryScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ProgrammingBuilderScreen from '../screens/ProgrammingBuilderScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import UserManagementScreen from '../screens/UserManagementScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import GymProfileSettingsScreen from '../screens/GymProfileSettingsScreen';
import NotificationsCenterScreen from '../screens/NotificationsCenterScreen';
import AnalyticsReportsScreen from '../screens/AnalyticsReportsScreen';
import SupportFeedbackScreen from '../screens/SupportFeedbackScreen';

import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#1a1a1a',
        borderTopColor: '#333',
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#8E8E93',
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
      }}
    />
    <Tab.Screen 
      name="Schedule" 
      component={ClassScheduleScreen}
      options={{
        tabBarLabel: 'Schedule',
      }}
    />
    <Tab.Screen 
      name="Workouts" 
      component={WorkoutHistoryScreen}
      options={{
        tabBarLabel: 'Workouts',
      }}
    />
    <Tab.Screen 
      name="Leaderboard" 
      component={LeaderboardScreen}
      options={{
        tabBarLabel: 'Leaderboard',
      }}
    />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="MainTabs" 
      component={MainTabs} 
      options={{ headerShown: false }}
    />
    <Stack.Screen name="GymSetup" component={GymSetupScreen} />
    <Stack.Screen name="ClassDetail" component={ClassDetailScreen} />
    <Stack.Screen name="Booking" component={BookingScreen} />
    <Stack.Screen name="WorkoutViewer" component={WorkoutViewerScreen} />
    <Stack.Screen name="ProgrammingBuilder" component={ProgrammingBuilderScreen} />
    <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
    <Stack.Screen name="UserManagement" component={UserManagementScreen} />
    <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
    <Stack.Screen name="GymProfileSettings" component={GymProfileSettingsScreen} />
    <Stack.Screen name="NotificationsCenter" component={NotificationsCenterScreen} />
    <Stack.Screen name="AnalyticsReports" component={AnalyticsReportsScreen} />
    <Stack.Screen name="SupportFeedback" component={SupportFeedbackScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
