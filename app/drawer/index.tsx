import EntryCard from '@/components/EntryCard';
import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEntries } from '@/hooks/useEntries';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { entries, loading, refreshEntries } = useEntries();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  // Refresh entries when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      refreshEntries();
    }, [refreshEntries])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      
      <Header 
        title="QuietMind" 
        subtitle={
          entries.length === 0 
            ? 'Start your journaling journey' 
            : `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`
        }
      />

      {/* Entry List */}
      {loading ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Loading...</Text>
        </View>
      ) : entries.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={[styles.emptyIconContainer, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
            <Text style={styles.emptyEmoji}>📔</Text>
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No entries yet</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Tap the + button to create your first journal entry
          </Text>
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EntryCard
              entry={item}
              onPress={() => router.push({
                pathname: '/view-entry',
                params: { id: item.id }
              })}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating + Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary, shadowColor: colors.shadow }]}
        onPress={() => router.push('/add-entry')}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  emptyEmoji: {
    fontSize: 64,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  addButtonText: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: '300',
    marginTop: -4,
  },
});
