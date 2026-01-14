import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Header from '@/components/Header';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function Help() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <Header title="Help & Support" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📖</Text>
          </View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Getting Started</Text>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            Welcome to QuietMind! To create your first journal entry, tap the + button 
            on the home screen. You can select your mood, add a title (optional), and 
            write your thoughts.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Managing Entries</Text>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: colors.icon }]}>•</Text>
            <Text style={[styles.text, { color: colors.textSecondary }]}>Tap any entry to view it in full</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: colors.icon }]}>•</Text>
            <Text style={[styles.text, { color: colors.textSecondary }]}>Tap the edit icon (✎) to modify an entry</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: colors.icon }]}>•</Text>
            <Text style={[styles.text, { color: colors.textSecondary }]}>Use the delete button to remove entries permanently</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Mood Tracking</Text>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            Track your emotional state with our mood selector. Choose from:
          </Text>
          <View style={styles.moodList}>
            <View style={[styles.moodItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
              <Text style={styles.moodEmoji}>😌</Text>
              <Text style={[styles.moodText, { color: colors.textSecondary }]}>Calm - Feeling peaceful and relaxed</Text>
            </View>
            <View style={[styles.moodItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
              <Text style={styles.moodEmoji}>😊</Text>
              <Text style={[styles.moodText, { color: colors.textSecondary }]}>Happy - Feeling joyful and positive</Text>
            </View>
            <View style={[styles.moodItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
              <Text style={styles.moodEmoji}>😰</Text>
              <Text style={[styles.moodText, { color: colors.textSecondary }]}>Stressed - Feeling anxious or overwhelmed</Text>
            </View>
            <View style={[styles.moodItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
              <Text style={styles.moodEmoji}>😐</Text>
              <Text style={[styles.moodText, { color: colors.textSecondary }]}>Neutral - Feeling balanced or indifferent</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacy</Text>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            All your entries are stored locally on your device. Your data is private 
            and never shared with anyone.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Need More Help?</Text>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            If you have questions or need assistance, please contact our support team 
            or check our FAQ section.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 48,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 20,
  },
  bullet: {
    fontSize: 15,
    marginRight: 12,
    fontWeight: '600',
  },
  moodList: {
    marginTop: 12,
    gap: 12,
  },
  moodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  moodEmoji: {
    fontSize: 24,
  },
  moodText: {
    fontSize: 15,
    flex: 1,
  },
});
