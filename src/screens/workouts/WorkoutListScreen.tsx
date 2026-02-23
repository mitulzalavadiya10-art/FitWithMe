import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { ExerciseCard } from '../../components/ExerciseCard';
import { Loading } from '../../components/Loading';
import { EmptyState } from '../../components/EmptyState';
import { theme } from '../../theme';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useNavigation } from '@react-navigation/native';
import { fetchExercises, fetchExercisesByBodyPart } from '../../store/slices/exerciseSlice';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { MUSCLE_GROUPS } from '../../api/exerciseService';
import Icon from 'react-native-vector-icons/Ionicons';

const WorkoutListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { exercises, isLoading } = useAppSelector(state => state.exercise);
  const favorites = useAppSelector(state => state.favorites.exercises);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(true);

  useEffect(() => {
    // Initially show categories, not all exercises
    setShowCategories(true);
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCategories(false);
    dispatch(fetchExercisesByBodyPart({ bodyPart: categoryId }));
  };

  const handleBackToCategories = () => {
    setShowCategories(true);
    setSelectedCategory(null);
  };

  const handleFavorite = (exercise: any) => {
    const isFav = favorites.some(fav => fav.id === exercise.id);
    if (isFav) {
      dispatch(removeFromFavorites(exercise.id));
    } else {
      dispatch(addToFavorites(exercise));
    }
  };

  const renderCategoryCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { borderColor: item.color }]}
      onPress={() => handleCategorySelect(item.id)}
      activeOpacity={0.7}>
      <View style={[styles.categoryIcon, { backgroundColor: item.color + '20' }]}>
        <Icon name={item.icon} size={40} color={item.color} />
      </View>
      <View style={styles.categoryContent}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryDesc}>Tap to view exercises</Text>
      </View>
      <Icon name="chevron-forward" size={24} color={theme.colors.textTertiary} />
    </TouchableOpacity>
  );

  const renderExerciseItem = ({ item }: { item: any }) => (
    <ExerciseCard
      exercise={item}
      onPress={() => navigation.navigate('ExerciseDetail', { exerciseId: item.id })}
      onFavorite={() => handleFavorite(item)}
      isFavorite={favorites.some(fav => fav.id === item.id)}
    />
  );

  if (isLoading && !showCategories) {
    return <Loading />;
  }

  return (
    <Container safe>
      <Header 
        title={selectedCategory ? MUSCLE_GROUPS.find(g => g.id === selectedCategory)?.name + ' Exercises' || 'Exercises' : 'Workouts'} 
        onBack={selectedCategory ? handleBackToCategories : undefined}
      />
      
      {showCategories ? (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Choose Muscle Group</Text>
          <Text style={styles.sectionSubtitle}>Select a muscle group to see exercises</Text>
          <FlatList
            data={MUSCLE_GROUPS}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryCard}
            contentContainerStyle={styles.categoriesList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.exercisesList}
          renderItem={renderExerciseItem}
          ListEmptyComponent={
            <EmptyState
              icon="barbell-outline"
              title="No Exercises"
              message="No exercises found in this category."
            />
          }
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  sectionSubtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  categoriesList: {
    paddingHorizontal: theme.spacing.md,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    ...theme.shadows.sm,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  categoryDesc: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  exercisesList: {
    padding: theme.spacing.md,
  },
});

export default WorkoutListScreen;
