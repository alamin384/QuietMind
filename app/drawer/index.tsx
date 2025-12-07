import EntryCard from '@/components/EntryCard';
import Header from '@/components/Header';
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

  // Refresh entries when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      refreshEntries();
    }, [refreshEntries])
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FEFCF8" />
      
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
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      ) : entries.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Text style={styles.emptyEmoji}>📔</Text>
          </View>
          <Text style={styles.emptyTitle}>No entries yet</Text>
          <Text style={styles.emptyText}>
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
        style={styles.addButton}
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
    backgroundColor: '#FEFCF8',
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
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
    color: '#2C2C2C',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#8B9A9C',
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
    backgroundColor: '#8B9A9C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
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
