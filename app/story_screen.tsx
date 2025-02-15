import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { useCharacterStore } from "@/store/character_store";
import { useGlobalStore } from "@/store/global_store";
import { useStoryStore } from "@/store/story_store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ImageBackground, Text, View } from "react-native";
import Typewriter from 'react-native-typewriter';

export default function Story_Screen() {
    const { chapter } = useLocalSearchParams();
    const router = useRouter();
    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const defaultGlobalState = useGlobalStore(state => state.newGame)
    const getChapter_Story = useStoryStore(state => state.getChapterContent)
    const default_status = useCharacterStore(state => state.default_state)

    const [typing, setTyping] = useState(false)
    const [skip, setSkip] = useState(false)
    const storyTextContent = getChapter_Story()?.text ? getChapter_Story()?.text : 'no content'

    const handle_switch_screen = (defaultStatus: boolean) => {
        if (defaultStatus) {
            router.push(GLOBAL_APP_PATH.CHARACTER_CHOOSE_SCREEN)
            return
        }
        return router.push(GLOBAL_APP_PATH.LOCATION_CHOOSE_SCREEN)
    }

    useEffect(() => {
        setCurrentState(GLOBAL_APP_PATH.STORY_SCREEN)
    }, [])


    return (
        <ImageBackground
            source={getChapter_Story()?.background || require('../assets/backgrounds/test_bg.png')}
            style={{
                flex: 1, // Главное: ImageBackground должен растягиваться!
                width: '100%',
                height: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
            resizeMode="cover"
        >
            <Text>story_Screen</Text>
            <Text
                style={{
                    backgroundColor: 'yellow',
                    width: 400,
                    height: 200,
                    padding: 20,
                    margin: 10,
                    borderRadius: 10
                }}
            >{skip ? <Text style={{
                fontSize: 14,
                fontWeight: 'bold',

            }}>{storyTextContent}</Text> :
                <Typewriter
                    style={{
                        fontSize: 14,
                        fontWeight: 'bold',

                    }}
                    typing={1}
                    minDelay={0}
                    onTyped={() => { setTyping(false) }}
                    onTypingEnd={() => { setTyping(false), setSkip(true) }}
                >
                    <Text>{storyTextContent}</Text>
                </Typewriter>
                }</Text>
            <View style={{
                flexDirection: 'row',
                gap: 6,
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <Button
                    disabled={typing || skip}
                    title="skip"
                    onPress={() => setSkip(true)}
                />
                <Button
                    title="go to location"
                    onPress={() => handle_switch_screen(defaultGlobalState)}
                />
            </View>

        </ImageBackground>

    )
}
