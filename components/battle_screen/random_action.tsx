import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RandomAction() {
  return (
    <View style={styles.container}>
      <Text>Random Action</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});