import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Switch, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';
import { Colors } from '@/constants/theme';
import Header from '@/components/Header';


export default function Settings() {
  const colorScheme = useColorScheme();
  const { toggleTheme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(false);
  const [biometric, setBiometric] = useState(false);

  const colors = Colors[colorScheme];

  const handleThemeToggle = async (value: boolean) => {
    const newTheme = value ? 'dark' : 'light';
    await setTheme(newTheme);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <Header title="Settings" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Appearance</Text>
          <View style={[styles.settingCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🎨</Text>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
              </View>
              <Switch
                value={colorScheme === 'dark'}
                onValueChange={handleThemeToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Notifications</Text>
          <View style={[styles.settingCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🔔</Text>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Enable Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={[styles.settingItem, { borderTopColor: colors.border }, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>⏰</Text>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Daily Reminders</Text>
              </View>
              <Switch
                value={reminders}
                onValueChange={setReminders}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Security</Text>
          <View style={[styles.settingCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🔐</Text>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Biometric Lock</Text>
              </View>
              <Switch
                value={biometric}
                onValueChange={setBiometric}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Data</Text>
          <View style={[styles.settingCard, { backgroundColor: colors.cardBackground }]}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>📤</Text>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Export Entries</Text>
              </View>
              <Text style={[styles.settingArrow, { color: colors.icon }]}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.settingItem, { borderTopColor: colors.border }, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🔄</Text>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Backup & Sync</Text>
              </View>
              <Text style={[styles.settingArrow, { color: colors.icon }]}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🗑️</Text>
                <Text style={[styles.settingLabel, styles.dangerText]}>Clear All Data</Text>
              </View>
              <Text style={[styles.settingArrow, { color: colors.icon }]}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>About</Text>
          <View style={[styles.settingCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>ℹ️</Text>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Version</Text>
              </View>
              <Text style={[styles.settingValue, { color: colors.textSecondary }]}>1.0.0</Text>
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
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingCard: {
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
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingArrow: {
    fontSize: 20,
  },
  dangerText: {
    color: '#FF6B6B',
  },
});
