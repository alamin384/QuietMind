import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useProfile } from '@/hooks/useProfile';
import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function Statistics() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];
    const { stats, loading } = useProfile();

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="Statistics" />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
            <Header title="Statistics" />

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
                    <View style={styles.statsGrid}>
                        <View style={[styles.statBox, { backgroundColor: colors.cardBackground }]}>
                            <Text style={[styles.statValue, { color: colors.primary }]}>{stats?.total_entries || 0}</Text>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Entries</Text>
                        </View>
                        <View style={[styles.statBox, { backgroundColor: colors.cardBackground }]}>
                            <Text style={[styles.statValue, { color: colors.primary }]}>{stats?.streak || 0}</Text>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Current Streak</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Mood Distribution</Text>
                    {stats?.mood_distribution && stats.mood_distribution.length > 0 ? (
                        stats.mood_distribution.map((item, index) => (
                            <View key={index} style={[styles.moodRow, { borderBottomColor: colors.border }]}>
                                <Text style={[styles.moodLabel, { color: colors.text }]}>{item.mood.charAt(0).toUpperCase() + item.mood.slice(1)}</Text>
                                <View style={styles.barContainer}>
                                    <View
                                        style={[
                                            styles.bar,
                                            {
                                                width: `${(item.count / stats.total_entries) * 100}%`,
                                                backgroundColor: colors.primary
                                            }
                                        ]}
                                    />
                                </View>
                                <Text style={[styles.moodCount, { color: colors.textSecondary }]}>{item.count}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No mood data available yet.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 16,
    },
    statBox: {
        flex: 1,
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statValue: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 13,
        fontWeight: '500',
    },
    moodRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    moodLabel: {
        width: 80,
        fontSize: 15,
        fontWeight: '500',
    },
    barContainer: {
        flex: 1,
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginHorizontal: 12,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        borderRadius: 4,
    },
    moodCount: {
        width: 30,
        fontSize: 14,
        textAlign: 'right',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 15,
    }
});
