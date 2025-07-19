import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

const ClassScheduleScreen = () => {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState('Today');

  const days = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const classes = [
    {
      id: 1,
      name: 'Morning CrossFit',
      time: '6:00 AM',
      duration: '60 min',
      coach: 'Sarah Johnson',
      capacity: '12/15',
      type: 'CrossFit',
      status: 'available'
    },
    {
      id: 2,
      name: 'Strength Training',
      time: '9:00 AM',
      duration: '45 min',
      coach: 'Mike Chen',
      capacity: '8/10',
      type: 'Strength',
      status: 'available'
    },
    {
      id: 3,
      name: 'HIIT Cardio',
      time: '12:00 PM',
      duration: '30 min',
      coach: 'Emma Davis',
      capacity: '15/15',
      type: 'HIIT',
      status: 'full'
    },
    {
      id: 4,
      name: 'Evening Yoga',
      time: '6:00 PM',
      duration: '60 min',
      coach: 'Lisa Park',
      capacity: '6/12',
      type: 'Yoga',
      status: 'available'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#27ae60';
      case 'full': return '#e74c3c';
      case 'waitlist': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CrossFit': return '#e74c3c';
      case 'Strength': return '#3498db';
      case 'HIIT': return '#f39c12';
      case 'Yoga': return '#9b59b6';
      default: return '#95a5a6';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Class Schedule</Text>
        <Text style={styles.subtitle}>Book your next workout</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daySelector}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayButton, selectedDay === day && styles.dayButtonActive]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.classList}>
        {classes.map((classItem) => (
          <View key={classItem.id} style={styles.classCard}>
            <View style={styles.classHeader}>
              <View style={styles.classInfo}>
                <Text style={styles.className}>{classItem.name}</Text>
                <Text style={styles.classCoach}>with {classItem.coach}</Text>
              </View>
              <View style={[styles.typeTag, { backgroundColor: getTypeColor(classItem.type) }]}>
                <Text style={styles.typeText}>{classItem.type}</Text>
              </View>
            </View>

            <View style={styles.classDetails}>
              <View style={styles.timeInfo}>
                <Text style={styles.classTime}>{classItem.time}</Text>
                <Text style={styles.classDuration}>{classItem.duration}</Text>
              </View>
              
              <View style={styles.capacityInfo}>
                <Text style={styles.capacityText}>{classItem.capacity}</Text>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(classItem.status) }]} />
              </View>
            </View>

            <TouchableOpacity 
              style={[
                styles.bookButton,
                classItem.status === 'full' && styles.bookButtonDisabled
              ]}
              disabled={classItem.status === 'full'}
            >
              <Text style={[
                styles.bookButtonText,
                classItem.status === 'full' && styles.bookButtonTextDisabled
              ]}>
                {classItem.status === 'full' ? 'Class Full' : 'Book Now'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
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
    backgroundColor: '#74b9ff',
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
  daySelector: {
    padding: 20,
    paddingBottom: 10,
  },
  dayButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e8ecf0',
  },
  dayButtonActive: {
    backgroundColor: '#74b9ff',
    borderColor: '#74b9ff',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  dayTextActive: {
    color: '#fff',
  },
  classList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  classCard: {
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
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  classCoach: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '400',
  },
  typeTag: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  classDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeInfo: {
    flex: 1,
  },
  classTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  classDuration: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  capacityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  capacityText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bookButton: {
    backgroundColor: '#74b9ff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  bookButtonTextDisabled: {
    color: '#7f8c8d',
  },
});

export default ClassScheduleScreen;
