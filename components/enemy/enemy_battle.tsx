import { useBattleStore } from '@/store/battle/battle_store';
import React from 'react'
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import Healths from '../shared/healths';

export default function EnemyBattle() {
  const enemyStats = useBattleStore((state) => state.enemy);
  const { height } = useWindowDimensions();
  const previewHeight = height * 0.56;

  // state
  const [isOpenStats, setIsOpenStats] = React.useState(false);

  // components
  const statsComponent = (
    <View style={styles.statsContainer}>
      <Text>Attack: {enemyStats.stats.attack}</Text>
      <Text>Defense: {enemyStats.stats.defense}</Text>
      <Text>Evasion: {enemyStats.stats.evasion}</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
     
        
        <View style={[styles.imageContainer, { height: previewHeight }]}>
          <Image source={enemyStats.model} style={styles.image} resizeMode="cover" />
        </View>
        {isOpenStats && statsComponent}
           <Text>Enemy battle</Text>
        <View style={styles.healthContainer}>
          <Healths values={{ current: enemyStats.stats.healPoints.current, max: enemyStats.stats.healPoints.max }} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    padding: 10,
    // paddingBottom: 30,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    // aspectRatio: 1024/1536,
    backgroundColor: 'grey',
    overflow: 'hidden',
    borderRadius: 20,
  },
  healthContainer: {
    marginBottom: 10,
  },
    statsContainer:{
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 20,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    margin: 10,
  },
  image: {
    width: '100%',
    flex: 1,
  },
})
