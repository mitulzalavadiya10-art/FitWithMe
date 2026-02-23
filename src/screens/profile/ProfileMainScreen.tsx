import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { theme } from '../../theme';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../store/slices/authSlice';
import { clearUserProfile } from '../../store/slices/userSlice';
import { calculateBMI, getBMICategory } from '../../utils/helpers';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileMainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);

  const bmi = profile?.weight && profile?.height ? calculateBMI(profile.weight, profile.height) : 0;
  const bmiCategory = bmi ? getBMICategory(bmi) : '';

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserProfile());
  };

  const menuItems = [
    { icon: 'settings-outline', label: 'Settings', screen: 'Settings' },
    { icon: 'notifications-outline', label: 'Notifications', screen: 'NotificationSettings' },
    { icon: 'lock-closed-outline', label: 'Password', screen: 'PasswordSettings' },
    { icon: 'help-circle-outline', label: 'Help & Support', screen: 'Help' },
  ];

  return (
    <Container safe>
      <Header title="Profile" />
      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Icon name="person" size={48} color={theme.colors.text} />
          </View>
          <Text style={styles.name}>{profile?.name}</Text>
          <Text style={styles.email}>{profile?.email}</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Weight</Text>
            <Text style={styles.statValue}>{profile?.weight} kg</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Height</Text>
            <Text style={styles.statValue}>{profile?.height} cm</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>BMI</Text>
            <Text style={styles.statValue}>{bmi.toFixed(1)}</Text>
            <Text style={styles.statSubtext}>{bmiCategory}</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen as never)}>
              <Icon name={item.icon} size={24} color={theme.colors.text} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Icon name="chevron-forward" size={24} color={theme.colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} color={theme.colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  profileCard: {
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  email: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    marginHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  statValue: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  statSubtext: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  menu: {
    paddingHorizontal: theme.spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: theme.spacing.xl,
    marginVertical: theme.spacing.xl,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  logoutText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.error,
    fontWeight: theme.typography.fontWeight.semiBold,
    marginLeft: theme.spacing.sm,
  },
});

export default ProfileMainScreen;
