import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

const AthleteDashboard = () => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Athlete Dashboard</Text>
        <Text style={styles.subtitle}>Ready to crush it, {user?.name}?</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Workout</Text>
        <View style={styles.workoutCard}>
          <Text style={styles.workoutName}>Strength & Conditioning</Text>
          <Text style={styles.workoutDescription}>
            5 rounds for time: 10 burpees, 15 squats, 20 push-ups
          </Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Classes</Text>
        <View style={styles.classCard}>
          <Text style={styles.className}>CrossFit WOD</Text>
          <Text style={styles.classTime}>Tomorrow, 6:00 PM</Text>
          <Text style={styles.classStatus}>Booked</Text>
        </View>
        
        <View style={styles.classCard}>
          <Text style={styles.className}>Yoga Flow</Text>
          <Text style={styles.classTime}>Wednesday, 7:00 AM</Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>PRs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>92%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
        </View>
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
    backgroundColor: '#ff6b6b',
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
  statsSection: {
    padding: 25,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  workoutCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#ff6b6b',
  },
  workoutName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 10,
  },
  workoutDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  classCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  classTime: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  classStatus: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '500',
    backgroundColor: '#d5f4e6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bookButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ff6b6b',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
});

export default AthleteDashboard;
