import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SPACING } from '../constants/config';

interface ClassScheduleScreenProps {
  navigation: any;
}

interface ClassItem {
  id: string;
  name: string;
  time: string;
  coach: string;
  capacity: number;
  booked: number;
  status: 'available' | 'full' | 'waitlist';
}

const ClassScheduleScreen: React.FC<ClassScheduleScreenProps> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  const mockClasses: ClassItem[] = [
    {
      id: '1',
      name: 'CrossFit WOD',
      time: '9:00 AM',
      coach: 'John Smith',
      capacity: 15,
      booked: 12,
      status: 'available',
    },
    {
      id: '2',
      name: 'Strength Training',
      time: '11:00 AM',
      coach: 'Sarah Johnson',
      capacity: 12,
      booked: 12,
      status: 'full',
    },
    {
      id: '3',
      name: 'HIIT Cardio',
      time: '6:00 PM',
      coach: 'Mike Wilson',
      capacity: 20,
      booked: 18,
      status: 'available',
    },
    {
      id: '4',
      name: 'Yoga Flow',
      time: '7:30 PM',
      coach: 'Emma Davis',
      capacity: 15,
      booked: 15,
      status: 'waitlist',
    },
  ];

  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
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
        return 'Available';
      case 'full':
        return 'Full';
      case 'waitlist':
        return 'Waitlist';
      default:
        return 'Unknown';
    }
  };

  const renderClassItem = ({ item }: { item: ClassItem }) => (
    <TouchableOpacity
      style={styles.classCard}
      onPress={() => navigation.navigate('ClassDetail', { classId: item.id })}
    >
      <View style={styles.classHeader}>
        <Text style={styles.className}>{item.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <View style={styles.classDetails}>
        <Text style={styles.classTime}>{item.time}</Text>
        <Text style={styles.classCoach}>Coach: {item.coach}</Text>
        <Text style={styles.classCapacity}>
          {item.booked}/{item.capacity} booked
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderDateSelector = () => (
    <View style={styles.dateSelector}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {getWeekDates().map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          return (
            <TouchableOpacity
              key={index}
              style={[styles.dateItem, isSelected && styles.selectedDateItem]}
              onPress={() => setSelectedDate(date)}
            >
              <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
                {formatDate(date)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Class Schedule</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'week' && styles.activeToggle]}
            onPress={() => setViewMode('week')}
          >
            <Text style={[styles.toggleText, viewMode === 'week' && styles.activeToggleText]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'day' && styles.activeToggle]}
            onPress={() => setViewMode('day')}
          >
            <Text style={[styles.toggleText, viewMode === 'day' && styles.activeToggleText]}>
              Day
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderDateSelector()}

      <View style={styles.content}>
        <FlatList
          data={mockClasses}
          renderItem={renderClassItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.classList}
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
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 2,
  },
  toggleButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  activeToggleText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  dateSelector: {
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dateItem: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.xs,
    borderRadius: 8,
  },
  selectedDateItem: {
    backgroundColor: COLORS.primary,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  selectedDateText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  classList: {
    padding: SPACING.lg,
  },
  classCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
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
  classDetails: {
    gap: SPACING.xs,
  },
  classTime: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
  },
  classCoach: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  classCapacity: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default ClassScheduleScreen;
