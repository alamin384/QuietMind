import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.text}>Theme, reminders and privacy options will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, paddingTop:60, backgroundColor:'#F7F8FA' },
  title:{ fontSize:24, fontWeight:'700', marginBottom:8 },
  text:{ color:'#444' }
});
