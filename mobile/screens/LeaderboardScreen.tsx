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

interface LeaderboardScreenProps {
  navigation: any;
}

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  score: string;
  workoutName: string;
  date: string;
  isCurrentUser?: boolean;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ navigation }) => {
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('week');
  const [workout, setWorkout] = useState<'all' | 'fran' | 'grace'>('all');

  const mockLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      rank: 1,
      name: 'Sarah Johnson',
      score: '6:32',
      workoutName: 'Fran',
      date: 'Today',
    },
    {
      id: '2',
      rank: 2,
      name: 'Mike Wilson',
      score: '7:15',
      workoutName: 'Fran',
      date: 'Yesterday',
      isCurrentUser: true,
    },
    {
      id: '3',
      rank: 3,
      name: 'Emma Davis',
      score: '7:45',
      workoutName: 'Fran',
      date: '2 days ago',
    },
    {
      id: '4',
      rank: 4,
      name: 'John Smith',
      score: '8:12',
      workoutName: 'Fran',
      date: '3 days ago',
    },
    {
      id: '5',
      rank: 5,
      name: 'Lisa Brown',
      score: '8:45',
      workoutName: 'Fran',
      date: '4 days ago',
    },
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return COLORS.textSecondary;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return rank.toString();
    }
  };

  const renderLeaderboardEntry = ({ item }: { item: LeaderboardEntry }) => (
    <View style={[
      styles.entryCard,
      item.isCurrentUser && styles.currentUserCard
    ]}>
      <View style={styles.rankContainer}>
        <Text style={[styles.rankText, { color: getRankColor(item.rank) }]}>
          {getRankIcon(item.rank)}
        </Text>
      </View>
      
      <View style={styles.entryDetails}>
        <Text style={[
          styles.entryName,
          item.isCurrentUser && styles.currentUserText
        ]}>
          {item.name}
          {item.isCurrentUser && ' (You)'}
        </Text>
        <Text style={styles.entryWorkout}>{item.workoutName}</Text>
        <Text style={styles.entryDate}>{item.date}</Text>
      </View>
      
      <View style={styles.scoreContainer}>
        <Text style={[
          styles.entryScore,
          item.isCurrentUser && styles.currentUserScore
        ]}>
          {item.score}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
      </View>

      <View style={styles.filters}>
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Period</Text>
          <View style={styles.filterToggle}>
            {(['week', 'month', 'all'] as const).map((p) => (
              <TouchableOpacity
                key={p}
                style={[styles.filterButton, period === p && styles.activeFilter]}
                onPress={() => setPeriod(p)}
              >
                <Text style={[
                  styles.filterText,
                  period === p && styles.activeFilterText
                ]}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Workout</Text>
          <View style={styles.filterToggle}>
            {(['all', 'fran', 'grace'] as const).map((w) => (
              <TouchableOpacity
                key={w}
                style={[styles.filterButton, workout === w && styles.activeFilter]}
                onPress={() => setWorkout(w)}
              >
                <Text style={[
                  styles.filterText,
                  workout === w && styles.activeFilterText
                ]}>
                  {w.charAt(0).toUpperCase() + w.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <FlatList
          data={mockLeaderboard}
          renderItem={renderLeaderboardEntry}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.leaderboardList}
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
  filters: {
    padding: SPACING.lg,
    gap: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterSection: {
    gap: SPACING.sm,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  filterToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 2,
  },
  filterButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: 6,
    alignItems: 'center',
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
  leaderboardList: {
    padding: SPACING.lg,
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  currentUserCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  rankContainer: {
    width: 50,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  entryDetails: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  entryName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  currentUserText: {
    color: COLORS.primary,
  },
  entryWorkout: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  entryDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  entryScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  currentUserScore: {
    color: COLORS.primary,
  },
});

export default LeaderboardScreen;
