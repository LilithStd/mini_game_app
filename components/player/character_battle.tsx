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
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    // margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  imageContainer: {
    marginTop: 10,
    width: 200,
    aspectRatio: 500/500,
    overflow: 'hidden',
    borderRadius: 200,
  },
  image: {
    width: '100%',
    flex: 1,
  },
})
