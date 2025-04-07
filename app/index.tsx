import * as Font from 'expo-font';
import { GLOBAL_APP_PATH } from '@/constants/global_path';
import { useGlobalStore } from '@/store/global_store';
import { useStoryStore } from '@/store/story_store';
import { useRouter } from 'expo-router';
import { Button, ImageBackground, Text, View, StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
    const [fontsLoaded] = Font.useFonts({
        'Title App': require('../assets/fonts/BungeeSpice-Regular.ttf'),
    });
    const router = useRouter();
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
                source={require('../assets/backgrounds/bg_00.jpg')}
            >
                <View style={mainStyles.gameTitleContainer}>
                    <Text style={mainStyles.gameTitle}>MONSTERS DUNGEON</Text>
                </View>
                <View style={{
                    width: '80%',
                    alignItems: 'center',
                    gap: 10,


                }}>
                    <Button
                        title="Continue"
                        disabled={newGameStatus}
                        onPress={handleContinuePreviousGame}
                    />
                    <Button
                        title="Start New Game"
                        onPress={handleStartNewGame}
                    />
                </View>
            </ImageBackground>

        </SafeAreaView>
    );
}
const mainStyles = StyleSheet.create({
    gameTitle: {
        fontFamily: 'Title App',
        fontSize: 32,
        alignSelf: 'flex-end'
    },
    gameTitleContainer: {
        position: 'absolute',
        top: 200
    }
})