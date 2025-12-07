import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default function AddEntry() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Entry</Text>
      <TextInput
        placeholder="Write your thoughts..."
        multiline
        style={styles.input}
      />
      <TouchableOpacity style={styles.save}>
        <Text style={{ color: '#fff' }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, paddingTop:60, backgroundColor:'#F7F8FA' },
  title:{ fontSize:24, fontWeight:'700', marginBottom:12 },
  input:{ backgroundColor:'#fff', borderRadius:10, padding:12, minHeight:200, textAlignVertical:'top' },
  save:{ marginTop:16, alignSelf:'center', paddingHorizontal:24, paddingVertical:12, borderRadius:10, backgroundColor:'#3C6E71' }
});
