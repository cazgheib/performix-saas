import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

const CoachDashboard = () => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coach Dashboard</Text>
        <Text style={styles.subtitle}>Welcome, Coach {user?.name}!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Classes</Text>
        <View style={styles.classCard}>
          <Text style={styles.className}>Morning CrossFit</Text>
          <Text style={styles.classTime}>9:00 AM - 10:00 AM</Text>
          <Text style={styles.classAttendees}>12/15 attendees</Text>
        </View>
        
        <View style={styles.classCard}>
          <Text style={styles.className}>Evening Strength</Text>
          <Text style={styles.classTime}>6:00 PM - 7:00 PM</Text>
          <Text style={styles.classAttendees}>8/12 attendees</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Create Workout</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Athletes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Class Schedule</Text>
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
    backgroundColor: '#667eea',
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
  section: {
    padding: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  classCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  className: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  classTime: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
    fontWeight: '400',
  },
  classAttendees: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e8ecf0',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    letterSpacing: 0.3,
  },
});

export default CoachDashboard;
