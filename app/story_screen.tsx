import Transistion from "@/app/transistion_screen";
import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { SCENARIO_HOOKS } from "@/constants/store/items/scenario";
import { useCharacterStore } from "@/store/character_store";
import { LANGUAGE, useGlobalStore } from "@/store/global_store";
import { StageType, useStoryStore } from "@/store/story/story_store";
import { CHAPTER_LIST, STORY_STAGE } from "@/store/story/storyTypes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View, StyleSheet, Button } from "react-native";
import Typewriter from 'react-native-typewriter';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultBackground = require('../assets/backgrounds/monsters/background_without_imp.jpg')
const buttonOrange = require('../assets/buttons/orange_button_01(small).png')
const buttonOrangeDisable = require('../assets/buttons/orange_button_01(small_disabled).png')
const transistionTextMiddle = {
    [LANGUAGE.EN]: "turning its head in your direction it rushed into the attack, you have no choice but to accept the fight",
    [LANGUAGE.LV]: "pagriezis galvu tavā virzienā, tas metās uzbrukumā, tev neatlika nekas cits kā pieņemt cīņu.",
    [LANGUAGE.RU]: "повернув голову в вашу сторону оно ринулось в наступление, у вас нет выбора кроме как принять бой",
}
const transistionTextStart = {
    [LANGUAGE.EN]: "As you fall, you try to grab onto the walls with your weapon, and you manage to slow down your fall because you are skilled...",
    [LANGUAGE.LV]: "Krītot, jus mēģini ar ieroci satvert sienas, un jus izdodas palēnināt kritienu, jo esam prasmīgs...",
    [LANGUAGE.RU]: "Падая, вы пытаетесь ухватиться за стены оружием, и вам удаётся замедлить падение, потому что вы искусный...",
}

export default function Story_Screen() {
    const router = useRouter();
    const { scenarioHook } = useLocalSearchParams();
    const currentLanguage = useGlobalStore(state => state.currentLanguage)
    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const defaultGlobalState = useGlobalStore(state => state.newGame)
    //story_store
    const currentChapter = useStoryStore(state => state.chapter)
    const getChapterStory = useStoryStore(state => state.getChapterContent)
    const setChapterStory = useStoryStore(state => state.setChapter)
    //
    const default_status = useCharacterStore(state => state.default_state)
    //const
    const scenarioAction = scenarioHook as SCENARIO_HOOKS;
    //state_flags
    const [typing, setTyping] = useState(false)
    const [skip, setSkip] = useState(false)
    const [isTimer, setIsTimer] = useState(false)
    const [changeStage, setChangeStage] = useState(false)
    //functions
    const setCurrentAction = (scenarioAction: SCENARIO_HOOKS, language: LANGUAGE) => {
        switch (scenarioAction) {
            case SCENARIO_HOOKS.START:
                const start = getChapterStory(STORY_STAGE.START, language)
                return start;
            case SCENARIO_HOOKS.AFTER_CHOOSE_CHARACTER:
                const middle = getChapterStory(STORY_STAGE.MIDDLE, language)
                return middle;



        }
    }
    const transistionTextWithCurrentLanguage = (stage: string, language: LANGUAGE) => {
        switch (stage) {
            case 'start':
                return transistionTextStart[language]
            case 'middle':
                return transistionTextMiddle[language]
            case 'end':
                break;
        }
    }


    //state

    const [currentStageContent, setCurrentStageContent] = useState(setCurrentAction(scenarioAction, currentLanguage))
    //

    if (!currentStageContent) return null;
    const [currentBackground, setCurrentBackgroud] = useState(currentStageContent.background || defaultBackground)

    type ContentTextType = {
        name: string,
        stage: StageType,
        text: string
    }

    const [currentPartText, setCurrentPartText] = useState<ContentTextType>({
        name: currentStageContent.name,
        stage: currentStageContent.text.stage,
        text: currentStageContent.text.content.part_00.content
    })


    const handleContinue = () => {
        if (currentPartText.text === currentStageContent.text.content.part_00.content) {
            setTyping(false),
                setSkip(false)
            setCurrentBackgroud(currentStageContent.text.content.part_01.background)
            setCurrentPartText((prev) => ({
                ...prev,
                text: currentStageContent.text.content.part_01.content
            }))
        }
        if (currentPartText.text === currentStageContent.text.content.part_01.content) {
            setTyping(false),
                setSkip(false)
            setCurrentBackgroud(currentStageContent.text.content.part_02.background)
            setCurrentPartText((prev) => ({
                ...prev,
                text: currentStageContent.text.content.part_02.content
            }))
        }
        if (currentPartText.text === currentStageContent.text.content.part_02.content) {
            setTyping(false),
                setSkip(false)
            setCurrentBackgroud(currentStageContent.text.content.part_03.background)
            setCurrentPartText((prev) => ({
                ...prev,
                text: currentStageContent.text.content.part_03.content
            }))

        } if (currentPartText.text === currentStageContent.text.content.part_03.content) {
            setTyping(false),
                setSkip(false)
            setCurrentBackgroud(currentStageContent.text.content.part_04.background)
            setCurrentPartText((prev) => ({
                ...prev,
                text: currentStageContent.text.content.part_04.content
            }))

        }
        if (currentPartText.text === currentStageContent.text.content.part_04.content) {
            setTyping(false),
                setSkip(false)
            setCurrentBackgroud(currentStageContent.text.content.part_05.background)
            setCurrentPartText((prev) => ({
                ...prev,
                text: currentStageContent.text.content.part_05.content
            }))

        }
        if (currentPartText.text === currentStageContent.text.content.part_05.content) {
            setTyping(false);
            setSkip(false);

            if (currentPartText.stage === 'start' && currentChapter === CHAPTER_LIST.ORIGIN) {
                const title = transistionTextWithCurrentLanguage(currentPartText.stage, currentLanguage)
                router.push({
                    pathname: GLOBAL_APP_PATH.TRANSISTION_SCREEN,
                    params: {
                        title: title,
                        pathToAfterTransistion: GLOBAL_APP_PATH.CHARACTER_CHOOSE_SCREEN
                    }
                })
            } else {
                setChangeStage(true)
            }
            if (currentPartText.stage === 'middle' && currentChapter === CHAPTER_LIST.ORIGIN) {
                const title = transistionTextWithCurrentLanguage(currentPartText.stage, currentLanguage)
                router.push({
                    pathname: GLOBAL_APP_PATH.TRANSISTION_SCREEN,
                    params: {
                        title: title,
                        pathToAfterTransistion: GLOBAL_APP_PATH.BATTLE_SCREEN
                    }
                })
            }
        }

    }
    useEffect(() => {
        setCurrentState(GLOBAL_APP_PATH.STORY_SCREEN)
    }, [])
    //temp code block for reset store
    const resetStore = () => {
        AsyncStorage.removeItem('story-storage').then(() => {
            console.log('✅ Story store reset');
        });
    }
    // useEffect(() => {
    //     AsyncStorage.removeItem('story-storage').then(() => {
    //         console.log('✅ Story store reset');
    //     });
    // }, []);
    //
    useEffect(() => {
        if (scenarioHook === SCENARIO_HOOKS.AFTER_CHOOSE_CHARACTER) {
            const middlePart = getChapterStory('middle', currentLanguage);
            if (!middlePart) return;
            setCurrentAction(scenarioAction, currentLanguage)
            setCurrentBackgroud(middlePart.text.content.part_00.background);
        }
    }, [scenarioHook])

    useEffect(() => {
        if (changeStage) {
            switch (currentPartText.stage) {
                case 'start':
                    const middlePart = getChapterStory('middle', currentLanguage);
                    if (!middlePart) return;
                    setCurrentStageContent(middlePart);
                    setCurrentPartText({

                        name: middlePart.name,
                        stage: middlePart.text.stage,
                        text: middlePart.text.content.part_00.content,
                    })
                    setCurrentBackgroud(middlePart.text.content.part_00.background);
                    setChangeStage(false)
                    break;
                case 'middle':
                    const endPart = getChapterStory('end', currentLanguage);
                    if (!endPart) return;
                    setCurrentStageContent(endPart);
                    setCurrentPartText({
                        name: endPart.name,
                        stage: endPart.text.stage,
                        text: endPart.text.content.part_00.content,
                    })
                    setCurrentBackgroud(endPart.text.content.part_00.background);
                    setChangeStage(false)
                    break;
            }
        }


    }, [changeStage])



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
            <Button title="reset store" onPress={resetStore} />
            <View
                style={currentPartText.text === currentStageContent?.text.content.part_00.content || currentStageContent?.text ? storyStyles.maskBackgroundSlice : storyStyles.maskBackground}
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
                    disabled={typing || skip || isTimer}
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
                    disabled={isTimer}
                >
                    <ImageBackground
                        style={storyStyles.buttonBackground}
                        source={isTimer ? buttonOrangeDisable : buttonOrange}
                    >
                        <Text style={storyStyles.buttonText}>{currentPartText.text === currentStageContent.text.content.part_05.content ? 'NEXT' : 'CONTINUE'}</Text>
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
        height: '21%',
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