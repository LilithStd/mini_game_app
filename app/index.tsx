import Character from '@/components/player/character'
import { useRouter } from 'expo-router';
import { Alert, Button, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
    const router = useRouter();
    return (
        <SafeAreaProvider>
            <Button
                title='start'
                onPress={() => router.push('/story_screen?text=Push_text')}

            />
        </SafeAreaProvider>
    )
}
