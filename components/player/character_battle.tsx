import { useBattleStore } from '@/store/battle/battle_store';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CharacterBattle() {
  const characterStats = useBattleStore((state) => state.character);
  return (
    <View>
        <Text>Character battle</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})
