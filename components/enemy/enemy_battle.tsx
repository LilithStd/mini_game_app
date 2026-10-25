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
  const previewHeight = height * 0.58;

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
        <View style={styles.enemyStatsContainer}>
          <Text>Attack: {enemyStats.stats.attack}</Text>
          <Text>Defense: {enemyStats.stats.defense}</Text>
          <Text>Evasion: {enemyStats.stats.evasion}</Text>
          <Text>Accuracy: {enemyStats.stats.accuracy}</Text>
          <Text>Critical Rate: {enemyStats.stats.criticalRate}</Text>
          <Text>Critical Damage: {enemyStats.stats.criticalDamage}</Text>
        </View>
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
        intensity={65}
        tint="light"
        pointerEvents="none"
        // experimentalBlurMethod={
        //   Platform.OS === 'android' ? 'dimezisBlurView' : 'none'
        // }
        experimentalBlurMethod="none"
        style={StyleSheet.absoluteFillObject}
      />

      <View
        pointerEvents="none"
        style={styles.glassOverlay}
      />

      <View style={styles.buttonContainer}>
        {isOpenStats ? statsComponent : defaultStatsComponent}
        {changeStatsViewButton}
      </View>

    </View>
  );


  const informationComponent = (
    <View style={styles.infoContainer}>
      <BlurView 
        intensity={65} 
        tint="light" 
        experimentalBlurMethod="none"
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.glassOverlay} />
   
      <View style={styles.healthContainer}>
        <View style={styles.informationSubContainer}>
          <View style={styles.enemyNameContainer}>
            <Text>{enemyStats.name}</Text>
            {isOpenStats && (
              <View style={styles.enemyIconContainer}>
                <Image source={enemyStats.icon} style={styles.enemyIcon} resizeMode="contain" />
              </View>
            )}
          </View>
          <View style={styles.buttonContainer}>
            {isOpenStats && statsComponent }
            {changeStatsViewButton}
          </View>
        </View>
        
        <View style={styles.healthBarContainer}>
          <Healths values={{ current: enemyStats.stats.healPoints.current, max: enemyStats.stats.healPoints.max }} />
        </View>
       
      </View>
    </View>
  );

  






  return (
    <View style={styles.mainContainer}>
        <View style={[styles.imageContainer, { height: previewHeight }]}>
          <Image source={enemyStats.model} style={styles.image} resizeMode="cover" />
        </View>
        {/* {enemyStatsComponent} */}
        {informationComponent}
        {/* <View style={styles.infoContainer}>
          <View style={styles.healthContainer}>
            <View style={styles.enemyNameContainer}>
              <Text>{enemyStats.name}</Text>
            </View>
            <View style={styles.healthBarContainer}>
              <Healths values={{ current: enemyStats.stats.healPoints.current, max: enemyStats.stats.healPoints.max }} />
            </View>
            
          </View>
         
          
        </View> */}
       
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
		color: 'black',
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
    // padding: 10,
  },
  statsContainer: {
    position: 'absolute',

    bottom: 110,
    left: 20,
    right: 20,

    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.85)',
    backgroundColor: 'rgba(20,20,30,0.12)',
    overflow: 'hidden',
    

    padding: 15,
  },
  enemyIcon: {
    width: 120,
    height: 120,
    margin: 10,
  },
  enemyIconContainer:{
    // alignItems: 'center',
    // marginBottom: 10,
  },
  statsSubContainer:{
    margin: 20,
    padding: 10,
  },
  enemyStatsContainer: {
    // borderWidth: 1,
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,20,25,0.20)',
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 10,
    margin: 20,
    bottom: 0,

    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.85)',
    backgroundColor: 'rgba(20,20,30,0.12)',
    borderRadius: 16,
  },
  enemyNameContainer: {
    margin: 10,

  },
  healthBarContainer: {
    // marginBottom: 10,
  },
  informationSubContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  buttonContainer: {
    justifyContent: 'flex-end',

  },
  glassEffectWithoutPlugins: {
    backgroundColor: 'rgba(58, 58, 58, 0.66)',
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  image: {
    width: '100%',
    flex: 1,
  },
})
