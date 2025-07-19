import React from 'react';
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

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();

  const renderAdminDashboard = () => (
    <View style={styles.dashboardContainer}>
      <Text style={styles.welcomeText}>Welcome back, {user?.firstName}!</Text>
      <Text style={styles.roleText}>Gym Administrator</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Total Members</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Active Classes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>85%</Text>
          <Text style={styles.statLabel}>Attendance Rate</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('UserManagement')}
        >
          <Text style={styles.actionButtonText}>Manage Members</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Schedule')}
        >
          <Text style={styles.actionButtonText}>Class Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('ProgrammingBuilder')}
        >
          <Text style={styles.actionButtonText}>Create Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCoachDashboard = () => (
    <View style={styles.dashboardContainer}>
      <Text style={styles.welcomeText}>Welcome back, Coach {user?.firstName}!</Text>
      <Text style={styles.roleText}>Coach</Text>

      <View style={styles.todayClasses}>
        <Text style={styles.sectionTitle}>Today's Classes</Text>
        <View style={styles.classCard}>
          <Text style={styles.classTime}>9:00 AM</Text>
          <Text style={styles.className}>CrossFit WOD</Text>
          <Text style={styles.classCapacity}>12/15 booked</Text>
        </View>
        <View style={styles.classCard}>
          <Text style={styles.classTime}>6:00 PM</Text>
          <Text style={styles.className}>Strength Training</Text>
          <Text style={styles.classCapacity}>8/12 booked</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('ProgrammingBuilder')}
        >
          <Text style={styles.actionButtonText}>Create Programming</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Schedule')}
        >
          <Text style={styles.actionButtonText}>View Schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAthleteDashboard = () => (
    <View style={styles.dashboardContainer}>
      <Text style={styles.welcomeText}>Welcome back, {user?.firstName}!</Text>
      <Text style={styles.roleText}>Athlete</Text>

      <View style={styles.progressContainer}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>Workouts This Week</Text>
          <Text style={styles.progressValue}>4/5</Text>
        </View>
        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>Personal Records</Text>
          <Text style={styles.progressValue}>2 New PRs</Text>
        </View>
      </View>

      <View style={styles.upcomingClasses}>
        <Text style={styles.sectionTitle}>Upcoming Classes</Text>
        <View style={styles.classCard}>
          <Text style={styles.classTime}>Tomorrow 9:00 AM</Text>
          <Text style={styles.className}>CrossFit WOD</Text>
          <Text style={styles.classStatus}>Booked</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Schedule')}
        >
          <Text style={styles.actionButtonText}>Book Classes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Workouts')}
        >
          <Text style={styles.actionButtonText}>Log Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return renderAdminDashboard();
      case 'coach':
        return renderCoachDashboard();
      case 'athlete':
        return renderAthleteDashboard();
      default:
        return renderAthleteDashboard();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Performix</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderDashboard()}
      </ScrollView>
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
    color: COLORS.primary,
  },
  logoutButton: {
    padding: SPACING.sm,
  },
  logoutText: {
    color: COLORS.error,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  dashboardContainer: {
    padding: SPACING.lg,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  roleText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  quickActions: {
    marginBottom: SPACING.xl,
  },
  actionButton: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
  },
  todayClasses: {
    marginBottom: SPACING.xl,
  },
  classCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  classTime: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  className: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
    marginVertical: SPACING.xs,
  },
  classCapacity: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  classStatus: {
    fontSize: 14,
    color: COLORS.success,
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: SPACING.xl,
  },
  progressCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  progressLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  progressValue: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  upcomingClasses: {
    marginBottom: SPACING.xl,
  },
});

export default HomeScreen;
