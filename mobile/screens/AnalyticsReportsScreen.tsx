import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING } from '../constants/config';

interface AnalyticsReportsScreenProps {
  navigation: any;
}

const AnalyticsReportsScreen: React.FC<AnalyticsReportsScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  const mockAnalytics = {
    attendance: {
      total: 156,
      thisMonth: 45,
      lastMonth: 38,
      trend: '+18%',
    },
    classes: {
      total: 24,
      mostPopular: 'CrossFit WOD',
      averageCapacity: '85%',
    },
    workouts: {
      completed: 89,
      averageScore: '12:45',
      personalRecords: 23,
    },
    members: {
      total: 156,
      active: 134,
      newThisMonth: 12,
      retention: '92%',
    },
  };

  const renderAdminAnalytics = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gym Overview</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{mockAnalytics.members.total}</Text>
            <Text style={styles.statLabel}>Total Members</Text>
            <Text style={styles.statTrend}>+{mockAnalytics.members.newThisMonth} this month</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{mockAnalytics.members.active}</Text>
            <Text style={styles.statLabel}>Active Members</Text>
            <Text style={styles.statTrend}>{mockAnalytics.members.retention} retention</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{mockAnalytics.classes.total}</Text>
            <Text style={styles.statLabel}>Classes This Month</Text>
            <Text style={styles.statTrend}>{mockAnalytics.classes.averageCapacity} avg capacity</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{mockAnalytics.attendance.total}</Text>
            <Text style={styles.statLabel}>Total Attendance</Text>
            <Text style={styles.statTrend}>{mockAnalytics.attendance.trend} vs last month</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Class Performance</Text>
        
        <View style={styles.performanceCard}>
          <Text style={styles.performanceTitle}>Most Popular Class</Text>
          <Text style={styles.performanceValue}>{mockAnalytics.classes.mostPopular}</Text>
          <Text style={styles.performanceSubtext}>Average 12 attendees per session</Text>
        </View>
        
        <View style={styles.performanceCard}>
          <Text style={styles.performanceTitle}>Peak Hours</Text>
          <Text style={styles.performanceValue}>6:00 PM - 8:00 PM</Text>
          <Text style={styles.performanceSubtext}>65% of daily attendance</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Export Reports</Text>
        
        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportButtonText}>📊 Export Attendance Report</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportButtonText}>📈 Export Revenue Report</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportButtonText}>👥 Export Member Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderAthleteAnalytics = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{mockAnalytics.workouts.completed}</Text>
            <Text style={styles.statLabel}>Workouts Completed</Text>
            <Text style={styles.statTrend}>This month</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{mockAnalytics.workouts.personalRecords}</Text>
            <Text style={styles.statLabel}>Personal Records</Text>
            <Text style={styles.statTrend}>All time</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{mockAnalytics.attendance.thisMonth}</Text>
            <Text style={styles.statLabel}>Classes Attended</Text>
            <Text style={styles.statTrend}>This month</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{mockAnalytics.workouts.averageScore}</Text>
            <Text style={styles.statLabel}>Average Time</Text>
            <Text style={styles.statTrend}>For timed workouts</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        
        <View style={styles.achievementCard}>
          <Text style={styles.achievementIcon}>🏆</Text>
          <View style={styles.achievementContent}>
            <Text style={styles.achievementTitle}>New Deadlift PR!</Text>
            <Text style={styles.achievementDescription}>315 lb - 20 lb improvement</Text>
            <Text style={styles.achievementDate}>2 days ago</Text>
          </View>
        </View>
        
        <View style={styles.achievementCard}>
          <Text style={styles.achievementIcon}>🔥</Text>
          <View style={styles.achievementContent}>
            <Text style={styles.achievementTitle}>5-Day Streak</Text>
            <Text style={styles.achievementDescription}>Attended 5 classes in a row</Text>
            <Text style={styles.achievementDate}>1 week ago</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  if (user?.role !== 'admin' && user?.role !== 'coach') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Analytics</Text>
          <View style={styles.placeholder} />
        </View>

        {renderAthleteAnalytics()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics & Reports</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.periodSelector}>
        {(['week', 'month', 'year'] as const).map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.periodButton, period === p && styles.activePeriod]}
            onPress={() => setPeriod(p)}
          >
            <Text style={[
              styles.periodText,
              period === p && styles.activePeriodText
            ]}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderAdminAnalytics()}
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  placeholder: {
    width: 40,
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  periodButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  activePeriod: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  periodText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  activePeriodText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  statTrend: {
    fontSize: 12,
    color: COLORS.success,
    textAlign: 'center',
  },
  performanceCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  performanceSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  exportButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  exportButtonText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  achievementDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  achievementDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default AnalyticsReportsScreen;
