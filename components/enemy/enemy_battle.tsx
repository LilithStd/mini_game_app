import { useBattleStore } from '@/store/battle/battle_store';
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Healths from '../shared/healths';
export default function EnemyBattle() {
  const enemyStats = useBattleStore((state) => state.enemy);
  return (
    <View style={styles.mainContainer}>
        <Text>Enemy battle</Text>
        <Healths values={{ current: enemyStats.stats.healPoints.current, max: enemyStats.stats.healPoints.max }} />
        <View style={styles.imageContainer}>
          <Image source={enemyStats.model} style={styles.image} resizeMode="contain" />
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    padding: 10,

  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    aspectRatio: 1024/1536,
    overflow: 'hidden',
    paddingTop: 10,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    flex: 1,
  },
})
