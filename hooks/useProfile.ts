import api from '@/services/api';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export interface UserProfile {
    id: number;
    name: string;
    email: string;
}

export interface UserStats {
    total_entries: number;
    streak: number;
    mood_distribution: { mood: string; count: number }[];
}

export function useProfile() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [userRes, statsRes] = await Promise.all([
                api.get('/user'),
                api.get('/user/stats')
            ]);
            setUser(userRes.data);
            setStats(statsRes.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const updateProfile = async (name: string, email: string, password?: string, password_confirmation?: string) => {
        try {
            const data: any = { name, email };
            if (password) {
                data.password = password;
                data.password_confirmation = password_confirmation;
            }
            const response = await api.post('/user/update', data);
            setUser(response.data.user);
            Alert.alert('Success', 'Profile updated successfully');
            return true;
        } catch (error: any) {
            console.error('Error updating profile:', error);
            Alert.alert('Update Failed', error.response?.data?.message || 'Something went wrong');
            return false;
        }
    };

    const exportData = async () => {
        try {
            const response = await api.get('/user/export', { responseType: 'text' });
            // In a real app with expo-file-system, we would save correctly.
            // For now, we'll log it and alert.
            console.log('Exported CSV Data:', response.data);
            Alert.alert('Export Success', 'Your data has been exported as CSV. (Check console logs for the full sheet)');
            return response.data;
        } catch (error) {
            console.error('Error exporting data:', error);
            Alert.alert('Export Failed', 'Could not export data.');
            return null;
        }
    };

    const clearAllData = async () => {
        try {
            await api.delete('/user/clear-data');
            await fetchData(); // Refresh stats
            Alert.alert('Success', 'All your journal entries have been cleared.');
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
            Alert.alert('Error', 'Failed to clear data.');
            return false;
        }
    };

    return {
        user,
        stats,
        loading,
        updateProfile,
        exportData,
        clearAllData,
        refreshProfile: fetchData,
    };
}
