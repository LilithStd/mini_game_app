import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { useCharacterStore } from "@/store/character_store";
import { useGlobalStore } from "@/store/global_store";
import { useStoryStore } from "@/store/story_store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ImageBackground, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Typewriter from 'react-native-typewriter';

const defaultBackground = require('../assets/backgrounds/bg_00.jpg')
const monsterBackground = require('../assets/enemy/monsters/imp_story_start.jpg')
const buttonOrange = require('../assets/buttons/orange_button_01(small).png')
const buttonOrangeDisable = require('../assets/buttons/orange_button_01(small_disabled).png')

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

    const handleSwitchScreen = (defaultStatus: boolean) => {
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
            source={getChapter_Story()?.background || defaultBackground}
            style={{
                flex: 1,
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
                    height: '50%',
                    padding: 20,
                    margin: 10,
                    borderRadius: 10
                }}
            >{skip ? <Text style={{
                fontFamily: 'Text App',
                fontSize: 26,

            }}>{storyTextContent}</Text> :
                <Typewriter
                    style={{
                        fontFamily: 'Text App',
                        fontSize: 20,
                        // fontWeight: 'bold',

                    }}
                    typing={1}
                    minDelay={0}
                    onTyped={() => { setTyping(false) }}
                    onTypingEnd={() => { setTyping(false), setSkip(true) }}
                >
                    <Text>{storyTextContent}</Text>
                </Typewriter>
                }</Text>
            <View style={storyStyles.buttonsContainer}>
                <TouchableOpacity
                    disabled={typing || skip}
                    onPress={() => setSkip(true)}
                    style={storyStyles.buttonContainer}
                >
                    <ImageBackground
                        source={typing || skip ? buttonOrangeDisable : buttonOrange}
                        style={storyStyles.buttonBackground}
                    >
                        <Text style={storyStyles.buttonText}>SKIP</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSwitchScreen(defaultGlobalState)}
                    style={storyStyles.buttonContainer}
                >
                    <ImageBackground
                        style={storyStyles.buttonBackground}
                        source={buttonOrange}
                    >
                        <Text style={storyStyles.buttonText}>CONTINUE</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

        </ImageBackground>

    )
}
const storyStyles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {

    },
    buttonText: {
        fontFamily: 'Text App',
        textAlign: 'center',
        fontSize: 20
    },
    buttonBackground: {
        width: 182,
        height: 47,
        alignItems: 'center',
        justifyContent: 'center'
    }
})