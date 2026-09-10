import { useBattleStore } from '@/store/battle/battle_store';
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Healths from '../shared/healths';

export default function CharacterBattle() {
  const characterStats = useBattleStore((state) => state.character);
  return (
    <View style={styles.mainContainer}>
        <Text>Character battle</Text>
        <Healths values={{ current: characterStats.stats.healPoints.current, max: characterStats.stats.healPoints.max }} />
        <Image source={characterStats.model} style={styles.image} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
  },
    image: {
        width: "100%",
        height: "100%",
    },
})
