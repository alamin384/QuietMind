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

type MoodType = 'calm' | 'happy' | 'stressed' | 'neutral';

export default function EditEntry() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries, updateEntry } = useEntries();
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
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B9A9C" />
        </View>
      </SafeAreaView>
    );
  }

  if (!entry) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Entry not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.cancelButton}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Entry</Text>
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            disabled={saving}
            activeOpacity={0.7}
          >
            <Text style={[styles.saveText, saving && styles.saveTextDisabled]}>
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
          <View style={styles.moodSection}>
            <Text style={styles.sectionLabel}>How are you feeling?</Text>
            <MoodSelector selectedMood={mood} onSelect={setMood} variant="emoji" />
          </View>

          {/* Title Input */}
          <View style={styles.titleSection}>
            <TextInput
              style={styles.titleInput}
              placeholder="Title (optional)"
              placeholderTextColor="#B0B0B0"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>

          {/* Content Input */}
          <View style={styles.contentSection}>
            <TextInput
              style={styles.contentInput}
              placeholder="Write your thoughts..."
              placeholderTextColor="#B0B0B0"
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
    backgroundColor: '#FFFFFF',
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
    color: '#8B9A9C',
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#8B9A9C',
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
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cancelText: {
    fontSize: 16,
    color: '#8B9A9C',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
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
    color: '#8B9A9C',
    fontWeight: '600',
  },
  saveTextDisabled: {
    color: '#999',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  moodSection: {
    marginBottom: 40,
    backgroundColor: '#FEFCF8',
    borderRadius: 20,
    padding: 24,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 20,
    textAlign: 'center',
  },
  titleSection: {
    marginBottom: 32,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C2C2C',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#F0F0F0',
    letterSpacing: -0.5,
  },
  contentSection: {
    flex: 1,
    minHeight: 400,
  },
  contentInput: {
    fontSize: 18,
    color: '#2C2C2C',
    lineHeight: 28,
    padding: 0,
    flex: 1,
    letterSpacing: 0.2,
  },
});
