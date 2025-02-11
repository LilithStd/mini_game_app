import { useStoryStore } from "@/store/story_store";
import { useLocalSearchParams } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
import Typewriter from 'react-native-typewriter';

export default function Story_Screen() {
    const { chapter } = useLocalSearchParams();
    const getChapterStory = useStoryStore(state => state.getChapterContent)
    console.log(getChapterStory()?.background)
    return (
        <ImageBackground
            source={require('../assets/backgrounds/test_bg.png')}
            style={{
                flex: 1, // Главное: ImageBackground должен растягиваться!
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            resizeMode="cover"
        >
            <Text>story_Screen</Text>
            <Typewriter
                style={{ fontSize: 14, fontWeight: 'bold' }}
                typing={1}
                minDelay={5}
            >
                {getChapterStory()?.text}
            </Typewriter>
        </ImageBackground>

    )
}
