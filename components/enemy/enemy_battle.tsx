import { useBattleStore } from '@/store/battle/battle_store';
import React from 'react'
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import Healths from '../shared/healths';

export default function EnemyBattle() {
  const enemyStats = useBattleStore((state) => state.enemy);
  const { height } = useWindowDimensions();
  const previewHeight = height * 0.66;

  return (
    <View style={styles.mainContainer}>
        <Text>Enemy battle</Text>
        <Healths values={{ current: enemyStats.stats.healPoints.current, max: enemyStats.stats.healPoints.max }} />
        <View style={[styles.imageContainer, { height: previewHeight }]}>
          <Image source={enemyStats.model} style={styles.image} resizeMode="contain" />
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    padding: 10,
    paddingBottom: 30,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1024/1536,
    backgroundColor: 'grey',
    overflow: 'hidden',
    borderRadius: 20,
  },
  image: {
    width: '100%',
    flex: 1,
  },
})
