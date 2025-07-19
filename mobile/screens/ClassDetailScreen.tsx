import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SPACING } from '../constants/config';

interface ClassDetailScreenProps {
  navigation: any;
  route: any;
}

const ClassDetailScreen: React.FC<ClassDetailScreenProps> = ({ navigation, route }) => {
  const { classId } = route.params;
  const [isBooked, setIsBooked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const classData = {
    id: classId,
    name: 'CrossFit WOD',
    description: 'High-intensity functional fitness workout combining cardio, strength, and mobility.',
    date: 'Tomorrow',
    time: '9:00 AM - 10:00 AM',
    coach: {
      name: 'John Smith',
      bio: 'Certified CrossFit Level 2 trainer with 5+ years experience',
      image: null,
    },
    capacity: 15,
    booked: 12,
    waitlist: 3,
    status: 'available' as 'available' | 'full' | 'waitlist',
    workout: {
      name: 'Fran',
      description: '21-15-9 reps for time of Thrusters (95/65 lb) and Pull-ups',
      movements: ['Thrusters', 'Pull-ups'],
      duration: '8-15 minutes',
      difficulty: 'Intermediate',
    },
    attendees: [
      { id: '1', name: 'Sarah Johnson' },
      { id: '2', name: 'Mike Wilson' },
      { id: '3', name: 'Emma Davis' },
    ],
  };

  const handleBookClass = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      setIsBooked(true);
      Alert.alert('Success', 'Class booked successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to book class. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel your booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
              setIsBooked(false);
              Alert.alert('Success', 'Booking cancelled successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel booking. Please try again.');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return COLORS.success;
      case 'full':
        return COLORS.error;
      case 'waitlist':
        return COLORS.warning;
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Book Class';
      case 'full':
        return 'Full';
      case 'waitlist':
        return 'Join Waitlist';
      default:
        return 'Unknown';
    }
  };

  const renderBookingButton = () => {
    if (isBooked) {
      return (
        <TouchableOpacity
          style={[styles.bookButton, styles.cancelButton]}
          onPress={handleCancelBooking}
          disabled={isLoading}
        >
          <Text style={styles.cancelButtonText}>
            {isLoading ? 'Cancelling...' : 'Cancel Booking'}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.bookButton,
          classData.status === 'full' && styles.disabledButton,
        ]}
        onPress={handleBookClass}
        disabled={isLoading || classData.status === 'full'}
      >
        <Text style={styles.bookButtonText}>
          {isLoading ? 'Booking...' : getStatusText(classData.status)}
        </Text>
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.headerTitle}>Class Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.classInfo}>
          <View style={styles.classHeader}>
            <Text style={styles.className}>{classData.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(classData.status) }]}>
              <Text style={styles.statusText}>{classData.status.toUpperCase()}</Text>
            </View>
          </View>
          
          <Text style={styles.classDescription}>{classData.description}</Text>
          
          <View style={styles.classDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>{classData.date} • {classData.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Capacity</Text>
              <Text style={styles.detailValue}>
                {classData.booked}/{classData.capacity} booked
                {classData.waitlist > 0 && ` • ${classData.waitlist} on waitlist`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.coachInfo}>
          <Text style={styles.sectionTitle}>Coach</Text>
          <View style={styles.coachCard}>
            <View style={styles.coachAvatar}>
              <Text style={styles.coachInitials}>
                {classData.coach.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.coachDetails}>
              <Text style={styles.coachName}>{classData.coach.name}</Text>
              <Text style={styles.coachBio}>{classData.coach.bio}</Text>
            </View>
          </View>
        </View>

        <View style={styles.workoutInfo}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          <View style={styles.workoutCard}>
            <Text style={styles.workoutName}>{classData.workout.name}</Text>
            <Text style={styles.workoutDescription}>{classData.workout.description}</Text>
            
            <View style={styles.workoutDetails}>
              <View style={styles.workoutDetailItem}>
                <Text style={styles.workoutDetailLabel}>Duration</Text>
                <Text style={styles.workoutDetailValue}>{classData.workout.duration}</Text>
              </View>
              <View style={styles.workoutDetailItem}>
                <Text style={styles.workoutDetailLabel}>Difficulty</Text>
                <Text style={styles.workoutDetailValue}>{classData.workout.difficulty}</Text>
              </View>
            </View>

            <View style={styles.movements}>
              <Text style={styles.movementsTitle}>Movements</Text>
              {classData.workout.movements.map((movement, index) => (
                <Text key={index} style={styles.movementItem}>• {movement}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.attendeesInfo}>
          <Text style={styles.sectionTitle}>Attendees ({classData.attendees.length})</Text>
          <View style={styles.attendeesList}>
            {classData.attendees.map((attendee) => (
              <View key={attendee.id} style={styles.attendeeItem}>
                <View style={styles.attendeeAvatar}>
                  <Text style={styles.attendeeInitials}>
                    {attendee.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <Text style={styles.attendeeName}>{attendee.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {renderBookingButton()}
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
  content: {
    flex: 1,
  },
  classInfo: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  className: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  classDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  classDetails: {
    gap: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  coachInfo: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  coachCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  coachAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coachInitials: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  coachDetails: {
    flex: 1,
  },
  coachName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  coachBio: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  workoutInfo: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  workoutCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  workoutDescription: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: SPACING.md,
  },
  workoutDetails: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.md,
  },
  workoutDetailItem: {
    flex: 1,
  },
  workoutDetailLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  workoutDetailValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  movements: {
    marginTop: SPACING.md,
  },
  movementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  movementItem: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  attendeesInfo: {
    padding: SPACING.lg,
  },
  attendeesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  attendeeItem: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  attendeeAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  attendeeInitials: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  attendeeName: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  bookButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: COLORS.error,
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.6,
  },
});

export default ClassDetailScreen;
