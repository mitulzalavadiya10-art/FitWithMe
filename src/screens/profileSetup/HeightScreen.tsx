import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from '../../components/Container';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUserProfile } from '../../store/slices/userSlice';

const HeightScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);
  const [height, setHeight] = useState(profile?.height?.toString() || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    const heightNum = parseFloat(height);
    if (!height || isNaN(heightNum) || heightNum < 100 || heightNum > 250) {
      setError('Please enter a valid height (100-250 cm)');
      return;
    }
    dispatch(updateUserProfile({ height: heightNum }));
    navigation.navigate('Goal' as never);
  };

  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.step}>Step 4 of 6</Text>
          <Text style={styles.title}>What's your height?</Text>
        </View>
        <View style={styles.form}>
          <Input
            label="Height (cm)"
            placeholder="Enter your height"
            value={height}
            onChangeText={(text) => {
              setHeight(text);
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

export default HeightScreen;
