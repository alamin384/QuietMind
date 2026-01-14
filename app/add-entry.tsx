import React, { useState } from 'react';
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
} from 'react-native';
import { useRouter } from 'expo-router';
import { useEntries } from '@/hooks/useEntries';
import MoodSelector from '@/components/MoodSelector';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

type MoodType = 'calm' | 'happy' | 'stressed' | 'neutral';

export default function AddEntry() {
  const router = useRouter();
  const { addEntry } = useEntries();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodType>('neutral');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert('Required', 'Please write something in your entry.');
      return;
    }

    try {
      setSaving(true);
      await addEntry(title.trim() || 'Untitled', content.trim(), mood);
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to save entry. Please try again.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

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
          <Text style={[styles.headerTitle, { color: colors.text }]}>New Entry</Text>
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
