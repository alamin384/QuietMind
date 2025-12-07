import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
 

export default function HomeScreen() {
  const navigation = useNavigation();
   const router = useRouter();


  // Temporary mock data (we will replace later)
  const entries = [
    { id: '1', mood: '🙂', text: 'Had a calm day today...' },
    { id: '2', mood: '😐', text: 'Feeling a bit tired but okay.' },
  ];

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>QuietMind</Text>

        {/* FIXED: Open Drawer */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Entry List */}
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <Text style={styles.mood}>{item.mood}</Text>
            <Text style={styles.preview}>{item.text}</Text>
          </View>
        )}
      />

      {/* Floating + Button */}
      <TouchableOpacity
  style={styles.addBtn}
  onPress={() => router.push('/add-entry')}
>
  <Text style={styles.addText}>+</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
  },

  menu: {
    fontSize: 28,
    fontWeight: '600',
  },

  entryCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 2,
  },

  mood: {
    fontSize: 22,
  },

  preview: {
    fontSize: 15,
    color: '#444',
    flex: 1,
  },

  addBtn: {
    position: 'absolute',
    right: 20,
    bottom: 35,
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#3C6E71',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    fontSize: 35,
    color: '#fff',
    marginTop: -3,
  },
});
