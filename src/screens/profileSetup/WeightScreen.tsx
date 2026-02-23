import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from '../../components/Container';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUserProfile } from '../../store/slices/userSlice';

const WeightScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);
  const [weight, setWeight] = useState(profile?.weight?.toString() || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    const weightNum = parseFloat(weight);
    if (!weight || isNaN(weightNum) || weightNum < 30 || weightNum > 300) {
      setError('Please enter a valid weight (30-300 kg)');
      return;
    }
    dispatch(updateUserProfile({ weight: weightNum }));
    navigation.navigate('Height' as never);
  };

  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.step}>Step 3 of 6</Text>
          <Text style={styles.title}>What's your weight?</Text>
        </View>
        <View style={styles.form}>
          <Input
            label="Weight (kg)"
            placeholder="Enter your weight"
            value={weight}
            onChangeText={(text) => {
              setWeight(text);
              setError('');
            }}
            keyboardType="decimal-pad"
            error={error}
          />
        </View>
        <Button title="Next" onPress={handleNext} />
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
  form: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default WeightScreen;
