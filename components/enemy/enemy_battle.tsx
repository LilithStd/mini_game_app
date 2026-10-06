import { useBattleStore } from '@/store/battle/battle_store';
import React from 'react'
import { View, Text, StyleSheet, Image, useWindowDimensions, ImageBackground, TouchableOpacity } from 'react-native'
import Healths from '../shared/healths';
const buttonOrange = require('../../assets/buttons/orange_button_01(small).png')
const buttonDisabled = require('../../assets/buttons/orange_button_01(small_disabled).png')

export default function EnemyBattle() {
  const enemyStats = useBattleStore((state) => state.enemy);
  const { height } = useWindowDimensions();
  const previewHeight = height * 0.62;

  // state
  const [isOpenStats, setIsOpenStats] = React.useState(false);
    // functions
  const toggleStats = () => {
    setIsOpenStats(!isOpenStats);
  };
  // components
  const changeStatsViewButton = (
      <TouchableOpacity
        style={styles.buttonBackground}                        
        onPress={toggleStats}
      >                            
        <ImageBackground
          source={buttonOrange}
          style={styles.buttonBackground}
        >
          <Text style={styles.buttonText}>STATS</Text>
        </ImageBackground>
      </TouchableOpacity>
  )
  const statsComponent = (
    <View style={styles.statsSubContainer}>
      <Text>Attack: {enemyStats.stats.attack}</Text>
      <Text>Defense: {enemyStats.stats.defense}</Text>
      <Text>Evasion: {enemyStats.stats.evasion}</Text>
    </View>
  );
  const defaultStatsComponent = (
    <View style={styles.statsSubContainer}>
      <Text>Attack: {enemyStats.stats.attack}</Text>
      <Text>Defense: {enemyStats.stats.defense}</Text>
      <Text>Evasion: {enemyStats.stats.evasion}</Text>
      
    </View>
  );
  const enemyStatsComponent = (
    <View style={styles.statsContainer}>
      <View style={styles.buttonContainer}>
        {isOpenStats ? statsComponent : defaultStatsComponent}
        {changeStatsViewButton}
      </View>
    </View>
  )

  






  return (
    <View style={styles.mainContainer}>
     
        
        <View style={[styles.imageContainer, { height: previewHeight }]}>
          <Image source={enemyStats.model} style={styles.image} resizeMode="cover" />
        </View>
        {enemyStatsComponent}
        
           
          {/* <View style={styles.healthContainer}>
            <Healths values={{ current: enemyStats.stats.healPoints.current, max: enemyStats.stats.healPoints.max }} />
          </View> */}
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
  buttonBackground: {
		width: 182,
		height: 47,
		justifyContent: 'center',
		alignItems: 'center',
		transform: [{scale: 0.8}],
	},
  buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
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
    borderRadius: 18,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    margin: 20,
  },
  statsSubContainer:{

  },
  buttonContainer: {
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    flex: 1,
  },
})
