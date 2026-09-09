import { useBattleStore } from '@/store/battle/battle_store';
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Healths from '../shared/healths';

export default function CharacterBattle() {
  const characterStats = useBattleStore((state) => state.character);
  return (
    <View>
        <Text>Character battle</Text>
        <Healths values={{ current: characterStats.healPoints.current, max: characterStats.healPoints.max }} />
        <Image source={characterStats.model} style={styles.image} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
})
