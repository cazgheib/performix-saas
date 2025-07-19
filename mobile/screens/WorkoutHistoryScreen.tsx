import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SPACING } from '../constants/config';

interface WorkoutHistoryScreenProps {
  navigation: any;
}

interface WorkoutLogItem {
  id: string;
  workoutName: string;
  date: string;
  score: string;
  scoreType: 'time' | 'reps' | 'weight';
  isPersonalRecord: boolean;
  notes?: string;
}

const WorkoutHistoryScreen: React.FC<WorkoutHistoryScreenProps> = ({ navigation }) => {
  const [filter, setFilter] = useState<'all' | 'prs'>('all');

  const mockWorkoutLogs: WorkoutLogItem[] = [
    {
      id: '1',
      workoutName: 'Fran',
      date: 'Today',
      score: '8:45',
      scoreType: 'time',
      isPersonalRecord: true,
      notes: 'Felt great today! New PR!',
    },
    {
      id: '2',
      workoutName: 'Deadlift 1RM',
      date: 'Yesterday',
      score: '315 lb',
      scoreType: 'weight',
      isPersonalRecord: false,
    },
    {
      id: '3',
      workoutName: 'Cindy',
      date: '2 days ago',
      score: '18 rounds',
      scoreType: 'reps',
      isPersonalRecord: false,
      notes: 'Scaled pull-ups with band',
    },
    {
      id: '4',
      workoutName: 'Grace',
      date: '3 days ago',
      score: '4:32',
      scoreType: 'time',
      isPersonalRecord: true,
    },
  ];

  const filteredLogs = filter === 'prs' 
    ? mockWorkoutLogs.filter(log => log.isPersonalRecord)
    : mockWorkoutLogs;

  const renderWorkoutLog = ({ item }: { item: WorkoutLogItem }) => (
    <TouchableOpacity
      style={styles.logCard}
      onPress={() => navigation.navigate('WorkoutViewer', { workoutId: item.id })}
    >
      <View style={styles.logHeader}>
        <Text style={styles.workoutName}>{item.workoutName}</Text>
        <Text style={styles.logDate}>{item.date}</Text>
      </View>
      
      <View style={styles.logDetails}>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{item.score}</Text>
          {item.isPersonalRecord && (
            <View style={styles.prBadge}>
              <Text style={styles.prText}>PR</Text>
            </View>
          )}
        </View>
        
        {item.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            {item.notes}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workout History</Text>
        <View style={styles.filterToggle}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'prs' && styles.activeFilter]}
            onPress={() => setFilter('prs')}
          >
            <Text style={[styles.filterText, filter === 'prs' && styles.activeFilterText]}>
              PRs
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <FlatList
          data={filteredLogs}
          renderItem={renderWorkoutLog}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.logsList}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                {filter === 'prs' ? 'No personal records yet' : 'No workouts logged yet'}
              </Text>
              <Text style={styles.emptySubtext}>
                Start logging your workouts to track your progress!
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  filterToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 2,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 6,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  activeFilterText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  logsList: {
    padding: SPACING.lg,
  },
  logCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  logDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  logDetails: {
    gap: SPACING.sm,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  prBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  prText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  notes: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default WorkoutHistoryScreen;
