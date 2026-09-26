import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MultilanguageType } from '@/constants/global_types';

interface RandomActionProps {
    randomActionsArray: MultilanguageType[]
}

export default function RandomAction({ randomActionsArray }: RandomActionProps) {
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