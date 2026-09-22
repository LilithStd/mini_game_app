import { useBattleStore } from '@/store/battle/battle_store';
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Healths from '../shared/healths';

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
  const characterStatsPreview = 
        <View style={styles.imageFullContainer}>
          <Image
            source={characterStats.model}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.statsContainer}>
            <Text>{characterStats.name}</Text>
            <Text>HP: {characterStats.stats.healPoints.current}/{characterStats.stats.healPoints.max}</Text>  
            <Text>Attack: {characterStats.stats.attack}</Text>
            <Text>Defense: {characterStats.stats.defense}</Text>
            <Text>Evasion: {characterStats.stats.evasion}</Text>
          </View>
        </View>

  return (
    <View style={styles.mainContainer}>
        {isItemsActive && characterStatsPreview}
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
    padding: 10,
    paddingBottom: 30,
    backgroundColor: 'white',
  },
  imageContainer: {
    marginTop: 30,
    width: "50%",
    aspectRatio: 500/500,
    overflow: 'hidden',
    borderRadius: 200,
  },
  imageFullContainer: {
    // marginTop: 30,
    width: "100%",
    top: 20,
    aspectRatio: 1024/1536,
    overflow: 'hidden',
    borderRadius: 20,
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
