import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEntries } from '@/hooks/useEntries';
import { MoodColors, MoodEmojis } from '@/constants/theme';
import { JournalEntry } from '@/Utils/storage';
import Header from '@/components/Header';

export default function ViewEntry() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries, deleteEntry } = useEntries();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      const found = entries.find(e => e.id === id);
      setEntry(found || null);
      setLoading(false);
    }
  }, [id, entries]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (!id) return;
            setDeleting(true);
            const success = await deleteEntry(id);
            setDeleting(false);
            if (success) {
              router.back();
            } else {
              Alert.alert('Error', 'Failed to delete entry. Please try again.');
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
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
        <Header title="Entry" showMenu={false} />
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
      
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push({
            pathname: '/edit-entry',
            params: { id: entry.id }
          })}
          style={styles.editButton}
        >
          <Text style={styles.editIcon}>✎</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mood Indicator */}
        <View style={styles.moodSection}>
          <View
            style={[
              styles.moodCircle,
              { backgroundColor: MoodColors[entry.mood] },
            ]}
          >
            <Text style={styles.moodEmoji}>{MoodEmojis[entry.mood]}</Text>
          </View>
        </View>

        {/* Date */}
        <View style={styles.dateSection}>
          <Text style={styles.date}>{formatDate(entry.createdAt)}</Text>
          <Text style={styles.time}>{formatTime(entry.createdAt)}</Text>
        </View>

        {/* Title */}
        {entry.title && entry.title !== 'Untitled' && (
          <Text style={styles.title}>{entry.title}</Text>
        )}

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{entry.content}</Text>
        </View>
      </ScrollView>

      {/* Delete Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.deleteButton, deleting && styles.deleteButtonDisabled]}
          onPress={handleDelete}
          disabled={deleting}
          activeOpacity={0.8}
        >
          {deleting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.deleteButtonText}>Delete Entry</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backIcon: {
    fontSize: 28,
    color: '#2C2C2C',
    fontWeight: '600',
  },
  editButton: {
    padding: 8,
    marginRight: -8,
  },
  editIcon: {
    fontSize: 24,
    color: '#8B9A9C',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  moodSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  moodCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  moodEmoji: {
    fontSize: 48,
  },
  dateSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  date: {
    fontSize: 17,
    color: '#8B9A9C',
    fontWeight: '600',
    marginBottom: 6,
  },
  time: {
    fontSize: 15,
    color: '#B0B0B0',
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 24,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  contentContainer: {
    backgroundColor: '#FEFCF8',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  content: {
    fontSize: 18,
    color: '#2C2C2C',
    lineHeight: 30,
    letterSpacing: 0.2,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  deleteButtonDisabled: {
    opacity: 0.6,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
