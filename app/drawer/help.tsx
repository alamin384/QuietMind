import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Help() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help</Text>
      <Text style={styles.text}>If you need help, instructions will be shown here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, paddingTop:60, backgroundColor:'#F7F8FA' },
  title:{ fontSize:24, fontWeight:'700', marginBottom:8 },
  text:{ color:'#444' }
});
