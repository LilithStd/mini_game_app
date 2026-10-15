import { useBattleStore } from '@/store/battle/battle_store';
import React from 'react'
import { View, Text, StyleSheet, Image, useWindowDimensions, ImageBackground, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur';
import Healths from '../shared/healths';
const buttonOrange = require('../../assets/buttons/orange_button_01(small).png')
const buttonDisabled = require('../../assets/buttons/orange_button_01(small_disabled).png')

export default function EnemyBattle() {
  const enemyStats = useBattleStore((state) => state.enemy);
  const { height } = useWindowDimensions();
  const previewHeight = height * 0.59;

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
          {isOpenStats ? <Text style={styles.buttonText}>CLOSE</Text> : <Text style={styles.buttonText}>STATS</Text>}
        </ImageBackground>
      </TouchableOpacity>
  )
  const statsComponent = (
    <View style={styles.statsSubContainer}>
      
      <Text>Attack: {enemyStats.stats.attack}</Text>
      <Text>Defense: {enemyStats.stats.defense}</Text>
      <Text>Evasion: {enemyStats.stats.evasion}</Text>
      <Text>Accuracy: {enemyStats.stats.accuracy}</Text>
      <Text>Critical Rate: {enemyStats.stats.criticalRate}</Text>
      <Text>Critical Damage: {enemyStats.stats.criticalDamage}</Text>
    </View>
  );
  const defaultStatsComponent = (
    <View style={styles.statsSubContainer}>
      <Text>Attack: {enemyStats.stats.attack}</Text>
      <Text>Defense: {enemyStats.stats.defense}</Text>
      
      
    </View>
  );
  const enemyStatsComponent = (
    <View style={styles.statsContainer}>
      <BlurView 
        intensity={10} 
        tint="light" 
        experimentalBlurMethod="dimezisBlurView"
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.glassOverlay} />
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
        <View style={styles.infoContainer}>
          <View style={styles.healthContainer}>
            <View style={styles.enemyNameContainer}>
              <Text>{enemyStats.name}</Text>
            </View>
            <View style={styles.healthBarContainer}>
              <Healths values={{ current: enemyStats.stats.healPoints.current, max: enemyStats.stats.healPoints.max }} />
            </View>
            
          </View>
         
          
        </View>
       
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    padding: 10,
    // paddingBottom: 30,
    // backgroundColor: 'white',
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
    borderWidth: 2,
    borderColor: '#dc6431',
    borderRadius: 20,
  },
  healthContainer: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // margin:10,
    padding: 10,
  },
  statsContainer:{
    position: 'absolute',
    // backgroundColor: 'white',
    borderColor: 'rgba(255,255,255,0.55)',
    backgroundColor: 'rgba(20,20,30,0.15)',
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    bottom: 90,
    left: 0,
    right: 0,
    padding: 10,
    margin: 20,
  },
  statsSubContainer:{

  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 10,
    margin: 20,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'lightgrey',
    borderRadius: 16,
  },
  enemyNameContainer: {
    // marginBottom: 10,
  },
  healthBarContainer: {
    // marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
  },
  glassEffectWithoutPlugins: {
    backgroundColor: 'rgba(35, 45, 65, 0.45)',

    borderRadius: 20,

    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,

    elevation: 6,

    padding: 16,
  },
  image: {
    width: '100%',
    flex: 1,
  },
})
