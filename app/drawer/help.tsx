import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Header from '@/components/Header';

export default function Help() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FEFCF8" />
      <Header title="Help & Support" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📖</Text>
          </View>
          <Text style={styles.sectionTitle}>Getting Started</Text>
          <Text style={styles.text}>
            Welcome to QuietMind! To create your first journal entry, tap the + button 
            on the home screen. You can select your mood, add a title (optional), and 
            write your thoughts.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Managing Entries</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>Tap any entry to view it in full</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>Tap the edit icon (✎) to modify an entry</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>Use the delete button to remove entries permanently</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mood Tracking</Text>
          <Text style={styles.text}>
            Track your emotional state with our mood selector. Choose from:
          </Text>
          <View style={styles.moodList}>
            <View style={styles.moodItem}>
              <Text style={styles.moodEmoji}>😌</Text>
              <Text style={styles.moodText}>Calm - Feeling peaceful and relaxed</Text>
            </View>
            <View style={styles.moodItem}>
              <Text style={styles.moodEmoji}>😊</Text>
              <Text style={styles.moodText}>Happy - Feeling joyful and positive</Text>
            </View>
            <View style={styles.moodItem}>
              <Text style={styles.moodEmoji}>😰</Text>
              <Text style={styles.moodText}>Stressed - Feeling anxious or overwhelmed</Text>
            </View>
            <View style={styles.moodItem}>
              <Text style={styles.moodEmoji}>😐</Text>
              <Text style={styles.moodText}>Neutral - Feeling balanced or indifferent</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <Text style={styles.text}>
            All your entries are stored locally on your device. Your data is private 
            and never shared with anyone.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need More Help?</Text>
          <Text style={styles.text}>
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
    backgroundColor: '#FEFCF8',
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
    color: '#2C2C2C',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 24,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 20,
  },
  bullet: {
    fontSize: 15,
    color: '#8B9A9C',
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
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
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
    color: '#666666',
    flex: 1,
  },
});
