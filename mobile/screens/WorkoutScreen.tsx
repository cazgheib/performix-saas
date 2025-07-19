import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

const WorkoutScreen = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('Today');

  const tabs = ['Today', 'Programs', 'History'];

  const todayWorkout = {
    name: 'Strength & Power',
    description: 'Build strength and explosive power with this comprehensive workout',
    estimatedTime: '45 min',
    difficulty: 'Intermediate',
    movements: [
      { name: 'Deadlifts', sets: 5, reps: 5, weight: '185 lbs' },
      { name: 'Box Jumps', sets: 4, reps: 10, height: '24 inches' },
      { name: 'Pull-ups', sets: 3, reps: 8, weight: 'Bodyweight' },
      { name: 'Push Press', sets: 4, reps: 6, weight: '135 lbs' },
    ]
  };

  const programs = [
    { id: 1, name: 'Beginner Strength', weeks: 8, difficulty: 'Beginner' },
    { id: 2, name: 'CrossFit Endurance', weeks: 12, difficulty: 'Advanced' },
    { id: 3, name: 'Powerlifting Prep', weeks: 16, difficulty: 'Intermediate' },
  ];

  const history = [
    { date: 'Yesterday', workout: 'Cardio Blast', duration: '30 min', completed: true },
    { date: '2 days ago', workout: 'Upper Body', duration: '45 min', completed: true },
    { date: '3 days ago', workout: 'Leg Day', duration: '50 min', completed: false },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#27ae60';
      case 'Intermediate': return '#f39c12';
      case 'Advanced': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const renderTodayWorkout = () => (
    <View style={styles.workoutContainer}>
      <View style={styles.workoutHeader}>
        <Text style={styles.workoutName}>{todayWorkout.name}</Text>
        <View style={[styles.difficultyTag, { backgroundColor: getDifficultyColor(todayWorkout.difficulty) }]}>
          <Text style={styles.difficultyText}>{todayWorkout.difficulty}</Text>
        </View>
      </View>
      
      <Text style={styles.workoutDescription}>{todayWorkout.description}</Text>
      
      <View style={styles.workoutMeta}>
        <Text style={styles.metaText}>⏱️ {todayWorkout.estimatedTime}</Text>
        <Text style={styles.metaText}>💪 {todayWorkout.movements.length} exercises</Text>
      </View>

      <View style={styles.movementsContainer}>
        <Text style={styles.movementsTitle}>Movements</Text>
        {todayWorkout.movements.map((movement, index) => (
          <View key={index} style={styles.movementCard}>
            <Text style={styles.movementName}>{movement.name}</Text>
            <Text style={styles.movementDetails}>
              {movement.sets} sets × {movement.reps} reps @ {movement.weight}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Workout</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPrograms = () => (
    <View style={styles.programsContainer}>
      {programs.map((program) => (
        <View key={program.id} style={styles.programCard}>
          <Text style={styles.programName}>{program.name}</Text>
          <Text style={styles.programWeeks}>{program.weeks} weeks</Text>
          <View style={[styles.difficultyTag, { backgroundColor: getDifficultyColor(program.difficulty) }]}>
            <Text style={styles.difficultyText}>{program.difficulty}</Text>
          </View>
          <TouchableOpacity style={styles.programButton}>
            <Text style={styles.programButtonText}>View Program</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderHistory = () => (
    <View style={styles.historyContainer}>
      {history.map((item, index) => (
        <View key={index} style={styles.historyCard}>
          <View style={styles.historyInfo}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Text style={styles.historyWorkout}>{item.workout}</Text>
            <Text style={styles.historyDuration}>{item.duration}</Text>
          </View>
          <View style={[styles.completionStatus, { backgroundColor: item.completed ? '#27ae60' : '#e74c3c' }]}>
            <Text style={styles.completionText}>{item.completed ? '✓' : '✗'}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workouts</Text>
        <Text style={styles.subtitle}>Train hard, stay consistent</Text>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.tabActive]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {selectedTab === 'Today' && renderTodayWorkout()}
        {selectedTab === 'Programs' && renderPrograms()}
        {selectedTab === 'History' && renderHistory()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fd79a8',
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: '#fd79a8',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7f8c8d',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  workoutContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  workoutName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    flex: 1,
  },
  difficultyTag: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  workoutDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    lineHeight: 24,
  },
  workoutMeta: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  metaText: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  movementsContainer: {
    marginBottom: 25,
  },
  movementsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  movementCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#fd79a8',
  },
  movementName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  movementDetails: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  startButton: {
    backgroundColor: '#fd79a8',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#fd79a8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  programsContainer: {
    paddingBottom: 20,
  },
  programCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  programName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  programWeeks: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  programButton: {
    backgroundColor: '#fd79a8',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  programButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  historyContainer: {
    paddingBottom: 20,
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  historyWorkout: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  historyDuration: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  completionStatus: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutScreen;
