import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { theme } from '../../theme';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchExerciseById } from '../../store/slices/exerciseSlice';
import { capitalize } from '../../utils/helpers';

const ExerciseDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { exerciseId } = route.params as { exerciseId: string };
  const { selectedExercise, isLoading } = useAppSelector(state => state.exercise);

  useEffect(() => {
    dispatch(fetchExerciseById(exerciseId));
  }, [exerciseId]);

  if (isLoading || !selectedExercise) {
    return <Loading />;
  }

  return (
    <Container>
      <Header title="Exercise Details" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          {selectedExercise.gifUrl && typeof selectedExercise.gifUrl === 'number' ? (
            <Image 
              source={selectedExercise.gifUrl} 
              style={styles.gif} 
              resizeMode="cover"
              onError={() => console.log('Exercise image failed to load')}
            />
          ) : selectedExercise.images && selectedExercise.images.length > 0 && typeof selectedExercise.images[0] === 'number' ? (
            <Image 
              source={selectedExercise.images[0]} 
              style={styles.gif} 
              resizeMode="cover"
              onError={() => console.log('Exercise image failed to load')}
            />
          ) : (
            <View style={[styles.gif, styles.placeholderGif]}>
              <Text style={styles.placeholderText}>Exercise Animation</Text>
              <Text style={styles.exerciseName}>{capitalize(selectedExercise.name)}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.info}>
          <Text style={styles.name}>{capitalize(selectedExercise.name)}</Text>
          
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagLabel}>Body Part</Text>
              <Text style={styles.tagValue}>{capitalize(selectedExercise.bodyPart)}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagLabel}>Equipment</Text>
              <Text style={styles.tagValue}>{capitalize(selectedExercise.equipment)}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagLabel}>Target</Text>
              <Text style={styles.tagValue}>{capitalize(selectedExercise.target)}</Text>
            </View>
          </View>

          {selectedExercise.instructions && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Instructions</Text>
              <Text style={styles.instructionText}>{selectedExercise.instructions}</Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Log Workout"
          onPress={() => navigation.navigate('WorkoutLog', { exerciseId })}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  gif: {
    width: '100%',
    height: 300,
    backgroundColor: theme.colors.backgroundTertiary,
  },
  placeholderGif: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  exerciseName: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  info: {
    padding: theme.spacing.xl,
  },
  name: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  tag: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    minWidth: 100,
  },
  tagLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  tagValue: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  instruction: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    marginRight: theme.spacing.md,
  },
  instructionText: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  footer: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});

export default ExerciseDetailScreen;
