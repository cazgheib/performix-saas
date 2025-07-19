import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SPACING } from '../constants/config';

interface BookingScreenProps {
  navigation: any;
  route: any;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ navigation, route }) => {
  const { classId } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const classData = {
    id: classId,
    name: 'CrossFit WOD',
    date: 'Tomorrow',
    time: '9:00 AM - 10:00 AM',
    coach: 'John Smith',
    capacity: 15,
    booked: 12,
    price: 25,
  };

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      Alert.alert('Success', 'Class booked successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to book class. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
        <Text style={styles.headerTitle}>Confirm Booking</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.bookingCard}>
          <Text style={styles.className}>{classData.name}</Text>
          <Text style={styles.classDetails}>{classData.date} • {classData.time}</Text>
          <Text style={styles.classCoach}>Coach: {classData.coach}</Text>
          
          <View style={styles.capacityInfo}>
            <Text style={styles.capacityText}>
              {classData.capacity - classData.booked} spots remaining
            </Text>
            <Text style={styles.priceText}>${classData.price}</Text>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsTitle}>Booking Terms</Text>
          <Text style={styles.termsText}>
            • Cancellation allowed up to 2 hours before class
          </Text>
          <Text style={styles.termsText}>
            • Late cancellations may result in a fee
          </Text>
          <Text style={styles.termsText}>
            • Please arrive 10 minutes early
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmButton, isLoading && styles.disabledButton]}
          onPress={handleConfirmBooking}
          disabled={isLoading}
        >
          <Text style={styles.confirmButtonText}>
            {isLoading ? 'Booking...' : 'Confirm Booking'}
          </Text>
        </TouchableOpacity>
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
    padding: SPACING.lg,
  },
  bookingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  className: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  classDetails: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  classCoach: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  capacityInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  capacityText: {
    fontSize: 14,
    color: COLORS.success,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  termsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  termsText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    lineHeight: 20,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  confirmButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default BookingScreen;
