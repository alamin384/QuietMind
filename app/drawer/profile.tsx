import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function Profile() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <Header title="Profile" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Profile Avatar */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={[styles.name, { color: colors.text }]}>Your Name</Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>your.email@example.com</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={[styles.statCard, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>0</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Entries</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>0</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Streak Days</Text>
          </View>
        </View>

        {/* Options Section */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={[styles.optionItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>✏️</Text>
              <Text style={[styles.optionText, { color: colors.text }]}>Edit Profile</Text>
            </View>
            <Text style={[styles.optionArrow, { color: colors.icon }]}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>📊</Text>
              <Text style={[styles.optionText, { color: colors.text }]}>Statistics</Text>
            </View>
            <Text style={[styles.optionArrow, { color: colors.icon }]}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>💾</Text>
              <Text style={[styles.optionText, { color: colors.text }]}>Export Data</Text>
            </View>
            <Text style={[styles.optionArrow, { color: colors.icon }]}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>🔒</Text>
              <Text style={[styles.optionText, { color: colors.text }]}>Privacy</Text>
            </View>
            <Text style={[styles.optionArrow, { color: colors.icon }]}>→</Text>
          </TouchableOpacity>
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarEmoji: {
    fontSize: 56,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  email: {
    fontSize: 15,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  optionsSection: {
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  optionIcon: {
    fontSize: 24,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionArrow: {
    fontSize: 20,
  },
});
