import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useProfile } from '@/hooks/useProfile';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { user, stats, loading, updateProfile, exportData } = useProfile();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert('Error', 'Name and Email are required');
      return;
    }
    setSaving(true);
    const success = await updateProfile(name, email);
    setSaving(false);
    if (success) setIsEditing(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Profile" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <Header title="Profile" />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Profile Avatar & Info */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                value={name}
                onChangeText={setName}
                placeholder="Name"
                placeholderTextColor={colors.textSecondary}
              />
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.editButtons}>
                <TouchableOpacity
                  style={[styles.saveButton, { backgroundColor: colors.primary }]}
                  onPress={handleSave}
                  disabled={saving}
                >
                  <Text style={styles.saveButtonText}>{saving ? '...' : 'Save'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.cancelButton, { borderColor: colors.border }]}
                  onPress={() => {
                    setName(user?.name || '');
                    setEmail(user?.email || '');
                    setIsEditing(false);
                  }}
                >
                  <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <Text style={[styles.name, { color: colors.text }]}>{user?.name || 'User'}</Text>
              <Text style={[styles.email, { color: colors.textSecondary }]}>{user?.email || 'email@example.com'}</Text>
            </>
          )}
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={[styles.statCard, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{stats?.total_entries || 0}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Entries</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{stats?.streak || 0}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Streak Days</Text>
          </View>
        </View>

        {/* Options Section */}
        <View style={styles.optionsSection}>
          <TouchableOpacity
            style={[styles.optionItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}
            onPress={() => setIsEditing(true)}
          >
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>✏️</Text>
              <Text style={[styles.optionText, { color: colors.text }]}>Edit Profile</Text>
            </View>
            <Text style={[styles.optionArrow, { color: colors.icon }]}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}
            onPress={() => router.push('/drawer/statistics')}
          >
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>📊</Text>
              <Text style={[styles.optionText, { color: colors.text }]}>Statistics</Text>
            </View>
            <Text style={[styles.optionArrow, { color: colors.icon }]}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}
            onPress={exportData}
          >
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>💾</Text>
              <Text style={[styles.optionText, { color: colors.text }]}>Export Data</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  editForm: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: '600',
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
