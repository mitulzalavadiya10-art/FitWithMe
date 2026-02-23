import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from '../../components/Container';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUserProfile } from '../../store/slices/userSlice';

const AgeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);
  const [age, setAge] = useState(profile?.age?.toString() || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
      setError('Please enter a valid age (13-120)');
      return;
    }
    dispatch(updateUserProfile({ age: ageNum }));
    navigation.navigate('Weight' as never);
  };

  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.step}>Step 2 of 6</Text>
          <Text style={styles.title}>How old are you?</Text>
        </View>
        <View style={styles.form}>
          <Input
            label="Age"
            placeholder="Enter your age"
            value={age}
            onChangeText={(text) => {
              setAge(text);
              setError('');
            }}
            keyboardType="numeric"
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

export default AgeScreen;
