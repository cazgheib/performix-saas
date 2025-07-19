import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SPACING } from '../constants/config';

interface MarketplaceScreenProps {
  navigation: any;
}

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  author: string;
  price: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: string;
  rating: number;
  purchases: number;
  isPurchased?: boolean;
}

const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all');

  const mockTemplates: WorkoutTemplate[] = [
    {
      id: '1',
      name: 'CrossFit Benchmark Pack',
      description: 'Collection of classic CrossFit benchmark workouts including Fran, Grace, and Cindy',
      author: 'Coach Sarah',
      price: 9.99,
      difficulty: 'Intermediate',
      type: 'For Time',
      rating: 4.8,
      purchases: 156,
    },
    {
      id: '2',
      name: 'Beginner Strength Program',
      description: '8-week progressive strength building program perfect for newcomers',
      author: 'Coach Mike',
      price: 0,
      difficulty: 'Beginner',
      type: 'Strength',
      rating: 4.6,
      purchases: 89,
      isPurchased: true,
    },
    {
      id: '3',
      name: 'HIIT Cardio Blast',
      description: 'High-intensity interval training workouts for maximum calorie burn',
      author: 'Coach Emma',
      price: 4.99,
      difficulty: 'Advanced',
      type: 'HIIT',
      rating: 4.9,
      purchases: 203,
    },
  ];

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'free' && template.price === 0) ||
                         (filter === 'paid' && template.price > 0);
    
    return matchesSearch && matchesFilter;
  });

  const renderTemplate = ({ item }: { item: WorkoutTemplate }) => (
    <TouchableOpacity
      style={styles.templateCard}
      onPress={() => navigation.navigate('WorkoutViewer', { workoutId: item.id })}
    >
      <View style={styles.templateHeader}>
        <Text style={styles.templateName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          {item.price === 0 ? (
            <Text style={styles.freeText}>FREE</Text>
          ) : (
            <Text style={styles.priceText}>${item.price}</Text>
          )}
        </View>
      </View>
      
      <Text style={styles.templateDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.templateMeta}>
        <Text style={styles.authorText}>by {item.author}</Text>
        <View style={styles.metaRow}>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>
      
      <View style={styles.templateFooter}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          <Text style={styles.purchasesText}>({item.purchases} purchases)</Text>
        </View>
        
        {item.isPurchased ? (
          <View style={styles.purchasedBadge}>
            <Text style={styles.purchasedText}>Purchased</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.purchaseButton}>
            <Text style={styles.purchaseButtonText}>
              {item.price === 0 ? 'Get Free' : 'Purchase'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return COLORS.success;
      case 'Intermediate':
        return COLORS.warning;
      case 'Advanced':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Marketplace</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search workouts..."
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'free' && styles.activeFilter]}
          onPress={() => setFilter('free')}
        >
          <Text style={[styles.filterText, filter === 'free' && styles.activeFilterText]}>
            Free
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'paid' && styles.activeFilter]}
          onPress={() => setFilter('paid')}
        >
          <Text style={[styles.filterText, filter === 'paid' && styles.activeFilterText]}>
            Paid
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={filteredTemplates}
          renderItem={renderTemplate}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.templatesList}
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
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  searchInput: {
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    gap: SPACING.sm,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
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
  templatesList: {
    padding: SPACING.lg,
  },
  templateCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  templateName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  priceContainer: {
    marginLeft: SPACING.sm,
  },
  freeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  templateDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  templateMeta: {
    marginBottom: SPACING.md,
  },
  authorText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  typeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  templateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.text,
  },
  purchasesText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  purchasedBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  purchasedText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  purchaseButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  purchaseButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
});

export default MarketplaceScreen;
