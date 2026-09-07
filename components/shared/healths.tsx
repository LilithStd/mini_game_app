import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface HealthsProps {
    values: {
        current: number;
        max: number;
    }
}

export default function Healths({ values }: HealthsProps) {
  return    (
    <View>
      <Text>healths</Text>
      <Text>{values.current} / {values.max}</Text>
    </View>
  )
}



const styles = StyleSheet.create({
});