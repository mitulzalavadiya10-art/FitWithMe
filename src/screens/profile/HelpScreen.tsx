import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpScreen = () => {
  const navigation = useNavigation();

  const faqs = [
    { q: 'How do I log a workout?', a: 'Go to exercise details and tap "Log Workout"' },
    { q: 'How do I add favorites?', a: 'Tap the heart icon on any exercise card' },
    { q: 'How do I search exercises?', a: 'Use the Search tab to find specific exercises' },
  ];

  return (
    <Container>
      <Header title="Help & Support" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqCard}>
            <Text style={styles.question}>{faq.q}</Text>
            <Text style={styles.answer}>{faq.a}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.contactCard}>
          <Icon name="mail-outline" size={24} color={theme.colors.primary} />
          <View style={styles.contactContent}>
            <Text style={styles.contactTitle}>Contact Support</Text>
            <Text style={styles.contactDesc}>support@fitwithme.com</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  faqCard: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
  question: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  answer: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.lg,
  },
  contactContent: {
    marginLeft: theme.spacing.md,
  },
  contactTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text,
  },
  contactDesc: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
});

export default HelpScreen;
