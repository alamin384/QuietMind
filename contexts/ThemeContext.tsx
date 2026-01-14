import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useSystemColorScheme } from 'react-native';

const THEME_KEY = '@quietmind_theme';
export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  colorScheme: 'light' | 'dark';
  themeMode: ThemeMode;
  toggleTheme: () => Promise<void>;
  setTheme: (mode: ThemeMode) => Promise<void>;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
          setThemeMode(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTheme();
  }, []);

  // Get the actual color scheme to use
  const colorScheme: 'light' | 'dark' = useMemo(() => {
    return themeMode === 'system' 
      ? (systemColorScheme ?? 'light')
      : themeMode;
  }, [themeMode, systemColorScheme]);

  // Toggle between light and dark (ignoring system)
  const toggleTheme = useCallback(async () => {
    try {
      // Calculate current color scheme
      const currentColorScheme: 'light' | 'dark' = 
        themeMode === 'system' 
          ? (systemColorScheme ?? 'light')
          : themeMode;
      
      const newTheme: ThemeMode = currentColorScheme === 'dark' ? 'light' : 'dark';
      setThemeMode(newTheme);
      await AsyncStorage.setItem(THEME_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [themeMode, systemColorScheme]);

  // Set theme explicitly
  const setTheme = useCallback(async (mode: ThemeMode) => {
    try {
      setThemeMode(mode);
      await AsyncStorage.setItem(THEME_KEY, mode);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, []);

  const contextValue = useMemo(() => ({
    colorScheme,
    themeMode,
    toggleTheme,
    setTheme,
    isLoading,
  }), [colorScheme, themeMode, toggleTheme, setTheme, isLoading]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
