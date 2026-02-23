import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';

const PasswordSettingsScreen = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    // Handle password change
    navigation.goBack();
  };

  return (
    <Container>
      <Header title="Change Password" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          label="Current Password"
          placeholder="Enter current password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
        <Input
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <Input
          label="Confirm Password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button title="Update Password" onPress={handleSave} />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.xl,
  },
});

export default PasswordSettingsScreen;
