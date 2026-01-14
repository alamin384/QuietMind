import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showMenu?: boolean;
}

export default function Header({ title, subtitle, showMenu = true }: HeaderProps) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle && <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
      </View>
      
      {showMenu && (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.menuButton}
          activeOpacity={0.7}
        >
          <View style={styles.menuIconContainer}>
            <View style={[styles.menuLine, { backgroundColor: colors.text }]} />
            <View style={[styles.menuLine, { backgroundColor: colors.text }]} />
            <View style={[styles.menuLine, { backgroundColor: colors.text }]} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 2,
  },
  menuButton: {
    padding: 8,
    marginTop: 4,
    marginLeft: 12,
  },
  menuIconContainer: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: 24,
    height: 2,
    borderRadius: 1,
  },
});

