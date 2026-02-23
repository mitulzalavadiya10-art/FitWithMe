import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addWorkoutLog } from '../../store/slices/workoutSlice';
import { generateId } from '../../utils/helpers';

const WorkoutLogScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { exerciseId } = route.params as { exerciseId: string };
  const exercise = useAppSelector(state => 
    state.exercise.exercises.find(ex => ex.id === exerciseId)
  );

  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!sets || !reps) return;

    const log = {
      id: generateId(),
      exerciseId,
      exerciseName: exercise?.name || 'Exercise',
      date: new Date().toISOString(),
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: weight ? parseFloat(weight) : undefined,
      notes,
      completed: true,
    };

    dispatch(addWorkoutLog(log));
    navigation.goBack();
  };

  return (
    <Container>
      <Header title="Log Workout" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.exerciseName}>{exercise?.name}</Text>

        <Input
          label="Sets"
          placeholder="Number of sets"
          value={sets}
          onChangeText={setSets}
          keyboardType="numeric"
        />

        <Input
          label="Reps"
          placeholder="Reps per set"
          value={reps}
          onChangeText={setReps}
          keyboardType="numeric"
        />

        <Input
          label="Weight (kg) - Optional"
          placeholder="Weight used"
          value={weight}
          onChangeText={setWeight}
          keyboardType="decimal-pad"
        />

        <Input
          label="Notes - Optional"
          placeholder="Add notes about your workout"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />

        <Button
          title="Save Workout"
          onPress={handleSave}
          disabled={!sets || !reps}
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.xl,
  },
  exerciseName: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
    textTransform: 'capitalize',
  },
});

export default WorkoutLogScreen;
