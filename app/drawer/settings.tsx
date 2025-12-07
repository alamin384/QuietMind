import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Switch, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Header from '@/components/Header';

export default function Settings() {
  const colorScheme = useColorScheme();
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(false);
  const [biometric, setBiometric] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FEFCF8" />
      <Header title="Settings" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🎨</Text>
                <Text style={styles.settingLabel}>Theme</Text>
              </View>
              <Text style={styles.settingValue}>
                {colorScheme === 'dark' ? 'Dark' : 'Light'} Mode
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🔔</Text>
                <Text style={styles.settingLabel}>Enable Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E8E8E8', true: '#8B9A9C' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>⏰</Text>
                <Text style={styles.settingLabel}>Daily Reminders</Text>
              </View>
              <Switch
                value={reminders}
                onValueChange={setReminders}
                trackColor={{ false: '#E8E8E8', true: '#8B9A9C' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🔐</Text>
                <Text style={styles.settingLabel}>Biometric Lock</Text>
              </View>
              <Switch
                value={biometric}
                onValueChange={setBiometric}
                trackColor={{ false: '#E8E8E8', true: '#8B9A9C' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <View style={styles.settingCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>📤</Text>
                <Text style={styles.settingLabel}>Export Entries</Text>
              </View>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🔄</Text>
                <Text style={styles.settingLabel}>Backup & Sync</Text>
              </View>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🗑️</Text>
                <Text style={[styles.settingLabel, styles.dangerText]}>Clear All Data</Text>
              </View>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>ℹ️</Text>
                <Text style={styles.settingLabel}>Version</Text>
              </View>
              <Text style={styles.settingValue}>1.0.0</Text>
            </View>
          </View>
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
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B9A9C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  settingItemBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingIcon: {
    fontSize: 22,
  },
  settingLabel: {
    fontSize: 16,
    color: '#2C2C2C',
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 16,
    color: '#8B9A9C',
    fontWeight: '500',
  },
  settingArrow: {
    fontSize: 20,
    color: '#8B9A9C',
  },
  dangerText: {
    color: '#FF6B6B',
  },
});
