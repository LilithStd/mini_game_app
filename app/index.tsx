import * as Font from 'expo-font';
import { GLOBAL_APP_PATH } from '@/constants/global_path';
import { useGlobalStore } from '@/store/global_store';
import { useStoryStore } from '@/store/story_store';
import { useRouter } from 'expo-router';
import { Button, ImageBackground, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react';

const backgroundImageDefault = require('../assets/backgrounds/bg_00.jpg')
const backgroundImageWithMonster = require('../assets/backgrounds/bg_01_title.jpg')
const buttonOrange = require('../assets/buttons/orange_button_01(small).png')
const buttonDisabled = require('../assets/buttons/orange_button_01(small_disabled).png')
const buttonLogo = require('../assets/buttons/orange_button_main.png')

export default function App() {
    const [fontsLoaded] = Font.useFonts({
        'Title App': require('../assets/fonts/BungeeSpice-Regular.ttf'),
        'Text App': require('../assets/fonts/LilitaOne-Regular.ttf')
    });
    const router = useRouter();
    //state
    const [currentBackgroundImage, setCurrentBackgroundImage] = useState(backgroundImageWithMonster)
    //store
    const newGameStatus = useGlobalStore(state => state.newGame)
    const { currentState } = useGlobalStore()
    const chapter = useStoryStore(state => state.chapter)
    const setNewGameState = useGlobalStore(state => state.setNewGame)

    const handleStartNewGame = () => {
        setNewGameState()
        router.push(GLOBAL_APP_PATH.STORY_SCREEN)
    }
    const handleContinuePreviousGame = () => {
        const redirect = currentState !== GLOBAL_APP_PATH.BATTLE_SCREEN ? currentState : GLOBAL_APP_PATH.LOCATION_CHOOSE_SCREEN;
        router.push(redirect);

    }

    // useEffect(() => {
    //     const swtichBackgroundImages = setInterval(() => {
    //         setCurrentBackgroundImage(currentBackgroundImage === backgroundImageDefault ? backgroundImageWithMonster : backgroundImageDefault)
    //     }, 5000); // 3 секунды

    //     return () => {
    //         clearTimeout(swtichBackgroundImages);
    //     };
    // }, [currentBackgroundImage]);
    if (!fontsLoaded) {
        return <Text>Loading</Text> // можно заглушку/сплеш
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center', // Центрирование по вертикали
            alignItems: 'center', // Центрирование по горизонтали
        }}>
            <ImageBackground
                style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: 'center'
                }}
                resizeMode='cover'
                source={currentBackgroundImage}
            >
                <View style={mainStyles.gameTitleContainer}>
                    {/* <ImageBackground
                        source={buttonLogo}
                        style={mainStyles.gameTitleBackground}
                    > */}
                    <Text style={mainStyles.gameTitle}>MONSTERS DUNGEON</Text>
                    {/* </ImageBackground> */}
                </View>
                <View style={mainStyles.buttonsContainer}>
                    <TouchableOpacity
                        style={mainStyles.buttonContainer}
                        disabled={newGameStatus}
                        onPress={handleContinuePreviousGame}
                    >
                        <ImageBackground
                            source={newGameStatus ? buttonDisabled : buttonOrange}
                            style={mainStyles.buttonBackground}
                        >
                            <Text style={mainStyles.text}>
                                CONTINUE
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={mainStyles.buttonContainer}
                        onPress={handleStartNewGame}
                    >
                        <ImageBackground
                            source={buttonOrange}
                            style={mainStyles.buttonBackground}
                        >
                            <Text style={mainStyles.text}>
                                NEW GAME
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    {/* 
                    <Button
                        title="Continue"
                        disabled={newGameStatus}
                        onPress={handleContinuePreviousGame}
                    />
                    <Button
                        title="Start New Game"
                        onPress={handleStartNewGame}
                    /> */}
                </View>
            </ImageBackground>

        </SafeAreaView>
    );
}
const mainStyles = StyleSheet.create({
    gameTitle: {
        fontFamily: 'Title App',
        fontSize: 32,
        alignSelf: 'flex-end',
    },
    gameTitleContainer: {
        position: 'absolute',
        top: 100
    },
    gameTitleBackground: {
        width: 396,
        height: 83,
        alignContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Text App',
        fontSize: 18
    },
    buttonsContainer: {
        width: '80%',
        position: 'absolute',
        bottom: 240,
        gap: 10,

    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center'
    },
    buttonDisabled: {
        backgroundColor: 'grey'
    },
    buttonBackground: {
        width: 182,
        height: 47,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    }
})