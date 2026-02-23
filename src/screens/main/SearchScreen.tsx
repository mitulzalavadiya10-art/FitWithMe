import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { ExerciseCard } from '../../components/ExerciseCard';
import { EmptyState } from '../../components/EmptyState';
import { Loading } from '../../components/Loading';
import { theme } from '../../theme';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useNavigation } from '@react-navigation/native';
import { searchExercises, fetchExercisesByBodyPart } from '../../store/slices/exerciseSlice';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { debounce } from '../../utils/helpers';
import { MUSCLE_GROUPS } from '../../api/exerciseService';
import { SearchIcon, ChevronForwardIcon } from '../../icons';

const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { exercises, isLoading } = useAppSelector(state => state.exercise);
  const favorites = useAppSelector(state => state.favorites.exercises);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(true);

  const handleSearch = debounce((text: string) => {
    if (text.length >= 2) {
      setShowCategories(false);
      setSelectedCategory(null);
      dispatch(searchExercises({ name: text }));
    } else {
      setShowCategories(true);
      setSelectedCategory(null);
    }
  }, 500);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCategories(false);
    setQuery('');
    dispatch(fetchExercisesByBodyPart({ bodyPart: categoryId }));
  };

  const handleBackToCategories = () => {
    setShowCategories(true);
    setSelectedCategory(null);
    setQuery('');
  };

  const handleFavorite = (exercise: any) => {
    const isFav = favorites.some(fav => fav.id === exercise.id);
    if (isFav) {
      dispatch(removeFromFavorites(exercise.id));
    } else {
      dispatch(addToFavorites(exercise));
    }
  };

  const renderCategoryCard = ({ item }: { item: any }) => {
    const IconComponent = item.IconComponent;
    return (
      <TouchableOpacity
        style={[styles.categoryCard, { borderColor: item.color }]}
        onPress={() => handleCategorySelect(item.id)}
        activeOpacity={0.7}>
        <View style={[styles.categoryIcon, { backgroundColor: item.color + '20' }]}>
          <IconComponent size={32} color={item.color} />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
        <ChevronForwardIcon size={20} color={theme.colors.textTertiary} />
      </TouchableOpacity>
    );
  };

  const renderExerciseItem = ({ item }: { item: any }) => (
    <ExerciseCard
      exercise={item}
      onPress={() => navigation.navigate('Workouts', {
        screen: 'ExerciseDetail',
        params: { exerciseId: item.id }
      })}
      onFavorite={() => handleFavorite(item)}
      isFavorite={favorites.some(fav => fav.id === item.id)}
    />
  );

  return (
    <Container safe>
      <Header 
        title={selectedCategory ? MUSCLE_GROUPS.find(g => g.id === selectedCategory)?.name || 'Exercises' : 'Search'} 
        onBack={selectedCategory ? handleBackToCategories : undefined}
      />
      
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search exercises..."
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            handleSearch(text);
          }}
          icon={<SearchIcon size={20} color={theme.colors.textTertiary} />}
        />
      </View>

      {isLoading ? (
        <Loading />
      ) : showCategories ? (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Exercise Categories</Text>
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
              icon="search-outline"
              title={query ? 'No Results' : selectedCategory ? 'No Exercises' : 'Start Searching'}
              message={
                query 
                  ? 'No exercises found for your search.' 
                  : selectedCategory 
                    ? 'No exercises found in this category.'
                    : 'Search for exercises by name or select a category'
              }
            />
          }
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
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
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  categoryName: {
    flex: 1,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
  },
  exercisesList: {
    padding: theme.spacing.md,
  },
});

export default SearchScreen;
