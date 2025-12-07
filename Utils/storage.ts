import AsyncStorage from '@react-native-async-storage/async-storage';

const ENTRIES_KEY = '@quietmind_entries';

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: 'calm' | 'happy' | 'stressed' | 'neutral';
  createdAt: string;
  updatedAt: string;
}

export const storage = {
  async getEntries(): Promise<JournalEntry[]> {
    try {
      const data = await AsyncStorage.getItem(ENTRIES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting entries:', error);
      return [];
    }
  },

  async saveEntry(entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<JournalEntry> {
    try {
      const entries = await this.getEntries();
      const newEntry: JournalEntry = {
        ...entry,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      entries.unshift(newEntry); // Add to beginning
      await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
      return newEntry;
    } catch (error) {
      console.error('Error saving entry:', error);
      throw error;
    }
  },

  async updateEntry(id: string, updates: Partial<Omit<JournalEntry, 'id' | 'createdAt'>>): Promise<JournalEntry | null> {
    try {
      const entries = await this.getEntries();
      const index = entries.findIndex(e => e.id === id);
      if (index === -1) return null;
      
      entries[index] = {
        ...entries[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
      return entries[index];
    } catch (error) {
      console.error('Error updating entry:', error);
      throw error;
    }
  },

  async deleteEntry(id: string): Promise<boolean> {
    try {
      const entries = await this.getEntries();
      const filtered = entries.filter(e => e.id !== id);
      await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting entry:', error);
      return false;
    }
  },

  async getEntry(id: string): Promise<JournalEntry | null> {
    try {
      const entries = await this.getEntries();
      return entries.find(e => e.id === id) || null;
    } catch (error) {
      console.error('Error getting entry:', error);
      return null;
    }
  },
};

