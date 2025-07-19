import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('admin'); // Default to admin for demo
  const [currentScreen, setCurrentScreen] = useState('auth');

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
    Alert.alert('Success', `Welcome to Performix! Logged in as ${userRole.toUpperCase()}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('auth');
    setEmail('');
    setPassword('');
  };

  const renderAuthScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Performix SaaS</Text>
        <Text style={styles.subtitle}>Classy Fitness Platform</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.switchButton} 
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchText}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>

        <View style={styles.roleSelector}>
          <Text style={styles.roleSelectorTitle}>Demo Role:</Text>
          <View style={styles.roleButtons}>
            {['admin', 'coach', 'athlete'].map((role) => (
              <TouchableOpacity
                key={role}
                style={[styles.roleButton, userRole === role && styles.roleButtonActive]}
                onPress={() => setUserRole(role)}
              >
                <Text style={[styles.roleButtonText, userRole === role && styles.roleButtonTextActive]}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <StatusBar style="light" />
    </View>
  );

  const renderDashboard = () => (
    <View style={styles.dashboardContainer}>
      <View style={styles.dashboardHeader}>
        <Text style={styles.dashboardTitle}>Performix Dashboard</Text>
        <Text style={styles.dashboardSubtitle}>{userRole.toUpperCase()} VIEW</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.dashboardContent}>
        {userRole === 'admin' && renderAdminDashboard()}
        {userRole === 'coach' && renderCoachDashboard()}
        {userRole === 'athlete' && renderAthleteDashboard()}
      </ScrollView>

      <StatusBar style="light" />
    </View>
  );

  const renderAdminDashboard = () => (
    <View style={styles.dashboardSection}>
      <Text style={styles.sectionTitle}>Admin Dashboard</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>247</Text>
          <Text style={styles.statLabel}>Total Members</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>89%</Text>
          <Text style={styles.statLabel}>Attendance Rate</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Weekly Bookings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Active Classes</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Manage Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Class Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Gym Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCoachDashboard = () => (
    <View style={styles.dashboardSection}>
      <Text style={styles.sectionTitle}>Coach Dashboard</Text>
      
      <View style={styles.coachSection}>
        <Text style={styles.subsectionTitle}>Today's Classes</Text>
        <View style={styles.classList}>
          <View style={styles.classItem}>
            <Text style={styles.classTime}>9:00 AM</Text>
            <Text style={styles.className}>CrossFit Fundamentals</Text>
            <Text style={styles.classCapacity}>12/15 booked</Text>
          </View>
          <View style={styles.classItem}>
            <Text style={styles.classTime}>6:00 PM</Text>
            <Text style={styles.className}>HIIT Training</Text>
            <Text style={styles.classCapacity}>8/12 booked</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Create Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Athletes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Class Management</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAthleteDashboard = () => (
    <View style={styles.dashboardSection}>
      <Text style={styles.sectionTitle}>Athlete Dashboard</Text>
      
      <View style={styles.athleteSection}>
        <Text style={styles.subsectionTitle}>This Week's Schedule</Text>
        <View style={styles.scheduleList}>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Today</Text>
            <Text style={styles.scheduleClass}>CrossFit WOD - 6:00 PM</Text>
            <Text style={styles.scheduleStatus}>Booked</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Tomorrow</Text>
            <Text style={styles.scheduleClass}>Yoga Flow - 7:00 AM</Text>
            <Text style={styles.scheduleStatus}>Available</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.subsectionTitle}>Recent Progress</Text>
        <View style={styles.progressCard}>
          <Text style={styles.progressMetric}>Deadlift PR: 225 lbs</Text>
          <Text style={styles.progressDate}>2 days ago</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Book Class</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Log Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return isAuthenticated ? renderDashboard() : renderAuthScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#f0f0f0',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  button: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '500',
  },
  roleSelector: {
    marginTop: 30,
    alignItems: 'center',
  },
  roleSelectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  roleButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#ffffff',
  },
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  dashboardHeader: {
    backgroundColor: '#667eea',
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  dashboardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  dashboardSubtitle: {
    fontSize: 16,
    color: '#e0e6ff',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  dashboardContent: {
    flex: 1,
    padding: 20,
  },
  dashboardSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  coachSection: {
    marginBottom: 30,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  classList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  classItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  classTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
    width: 80,
  },
  className: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 15,
  },
  classCapacity: {
    fontSize: 14,
    color: '#666',
  },
  athleteSection: {
    marginBottom: 30,
  },
  scheduleList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scheduleDay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
    width: 80,
  },
  scheduleClass: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 15,
  },
  scheduleStatus: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '600',
  },
  progressSection: {
    marginBottom: 30,
  },
  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressMetric: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  progressDate: {
    fontSize: 14,
    color: '#666',
  },
});
