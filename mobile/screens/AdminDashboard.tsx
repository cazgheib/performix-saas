import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { gymService } from '../services/gymService';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({
    memberCount: 0,
    weeklyBookings: 0,
    attendanceRate: 0,
    activeClasses: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      if (user?.gymId && token) {
        const gymStats = await gymService.getGymStats(user.gymId, token);
        setStats(gymStats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Welcome back, {user?.name}!</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.memberCount}</Text>
          <Text style={styles.statLabel}>Total Members</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.weeklyBookings}</Text>
          <Text style={styles.statLabel}>Weekly Bookings</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.attendanceRate}%</Text>
          <Text style={styles.statLabel}>Attendance Rate</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.activeClasses}</Text>
          <Text style={styles.statLabel}>Active Classes</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Manage Users</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Create Class</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Gym Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Reports</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    fontWeight: '300',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 25,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#007AFF',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actionsContainer: {
    padding: 25,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    letterSpacing: 0.3,
  },
});

export default AdminDashboard;
