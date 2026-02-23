import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { ExerciseCard } from '../../components/ExerciseCard';
import { EmptyState } from '../../components/EmptyState';
import { theme } from '../../theme';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useNavigation } from '@react-navigation/native';
import { removeFromFavorites } from '../../store/slices/favoritesSlice';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.exercises);

  return (
    <Container safe>
      <Header title="Favorites" />
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            onPress={() => navigation.navigate('Workouts', {
              screen: 'ExerciseDetail',
              params: { exerciseId: item.id }
            })}
            onFavorite={() => dispatch(removeFromFavorites(item.id))}
            isFavorite={true}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="heart-outline"
            title="No Favorites"
            message="Start adding exercises to your favorites"
          />
        }
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: theme.spacing.md,
  },
});

export default FavoritesScreen;
