import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { useCharacterStore } from "@/store/character_store";
import { useGlobalStore } from "@/store/global_store";
import { useStoryStore } from "@/store/story_store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Typewriter from 'react-native-typewriter';

const defaultBackground = require('../assets/backgrounds/bg_00.jpg')
const monsterBackground = require('../assets/enemy/monsters/imp_story_start.jpg')
const monsterAttackBackground = require('../assets/enemy/monsters/imp_story_start_attack.jpg')
const buttonOrange = require('../assets/buttons/orange_button_01(small).png')
const buttonOrangeDisable = require('../assets/buttons/orange_button_01(small_disabled).png')

export default function Story_Screen() {
    // const { chapter } = useLocalSearchParams();
    const router = useRouter();
    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const defaultGlobalState = useGlobalStore(state => state.newGame)
    const getChapter_Story = useStoryStore(state => state.getChapterContent)
    const default_status = useCharacterStore(state => state.default_state)
    //const
    const storyContent = getChapter_Story()
    // const storyTextContent = storyContent?.text.start ? getChapter_Story()?.text.start : 'no content'
    //state
    const [typing, setTyping] = useState(false)
    const [skip, setSkip] = useState(false)
    const [currentBackground, setCurrentBackgroud] = useState(getChapter_Story()?.background || defaultBackground)
    const [currentPartText, setCurrentPartText] = useState({ name: storyContent?.name, text: storyContent?.text.start })
    // console.log(storyTextContent);

    //

    const handleContinue = () => {
        if (currentPartText.text === storyContent?.text.start) {
            setTyping(false),
                setSkip(false)
            setCurrentPartText((prev) => ({
                ...prev,
                text: storyContent?.text.middle
            }))
        }
        if (currentPartText.text === storyContent?.text.middle) {
            setTyping(false),
                setSkip(false)
            setCurrentBackgroud(monsterBackground)
            setCurrentPartText((prev) => ({
                ...prev,
                text: storyContent?.text.end
            }))
        }
        if (currentPartText.text === storyContent?.text.end) {
            setSkip(true)

            if (defaultGlobalState) {
                router.push(GLOBAL_APP_PATH.CHARACTER_CHOOSE_SCREEN)
                return
            }
            return router.push(GLOBAL_APP_PATH.LOCATION_CHOOSE_SCREEN)
        }

    }

    useEffect(() => {
        setCurrentState(GLOBAL_APP_PATH.STORY_SCREEN)
    }, [])


    return (
        <ImageBackground
            source={currentBackground}
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
            <View
                style={currentPartText.text === storyContent?.text.end ? storyStyles.maskBackgroundSlice : storyStyles.maskBackground}
            >{skip ? <Text style={{
                fontFamily: 'Text App',
                fontSize: 20,

            }}>{currentPartText.text}</Text> :
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
                    <Text>{currentPartText.text}</Text>
                </Typewriter>
                }</View>
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
                    onPress={handleContinue}
                    style={storyStyles.buttonContainer}
                >
                    <ImageBackground
                        style={storyStyles.buttonBackground}
                        source={buttonOrange}
                    >
                        <Text style={storyStyles.buttonText}>{currentPartText.text === storyContent?.text.end ? 'NEXT' : 'CONTINUE'}</Text>
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
    maskBackground: {
        backgroundColor: 'yellow',
        width: 400,
        height: '50%',
        padding: 20,
        margin: 10,
        borderRadius: 10
    },
    maskBackgroundSlice: {
        backgroundColor: 'yellow',
        width: 400,
        height: '35%',
        padding: 20,
        margin: 10,
        borderRadius: 10
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