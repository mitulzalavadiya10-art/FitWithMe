import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUserProfile } from '../../store/slices/userSlice';
import { ACTIVITY_LEVELS } from '../../utils/constants';

const ActivityLevelScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);
  const [selected, setSelected] = useState(profile?.activityLevel || null);

  const handleNext = () => {
    if (selected) {
      dispatch(updateUserProfile({ activityLevel: selected }));
      navigation.navigate('ProfileComplete' as never);
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.step}>Step 6 of 6</Text>
          <Text style={styles.title}>Activity Level</Text>
        </View>

        <View style={styles.options}>
          {ACTIVITY_LEVELS.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[styles.option, selected === level.id && styles.optionSelected]}
              onPress={() => setSelected(level.id)}>
              <Text style={styles.optionLabel}>{level.label}</Text>
              <Text style={styles.optionDesc}>{level.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Complete" onPress={handleNext} disabled={!selected} />
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
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: theme.colors.primary,
  },
  optionLabel: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.semiBold,
    marginBottom: theme.spacing.xs,
  },
  optionDesc: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
});

export default ActivityLevelScreen;
