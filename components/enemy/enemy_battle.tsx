import { useBattleStore } from '@/store/battle/battle_store';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Healths from '../shared/healths';
export default function EnemyBattle() {
  const enemyStats = useBattleStore((state) => state.enemy);
  return (
    <View>
        <Text>Enemy battle</Text>
        <Healths values={{ current: enemyStats.stats.healPoints.current, max: enemyStats.stats.healPoints.max }} />
    </View>
  )
}

const styles = StyleSheet.create({

})
