import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MoodColors, MoodEmojis } from '@/constants/theme';

type MoodType = 'calm' | 'happy' | 'stressed' | 'neutral';

interface MoodSelectorProps {
  selectedMood?: MoodType;
  onSelect: (mood: MoodType) => void;
  variant?: 'circles' | 'emoji';
}

export default function MoodSelector({ 
  selectedMood, 
  onSelect, 
  variant = 'circles' 
}: MoodSelectorProps) {
  const moods: { type: MoodType; label: string; color: string; emoji: string }[] = [
    { type: 'calm', label: 'Calm', color: MoodColors.calm, emoji: MoodEmojis.calm },
    { type: 'happy', label: 'Happy', color: MoodColors.happy, emoji: MoodEmojis.happy },
    { type: 'stressed', label: 'Stressed', color: MoodColors.stressed, emoji: MoodEmojis.stressed },
    { type: 'neutral', label: 'Neutral', color: MoodColors.neutral, emoji: MoodEmojis.neutral },
  ];

  if (variant === 'emoji') {
    return (
      <View style={styles.emojiContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.type}
            onPress={() => onSelect(mood.type)}
            style={[
              styles.emojiButton,
              selectedMood === mood.type && styles.emojiButtonSelected,
            ]}
          >
            <Text style={styles.emoji}>{mood.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <TouchableOpacity
          key={mood.type}
          onPress={() => onSelect(mood.type)}
          style={styles.moodItem}
        >
          <View
            style={[
              styles.circle,
              { backgroundColor: mood.color },
              selectedMood === mood.type && styles.circleSelected,
            ]}
          />
          <Text style={styles.label}>{mood.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
  },
  moodItem: {
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  circleSelected: {
    borderColor: '#8B9A9C',
    transform: [{ scale: 1.1 }],
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
  },
  emojiButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  emojiButtonSelected: {
    backgroundColor: '#E8E8E8',
    transform: [{ scale: 1.15 }],
  },
  emoji: {
    fontSize: 28,
  },
});

