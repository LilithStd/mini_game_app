
import { useStoryStore } from '@/store/story_store';
import { useRouter } from 'expo-router';
import { Button } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
    const router = useRouter();
    const chapter = useStoryStore(state => state.chapter)
    return (
        <SafeAreaView>
            <Button
                title='start'
                onPress={() => router.push(`/story_screen?chapter=${chapter}`)}

            />
        </SafeAreaView>
    )
}
