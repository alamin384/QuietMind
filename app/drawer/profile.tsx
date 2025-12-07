import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FEFCF8" />
      <Header title="Profile" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Profile Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.name}>Your Name</Text>
          <Text style={styles.email}>your.email@example.com</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Total Entries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Streak Days</Text>
          </View>
        </View>

        {/* Options Section */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>✏️</Text>
              <Text style={styles.optionText}>Edit Profile</Text>
            </View>
            <Text style={styles.optionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>📊</Text>
              <Text style={styles.optionText}>Statistics</Text>
            </View>
            <Text style={styles.optionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>💾</Text>
              <Text style={styles.optionText}>Export Data</Text>
            </View>
            <Text style={styles.optionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>🔒</Text>
              <Text style={styles.optionText}>Privacy</Text>
            </View>
            <Text style={styles.optionArrow}>→</Text>
          </TouchableOpacity>
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
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
    color: '#2C2C2C',
    marginBottom: 6,
  },
  email: {
    fontSize: 15,
    color: '#8B9A9C',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#8B9A9C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#8B9A9C',
    fontWeight: '500',
  },
  optionsSection: {
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
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
    color: '#2C2C2C',
  },
  optionArrow: {
    fontSize: 20,
    color: '#8B9A9C',
  },
});
