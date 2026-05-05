import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

const API_URL = 'http://172.20.10.2:8000/api';
const TOKEN_KEY = '@quietmind_auth_token';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
});

// Load token from storage on initialize - only on client side
const initializeAuth = async () => {
    try {
        if (Platform.OS !== 'web' || typeof window !== 'undefined') {
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }
    } catch (e) {
        console.error('Failed to load auth token', e);
    }
};

initializeAuth();

export const setAuthToken = async (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        if (Platform.OS !== 'web' || typeof window !== 'undefined') {
            await AsyncStorage.setItem(TOKEN_KEY, token);
        }
    } else {
        delete api.defaults.headers.common['Authorization'];
        if (Platform.OS !== 'web' || typeof window !== 'undefined') {
            await AsyncStorage.removeItem(TOKEN_KEY);
        }
    }
};

export default api;
