/**
 * QuietMind Journal App Theme
 * Minimal, clean, soft journal vibe with pastel colors
 */

import { Platform } from 'react-native';

// Soft pastel mood colors
export const MoodColors = {
  calm: '#A8D5E2',      // Soft blue
  happy: '#FFE5B4',     // Soft yellow/cream
  stressed: '#FFB3BA',  // Soft red/pink
  neutral: '#E8E8E8',   // Soft gray
};

// Mood emojis
export const MoodEmojis = {
  calm: '😌',
  happy: '😊',
  stressed: '😰',
  neutral: '😐',
};

export const Colors = {
  light: {
    text: '#2C2C2C',
    textSecondary: '#666666',
    background: '#FEFCF8',        // Cream white
    cardBackground: '#FFFFFF',
    tint: '#8B9A9C',               // Soft teal
    icon: '#8B9A9C',
    border: '#E8E8E8',
    shadow: 'rgba(0, 0, 0, 0.05)',
    primary: '#8B9A9C',
    accent: '#A8D5E2',
  },
  dark: {
    text: '#F5F5F5',
    textSecondary: '#B0B0B0',
    background: '#1A1A1A',
    cardBackground: '#2C2C2C',
    tint: '#A8D5E2',
    icon: '#A8D5E2',
    border: '#404040',
    shadow: 'rgba(0, 0, 0, 0.3)',
    primary: '#A8D5E2',
    accent: '#8B9A9C',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
