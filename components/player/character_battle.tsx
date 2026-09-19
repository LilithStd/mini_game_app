import { useBattleStore } from '@/store/battle/battle_store';
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Healths from '../shared/healths';
const playerPreview = require('../../assets/character/player_preview.jpg')
const chestPreview = require('../../assets/items/chest/chest_01.jpg')

interface CharacterBattleProps {
  isItemsActive: boolean;
}

export default function CharacterBattle({ isItemsActive }: CharacterBattleProps) {
  const characterStats = useBattleStore((state) => state.character);

  const fullCharacterComponent = <View style={styles.mainContainer}>
        <Text>Character battle</Text>
        <Healths values={{ current: characterStats.stats.healPoints.current, max: characterStats.stats.healPoints.max }} />
        <Image source={characterStats.model} style={styles.image}  resizeMode="contain"/>
    </View>

  return (
    <View style={styles.mainContainer}>
        <Text>Character battle</Text>
        <Healths values={{ current: characterStats.stats.healPoints.current, max: characterStats.stats.healPoints.max }} />
        <View style={styles.imageContainer}>
          <Image
            source={isItemsActive ? chestPreview : characterStats.preview}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        {/* <Image
          source={isItemsActive ? chestPreview : characterStats.preview}
          style={{
            // position: 'absolute',
            left: -150,
            top:-120,
            borderRadius: 1000,
            transform: [{ scale: 0.4 }]
          }}
        /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    // bottom:550,
    // margin: 10,
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
