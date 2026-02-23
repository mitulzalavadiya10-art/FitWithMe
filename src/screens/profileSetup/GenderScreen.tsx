import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUserProfile } from '../../store/slices/userSlice';

const GenderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);
  const [selected, setSelected] = useState<'male' | 'female' | 'other' | null>(profile?.gender || null);

  const handleNext = () => {
    if (selected) {
      dispatch(updateUserProfile({ gender: selected }));
      navigation.navigate('Age' as never);
    }
  };

  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.step}>Step 1 of 6</Text>
          <Text style={styles.title}>What's your gender?</Text>
        </View>

        <View style={styles.options}>
          {[
            { value: 'male', label: 'Male', emoji: '👨' },
            { value: 'female', label: 'Female', emoji: '👩' },
            { value: 'other', label: 'Other', emoji: '🧑' },
          ].map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[styles.option, selected === option.value && styles.optionSelected]}
              onPress={() => setSelected(option.value as any)}>
              <Text style={styles.emoji}>{option.emoji}</Text>
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Next" onPress={handleNext} disabled={!selected} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
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
  emoji: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  optionText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
  },
});

export default GenderScreen;
