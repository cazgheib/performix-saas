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

interface WorkoutViewerScreenProps {
  navigation: any;
  route: any;
}

const WorkoutViewerScreen: React.FC<WorkoutViewerScreenProps> = ({ navigation, route }) => {
  const { workoutId } = route.params;
  const [isLogging, setIsLogging] = useState(false);
  const [logData, setLogData] = useState({
    score: '',
    notes: '',
    movements: [] as any[],
  });

  const workoutData = {
    id: workoutId,
    name: 'Fran',
    description: '21-15-9 reps for time',
    type: 'For Time',
    difficulty: 'Intermediate',
    estimatedDuration: '8-15 minutes',
    instructions: 'Complete all reps of thrusters, then all reps of pull-ups for each round. Scale as needed.',
    movements: [
      {
        id: '1',
        name: 'Thrusters',
        weight: '95/65 lb',
        reps: '21-15-9',
        description: 'Front squat to overhead press in one fluid movement',
      },
      {
        id: '2',
        name: 'Pull-ups',
        weight: 'Bodyweight',
        reps: '21-15-9',
        description: 'Chin over bar, full extension at bottom',
      },
    ],
    videoUrl: null,
    imageUrl: null,
  };

  const handleStartLogging = () => {
    setIsLogging(true);
    setLogData({
      score: '',
      notes: '',
      movements: workoutData.movements.map(m => ({
        id: m.id,
        name: m.name,
        weight: '',
        reps: '',
        notes: '',
      })),
    });
  };

  const handleSaveLog = async () => {
    if (!logData.score) {
      Alert.alert('Error', 'Please enter your score/time');
      return;
    }

    try {
      console.log('Saving workout log:', logData);
      Alert.alert('Success', 'Workout logged successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save workout log');
    }
  };

  const updateMovementLog = (movementId: string, field: string, value: string) => {
    setLogData(prev => ({
      ...prev,
      movements: prev.movements.map(m => 
        m.id === movementId ? { ...m, [field]: value } : m
      ),
    }));
  };

  const renderMovement = (movement: any, index: number) => (
    <View key={movement.id} style={styles.movementCard}>
      <View style={styles.movementHeader}>
        <Text style={styles.movementName}>{movement.name}</Text>
        <Text style={styles.movementReps}>{movement.reps}</Text>
      </View>
      <Text style={styles.movementWeight}>{movement.weight}</Text>
      <Text style={styles.movementDescription}>{movement.description}</Text>
      
      {isLogging && (
        <View style={styles.logInputs}>
          <View style={styles.logRow}>
            <View style={styles.logInput}>
              <Text style={styles.logLabel}>Weight Used</Text>
              <TextInput
                style={styles.input}
                value={logData.movements[index]?.weight || ''}
                onChangeText={(value) => updateMovementLog(movement.id, 'weight', value)}
                placeholder="e.g., 85 lb"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>
            <View style={styles.logInput}>
              <Text style={styles.logLabel}>Reps/Rounds</Text>
              <TextInput
                style={styles.input}
                value={logData.movements[index]?.reps || ''}
                onChangeText={(value) => updateMovementLog(movement.id, 'reps', value)}
                placeholder="e.g., 21-15-9"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>
          </View>
          <View style={styles.logInput}>
            <Text style={styles.logLabel}>Notes</Text>
            <TextInput
              style={styles.input}
              value={logData.movements[index]?.notes || ''}
              onChangeText={(value) => updateMovementLog(movement.id, 'notes', value)}
              placeholder="Any modifications or notes..."
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>
        </View>
      )}
    </View>
  );

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
        <Text style={styles.headerTitle}>Workout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.workoutHeader}>
          <Text style={styles.workoutName}>{workoutData.name}</Text>
          <Text style={styles.workoutDescription}>{workoutData.description}</Text>
          
          <View style={styles.workoutMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Type</Text>
              <Text style={styles.metaValue}>{workoutData.type}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Difficulty</Text>
              <Text style={styles.metaValue}>{workoutData.difficulty}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Duration</Text>
              <Text style={styles.metaValue}>{workoutData.estimatedDuration}</Text>
            </View>
          </View>
        </View>

        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructions}>{workoutData.instructions}</Text>
        </View>

        <View style={styles.movementsSection}>
          <Text style={styles.sectionTitle}>Movements</Text>
          {workoutData.movements.map((movement, index) => renderMovement(movement, index))}
        </View>

        {isLogging && (
          <View style={styles.logSection}>
            <Text style={styles.sectionTitle}>Log Your Results</Text>
            
            <View style={styles.logInput}>
              <Text style={styles.logLabel}>Score/Time *</Text>
              <TextInput
                style={styles.input}
                value={logData.score}
                onChangeText={(value) => setLogData(prev => ({ ...prev, score: value }))}
                placeholder="e.g., 8:45 or 150 reps"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>

            <View style={styles.logInput}>
              <Text style={styles.logLabel}>Overall Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={logData.notes}
                onChangeText={(value) => setLogData(prev => ({ ...prev, notes: value }))}
                placeholder="How did it feel? Any modifications?"
                placeholderTextColor={COLORS.textSecondary}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {!isLogging ? (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleStartLogging}
          >
            <Text style={styles.actionButtonText}>Log This Workout</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.logActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => setIsLogging(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleSaveLog}
            >
              <Text style={styles.actionButtonText}>Save Log</Text>
            </TouchableOpacity>
          </View>
        )}
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
  workoutHeader: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  workoutName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  workoutDescription: {
    fontSize: 18,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  metaValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  instructionsSection: {
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
  instructions: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  movementsSection: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
    marginBottom: SPACING.sm,
  },
  movementName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  movementReps: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
  },
  movementWeight: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  movementDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  logSection: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logInputs: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  logRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  logInput: {
    marginBottom: SPACING.md,
  },
  logLabel: {
    fontSize: 14,
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
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  actionButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
  logActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  cancelButton: {
    backgroundColor: COLORS.textSecondary,
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: COLORS.success,
  },
});

export default WorkoutViewerScreen;
