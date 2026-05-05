import api from '@/services/api';
import { JournalEntry } from '@/Utils/storage';
import { useCallback, useEffect, useState } from 'react';

export function useEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const mapBackendEntry = (entry: any): JournalEntry => ({
    id: entry.id.toString(),
    title: entry.title,
    content: entry.content,
    mood: entry.mood as any,
    createdAt: entry.created_at,
    updatedAt: entry.updated_at,
  });

  const loadEntries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/posts'); // Using /posts based on current routes
      const mappedData = response.data.map(mapBackendEntry);
      setEntries(mappedData);
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
      const response = await api.post('/posts', { title, content, mood });
      const newEntry = mapBackendEntry(response.data);
      setEntries(prev => [newEntry, ...prev]);
      return newEntry;
    } catch (error) {
      console.error('Error adding entry:', error);
      throw error;
    }
  }, []);

  const updateEntry = useCallback(async (
    id: string,
    updates: Partial<Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>>
  ) => {
    try {
      const response = await api.put(`/posts/${id}`, updates);
      const updated = mapBackendEntry(response.data);
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
      await api.delete(`/posts/${id}`);
      setEntries(prev => prev.filter(e => e.id !== id));
      return true;
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

