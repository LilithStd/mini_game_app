import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface HealthsProps {
    values: {
        current: number;
        max: number;
    }
}

export default function Healths() {
  return    (
    <View>
      <Text>healths</Text>
    </View>
  )
}



const styles = StyleSheet.create({
});