import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEntries } from '@/hooks/useEntries';
import MoodSelector from '@/components/MoodSelector';
import { JournalEntry } from '@/Utils/storage';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

type MoodType = 'calm' | 'happy' | 'stressed' | 'neutral';

export default function EditEntry() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries, updateEntry } = useEntries();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodType>('neutral');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const found = entries.find(e => e.id === id);
      if (found) {
        setEntry(found);
        setTitle(found.title);
        setContent(found.content);
        setMood(found.mood);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, [id, entries]);

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert('Required', 'Please write something in your entry.');
      return;
    }

    if (!id) return;

    try {
      setSaving(true);
      await updateEntry(id, {
        title: title.trim() || 'Untitled',
        content: content.trim(),
        mood,
      });
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to update entry. Please try again.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!entry) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.textSecondary }]}>Entry not found</Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.cancelButton}
            activeOpacity={0.7}
          >
            <Text style={[styles.cancelText, { color: colors.textSecondary }]}>Cancel</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Edit Entry</Text>
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            disabled={saving}
            activeOpacity={0.7}
          >
            <Text style={[styles.saveText, { color: colors.primary }, saving && styles.saveTextDisabled]}>
              {saving ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Mood Selector */}
          <View style={[styles.moodSection, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>How are you feeling?</Text>
            <MoodSelector selectedMood={mood} onSelect={setMood} variant="emoji" />
          </View>

          {/* Title Input */}
          <View style={styles.titleSection}>
            <TextInput
              style={[styles.titleInput, { color: colors.text, borderBottomColor: colors.border }]}
              placeholder="Title (optional)"
              placeholderTextColor={colors.textSecondary}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>

          {/* Content Input */}
          <View style={styles.contentSection}>
            <TextInput
              style={[styles.contentInput, { color: colors.text }]}
              placeholder="Write your thoughts..."
              placeholderTextColor={colors.textSecondary}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              autoFocus
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveTextDisabled: {
    opacity: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  moodSection: {
    marginBottom: 40,
    borderRadius: 20,
    padding: 24,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  titleSection: {
    marginBottom: 32,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: '700',
    paddingVertical: 12,
    borderBottomWidth: 2,
    letterSpacing: -0.5,
  },
  contentSection: {
    flex: 1,
    minHeight: 400,
  },
  contentInput: {
    fontSize: 18,
    lineHeight: 28,
    padding: 0,
    flex: 1,
    letterSpacing: 0.2,
  },
});
