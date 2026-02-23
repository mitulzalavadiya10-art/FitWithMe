import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUserProfile } from '../../store/slices/userSlice';
import { FITNESS_GOALS } from '../../utils/constants';

const GoalScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);
  const [selected, setSelected] = useState(profile?.goal || null);

  const handleNext = () => {
    if (selected) {
      dispatch(updateUserProfile({ goal: selected }));
      navigation.navigate('ActivityLevel' as never);
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.step}>Step 5 of 6</Text>
          <Text style={styles.title}>What's your goal?</Text>
        </View>

        <View style={styles.options}>
          {FITNESS_GOALS.map((goal) => {
            const IconComponent = goal.IconComponent;
            return (
              <TouchableOpacity
                key={goal.id}
                style={[styles.option, selected === goal.id && styles.optionSelected]}
                onPress={() => setSelected(goal.id)}>
                <IconComponent size={32} color={theme.colors.primary} />
                <Text style={styles.optionText}>{goal.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button title="Next" onPress={handleNext} disabled={!selected} />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: theme.spacing.xl,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: theme.spacing['2xl'],
  },
  step: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  options: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: theme.colors.primary,
  },
  optionText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
    marginLeft: theme.spacing.md,
  },
});

export default GoalScreen;
