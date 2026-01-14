import { useTheme } from './use-theme';

export function useColorScheme(): 'light' | 'dark' {
  const { colorScheme } = useTheme();
  return colorScheme;
}
