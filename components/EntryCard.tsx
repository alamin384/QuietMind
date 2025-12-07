import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MoodColors, MoodEmojis } from '@/constants/theme';
import { JournalEntry } from '@/Utils/storage';

interface EntryCardProps {
  entry: JournalEntry;
  onPress: () => void;
}

export default function EntryCard({ entry, onPress }: EntryCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const preview = entry.content.length > 120 
    ? entry.content.substring(0, 120) + '...' 
    : entry.content;

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.moodContainer}>
            <View 
              style={[
                styles.moodIndicator, 
                { backgroundColor: MoodColors[entry.mood] }
              ]}
            />
            <Text style={styles.moodEmoji}>{MoodEmojis[entry.mood]}</Text>
          </View>
          <Text style={styles.date}>{formatDate(entry.createdAt)}</Text>
        </View>
        
        {entry.title && entry.title !== 'Untitled' && (
          <Text style={styles.title} numberOfLines={1}>
            {entry.title}
          </Text>
        )}
        
        <Text style={styles.preview} numberOfLines={3}>
          {preview || 'No content'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  moodIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  moodEmoji: {
    fontSize: 22,
  },
  date: {
    fontSize: 13,
    color: '#8B9A9C',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  preview: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 24,
    letterSpacing: 0.1,
  },
});
