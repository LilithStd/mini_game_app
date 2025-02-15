
import { useGlobalStore } from '@/store/global_store';
import { useStoryStore } from '@/store/story_store';
import { useRouter } from 'expo-router';
import { Button, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
    const router = useRouter();
    const newGameStatus = useGlobalStore(state => state.newGame)
    const chapter = useStoryStore(state => state.chapter)
    const setNewGameState = useGlobalStore(state => state.setNewGame)
    const handleStartNewGame = () => {
        setNewGameState()
        router.push(`/story_screen?chapter=${chapter}`)
    }
    const handleContinuePreviousGame = () => {
        router.push(`/story_screen?chapter=${chapter}`)
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center', // Центрирование по вертикали
            alignItems: 'center', // Центрирование по горизонтали
        }}>
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
        </SafeAreaView>
    );
}
