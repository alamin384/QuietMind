import Header from '@/components/Header';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function About() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <Header title="About" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.logoSection}>
          <View style={[styles.logoContainer, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
            <Text style={styles.logo}>📔</Text>
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>QuietMind</Text>
          <Text style={[styles.version, { color: colors.textSecondary }]}>Version 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            A beautiful, minimal journaling app designed to help you reflect, 
            express, and track your thoughts and emotions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
          <View style={styles.featureList}>
            <View style={[styles.featureItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
              <Text style={styles.featureIcon}>✨</Text>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Beautiful, minimal interface</Text>
            </View>
            <View style={[styles.featureItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
              <Text style={styles.featureIcon}>😊</Text>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Mood tracking</Text>
            </View>
            <View style={[styles.featureItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
              <Text style={styles.featureIcon}>🔒</Text>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Private and secure</Text>
            </View>
            <View style={[styles.featureItem, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
              <Text style={styles.featureIcon}>💾</Text>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Local storage</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Made with ❤️ for mindful living
          </Text>
          <Text style={[styles.footerSubtext, { color: colors.textSecondary }]}>
            © 2025 QuietMind. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  logo: {
    fontSize: 64,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureText: {
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 16,
  },
  footerText: {
    fontSize: 15,
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 12,
  },
});
