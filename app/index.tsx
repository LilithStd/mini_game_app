import * as Font from 'expo-font';
import { GLOBAL_APP_PATH } from '@/constants/global_path';
import { LANGUAGE, useGlobalStore } from '@/store/global_store';
import { CHAPTER_LIST, useStoryStore } from '@/store/story_store';
import { useRouter } from 'expo-router';
import { Button, ImageBackground, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react';

const backgroundImageDefault = require('../assets/enemy/monsters/background_without_imp.jpg')
const backgroundImageWithMonster = require('../assets/enemy/monsters/background_imp.jpg')

const buttonOrange = require('../assets/buttons/orange_button_01(small).png')
const buttonDisabled = require('../assets/buttons/orange_button_01(small_disabled).png')
const buttonLogo = require('../assets/buttons/orange_button_main.png')
const LANGUAGE_VARIANT = [
    LANGUAGE.EN, LANGUAGE.RU, LANGUAGE.LV
]



export default function App() {
    const [fontsLoaded] = Font.useFonts({
        'Title App': require('../assets/fonts/BungeeSpice-Regular.ttf'),
        'Text App': require('../assets/fonts/LilitaOne-Regular.ttf')
    });
    const router = useRouter();
    //state
    const [currentBackgroundImage, setCurrentBackgroundImage] = useState(backgroundImageWithMonster)
    const [currentTextToView, setCurrentTextToView] = useState({ continue: '', newGame: '' })
    //store
    //global
    const newGameStatus = useGlobalStore(state => state.newGame)
    const currentState = useGlobalStore(state => state.currentState)
    const currentLanguage = useGlobalStore(state => state.currentLanguage)
    const setAppLanguage = useGlobalStore(state => state.setCurrentLanguage)
    //

    const setNewGameState = useGlobalStore(state => state.setNewGame)

    const buttonVariant = () => {

    }
    useEffect(() => {
        switch (currentLanguage) {
            case LANGUAGE.EN:
                const engTextToButton = { continue: 'CONTINUE', newGame: 'NEW GAME' }
                setCurrentTextToView(engTextToButton)
                break;
            case LANGUAGE.RU:
                const ruTextToButton = { continue: 'ПРОДОЛЖИТЬ', newGame: 'НОВАЯ ИГРА' }
                setCurrentTextToView(ruTextToButton)
                break;
            case LANGUAGE.LV:
                const lvTextToButton = { continue: 'TURPINĀT', newGame: 'JAUNA SPĒLE' }
                setCurrentTextToView(lvTextToButton)
                break;
        }
    }, [currentLanguage])

    const handleStartNewGame = () => {
        setNewGameState()

        router.push({
            pathname: GLOBAL_APP_PATH.STORY_SCREEN,
        })
    }

    const handleContinuePreviousGame = () => {
        const redirect = currentState !== GLOBAL_APP_PATH.BATTLE_SCREEN ? currentState : GLOBAL_APP_PATH.LOCATION_CHOOSE_SCREEN;
        router.push(redirect);

    }

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
                                {currentTextToView.continue}
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
                                {currentTextToView.newGame}
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={mainStyles.languageSwitchContainer}>
                    {LANGUAGE_VARIANT.map((item) =>
                        <TouchableOpacity
                            key={item}
                            onPress={() => setAppLanguage(item)}

                        >
                            <Text style={[mainStyles.languageButton, item === currentLanguage ? mainStyles.activeLanguageButton : '']}>{item}</Text>
                        </TouchableOpacity>)}
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
    },
    languageSwitchContainer: {
        backgroundColor: 'black',
        flexDirection: 'row',
        gap: 6,
        padding: 4,
        borderRadius: 6,
        position: 'absolute',
        bottom: 100
    },
    languageButton: {
        fontFamily: 'Title App',
        fontSize: 16,
    },
    activeLanguageButton: {
        backgroundColor: 'grey',
    }
})