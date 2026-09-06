import { useBattleStore } from '@/store/battle/battle_store';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default function EnemyBattle() {
  const enemyStats = useBattleStore((state) => state.enemy);
  return (
    <View>
        <Text>Enemy battle</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})
