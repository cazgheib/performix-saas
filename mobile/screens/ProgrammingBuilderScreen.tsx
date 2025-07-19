import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SPACING } from '../constants/config';

interface ProgrammingBuilderScreenProps {
  navigation: any;
}

const ProgrammingBuilderScreen: React.FC<ProgrammingBuilderScreenProps> = ({ navigation }) => {
  const [workoutData, setWorkoutData] = useState({
    name: '',
    description: '',
    type: 'For Time',
    difficulty: 'Beginner',
    estimatedDuration: '',
    instructions: '',
    movements: [{ id: '1', name: '', weight: '', reps: '', description: '' }],
  });

  const addMovement = () => {
    const newMovement = {
      id: Date.now().toString(),
      name: '',
      weight: '',
      reps: '',
      description: '',
    };
    setWorkoutData(prev => ({
      ...prev,
      movements: [...prev.movements, newMovement],
    }));
  };

  const removeMovement = (id: string) => {
    setWorkoutData(prev => ({
      ...prev,
      movements: prev.movements.filter(m => m.id !== id),
    }));
  };

  const updateMovement = (id: string, field: string, value: string) => {
    setWorkoutData(prev => ({
      ...prev,
      movements: prev.movements.map(m => 
        m.id === id ? { ...m, [field]: value } : m
      ),
    }));
  };

  const handleSave = async () => {
    if (!workoutData.name || !workoutData.description) {
      Alert.alert('Error', 'Please fill in workout name and description');
      return;
    }

    if (workoutData.movements.some(m => !m.name)) {
      Alert.alert('Error', 'Please fill in all movement names');
      return;
    }

    try {
      console.log('Saving workout:', workoutData);
      Alert.alert('Success', 'Workout saved successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save workout');
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
        <Text style={styles.headerTitle}>Create Workout</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Workout Name *</Text>
            <TextInput
              style={styles.input}
              value={workoutData.name}
              onChangeText={(value) => setWorkoutData(prev => ({ ...prev, name: value }))}
              placeholder="e.g., Fran, Grace, Custom WOD"
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={workoutData.description}
              onChangeText={(value) => setWorkoutData(prev => ({ ...prev, description: value }))}
              placeholder="Brief description of the workout"
              placeholderTextColor={COLORS.textSecondary}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.flex1]}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerText}>{workoutData.type}</Text>
              </View>
            </View>
            <View style={[styles.inputContainer, styles.flex1]}>
              <Text style={styles.label}>Difficulty</Text>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerText}>{workoutData.difficulty}</Text>
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Estimated Duration</Text>
            <TextInput
              style={styles.input}
              value={workoutData.estimatedDuration}
              onChangeText={(value) => setWorkoutData(prev => ({ ...prev, estimatedDuration: value }))}
              placeholder="e.g., 15-20 minutes"
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Instructions</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={workoutData.instructions}
              onChangeText={(value) => setWorkoutData(prev => ({ ...prev, instructions: value }))}
              placeholder="Detailed instructions for the workout..."
              placeholderTextColor={COLORS.textSecondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.movementsHeader}>
            <Text style={styles.sectionTitle}>Movements</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={addMovement}
            >
              <Text style={styles.addButtonText}>+ Add Movement</Text>
            </TouchableOpacity>
          </View>

          {workoutData.movements.map((movement, index) => (
            <View key={movement.id} style={styles.movementCard}>
              <View style={styles.movementHeader}>
                <Text style={styles.movementTitle}>Movement {index + 1}</Text>
                {workoutData.movements.length > 1 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeMovement(movement.id)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Movement Name *</Text>
                <TextInput
                  style={styles.input}
                  value={movement.name}
                  onChangeText={(value) => updateMovement(movement.id, 'name', value)}
                  placeholder="e.g., Thrusters, Pull-ups"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.flex1]}>
                  <Text style={styles.label}>Weight/Load</Text>
                  <TextInput
                    style={styles.input}
                    value={movement.weight}
                    onChangeText={(value) => updateMovement(movement.id, 'weight', value)}
                    placeholder="e.g., 95/65 lb"
                    placeholderTextColor={COLORS.textSecondary}
                  />
                </View>
                <View style={[styles.inputContainer, styles.flex1]}>
                  <Text style={styles.label}>Reps/Rounds</Text>
                  <TextInput
                    style={styles.input}
                    value={movement.reps}
                    onChangeText={(value) => updateMovement(movement.id, 'reps', value)}
                    placeholder="e.g., 21-15-9"
                    placeholderTextColor={COLORS.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.input}
                  value={movement.description}
                  onChangeText={(value) => updateMovement(movement.id, 'description', value)}
                  placeholder="Movement description or scaling options"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>
            </View>
          ))}
        </View>
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
  saveButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  saveButtonText: {
    color: COLORS.primary,
    fontSize: 16,
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
  inputContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  input: {
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    height: 80,
    paddingTop: SPACING.md,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  flex1: {
    flex: 1,
  },
  pickerContainer: {
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pickerText: {
    fontSize: 16,
    color: COLORS.text,
  },
  movementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  addButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  movementCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  movementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  movementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  removeButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  removeButtonText: {
    color: COLORS.error,
    fontSize: 14,
  },
});

export default ProgrammingBuilderScreen;
