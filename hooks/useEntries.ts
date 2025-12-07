import { useState, useEffect, useCallback } from 'react';
import { storage, JournalEntry } from '@/Utils/storage';

export function useEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await storage.getEntries();
      setEntries(data);
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const addEntry = useCallback(async (
    title: string,
    content: string,
    mood: 'calm' | 'happy' | 'stressed' | 'neutral'
  ) => {
    try {
      const newEntry = await storage.saveEntry({ title, content, mood });
      setEntries(prev => [newEntry, ...prev]);
      return newEntry;
    } catch (error) {
      console.error('Error adding entry:', error);
      throw error;
    }
  }, []);

  const updateEntry = useCallback(async (
    id: string,
    updates: Partial<Omit<JournalEntry, 'id' | 'createdAt'>>
  ) => {
    try {
      const updated = await storage.updateEntry(id, updates);
      if (updated) {
        setEntries(prev => prev.map(e => e.id === id ? updated : e));
      }
      return updated;
    } catch (error) {
      console.error('Error updating entry:', error);
      throw error;
    }
  }, []);

  const deleteEntry = useCallback(async (id: string) => {
    try {
      const success = await storage.deleteEntry(id);
      if (success) {
        setEntries(prev => prev.filter(e => e.id !== id));
      }
      return success;
    } catch (error) {
      console.error('Error deleting entry:', error);
      return false;
    }
  }, []);

  return {
    entries,
    loading,
    addEntry,
    updateEntry,
    deleteEntry,
    refreshEntries: loadEntries,
  };
}

