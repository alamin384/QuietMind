import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ViewEntry() {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>Dec 1, 2025</Text>
      <Text style={styles.title}>Entry Title</Text>
      <Text style={styles.body}>This is the full journal entry text.</Text>
      <TouchableOpacity style={styles.delete}>
        <Text style={{ color: '#fff' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, paddingTop:60, backgroundColor:'#F7F8FA' },
  date:{ color:'#666', marginBottom:8 },
  title:{ fontSize:22, fontWeight:'700', marginBottom:12 },
  body:{ fontSize:16, color:'#333' },
  delete:{ marginTop:24, backgroundColor:'#B00020', padding:10, borderRadius:8, alignSelf:'flex-start' }
});
