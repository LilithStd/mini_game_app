
import { GLOBAL_APP_PATH } from '@/constants/global_path';
import { useGlobalStore } from '@/store/global_store';
import { useStoryStore } from '@/store/story_store';
import { useRouter } from 'expo-router';
import { Button, ImageBackground, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
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
                source={require('../assets/backgrounds/bg_1.jpg')}
            >
                <View style={{
                    width: '80%', // Задаем ширину для адаптивности
                    alignItems: 'center', // Выравниваем кнопки по центру
                    gap: 10 // Добавляем промежуток между кнопками
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
