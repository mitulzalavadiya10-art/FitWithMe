import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateNotificationSettings } from '../../store/slices/settingsSlice';

const NotificationSettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.settings.notifications);

  const handleToggle = (key: keyof typeof notifications) => {
    dispatch(updateNotificationSettings({ [key]: !notifications[key] }));
  };

  return (
    <Container>
      <Header title="Notifications" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <View style={styles.setting}>
          <View>
            <Text style={styles.settingLabel}>Workout Reminders</Text>
            <Text style={styles.settingDesc}>Get reminded about your workouts</Text>
          </View>
          <Switch
            value={notifications.workoutReminders}
            onValueChange={() => handleToggle('workoutReminders')}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
          />
        </View>

        <View style={styles.setting}>
          <View>
            <Text style={styles.settingLabel}>Workout System</Text>
            <Text style={styles.settingDesc}>System notifications for workouts</Text>
          </View>
          <Switch
            value={notifications.workoutSystem}
            onValueChange={() => handleToggle('workoutSystem')}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: theme.spacing.xl,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
  settingLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
  },
  settingDesc: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
});

export default NotificationSettingsScreen;
