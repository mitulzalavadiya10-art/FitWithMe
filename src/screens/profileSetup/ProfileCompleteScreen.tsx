import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUserProfile } from '../../store/slices/userSlice';
import { loginSuccess, completeOnboarding } from '../../store/slices/authSlice';
import { generateId } from '../../utils/helpers';

const ProfileCompleteScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);

  useEffect(() => {
    // Create complete profile with all required fields
    const completeProfile = {
      id: generateId(),
      email: 'user@example.com',
      name: 'User',
      gender: profile?.gender || 'male' as const,
      age: profile?.age || 25,
      weight: profile?.weight || 70,
      height: profile?.height || 170,
      goal: profile?.goal || 'fitness',
      activityLevel: profile?.activityLevel || 'moderate',
      profileImage: null,
      createdAt: new Date().toISOString(),
    };
    
    console.log('Setting complete profile:', completeProfile);
    dispatch(setUserProfile(completeProfile));
  }, [dispatch]);

  const handleContinue = () => {
    console.log('Get Started button pressed');
    console.log('Current profile:', profile);
    
    // Complete the authentication process
    dispatch(loginSuccess({ token: 'demo-token' }));
    dispatch(completeOnboarding());
    
    console.log('Actions dispatched');
    // Navigation will happen automatically via RootNavigator
  };

  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.center}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>Profile Complete!</Text>
          <Text style={styles.message}>
            Your profile is all set up. Let's start your fitness journey!
          </Text>
        </View>
        <Button title="Get Started" onPress={handleContinue} />
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 100,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  message: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
});

export default ProfileCompleteScreen;
