import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { getRandomNumber } from "@/constants/helpers";
import { SCENARIO_HOOKS } from "@/constants/store/items/scenario";
import { useCharacterStore, UPDATE_CHARACTER_STATS, CharacterStats } from "@/store/character_store"
import { useGlobalStore } from "@/store/global_store"
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Button, Text, View, Image, ImageBackground, TouchableOpacity, StyleSheet } from "react-native"

const CharacterDefaultStats = {
    name: '',
    model: 0,
    level: 0,
    attack: 0,
    defense: 0,
    accuracy: 0,
    criticalRate: 0,
    criticalDamage: 0,
    evasion: 0,
    reduceCriticalDamage: 0,
    atribute: 'none',
    resistAtribute: '',
    itemsSkills: [],
    healPoints: 0,
    expirience: 0,
    totalDamage: 0,
    death: false,
};

const defaultImages = require('../assets/template/template_image.jpg')
const forestMaskForBackgroundTop = require('../assets/mask/forest_mask_top_bg.png')
const forestMaskForBackgroundBottom = require('../assets/mask/forest_mask_bottom.png')
const background = require('../assets/backgrounds/characters_choose/character_choose_bg.jpg')
const button = require('../assets/buttons/orange_button_01(small).png')
const buttonDisable = require('../assets/buttons/orange_button_01(small_disabled).png')

export default function ChooseCharacterScreen() {
    const router = useRouter();


    const [isChoosing, setIsChoosing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCharacterToChoose, setCurrentCharacterToChoose] = useState<CharacterStats>(CharacterDefaultStats)
    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const characters_pull_for_choose = useCharacterStore(state => state.choose_character_pull)
    const choose_character = useCharacterStore(state => state.updateCharacterStats)
    const setContinueGame = useGlobalStore(state => state.setContinueGame)
    //
    // const characters = characters_pull_for_choose()
    const characters = useMemo(() => characters_pull_for_choose(), [characters_pull_for_choose]);

    useEffect(() => {
        setCurrentState(GLOBAL_APP_PATH.CHARACTER_CHOOSE_SCREEN);
    }, [])

    useEffect(() => {
        setCurrentCharacterToChoose(characters[currentIndex]);
    }, [currentIndex]);


    const handleCharacterChoose = (item: CharacterStats) => {
        setIsChoosing(true);
        setContinueGame()
        choose_character(UPDATE_CHARACTER_STATS.ALL, item)
        router.push({
            pathname: GLOBAL_APP_PATH.STORY_SCREEN,
            params: {
                scenarioHook: SCENARIO_HOOKS.AFTER_CHOOSE_CHARACTER
            }
        });
    }

    const handlePreviousCharacter = () => {
        setCurrentIndex(prev => (prev - 1 + characters.length) % characters.length);
    };

    const handleNextCharacter = () => {
        setCurrentIndex(prev => (prev + 1) % characters.length);

    };

    if (isChoosing) {
        return null;
    }


    return (
        <ImageBackground
            style={chooseCharactersStyles.imageBackground}
            resizeMode='cover'
            source={background ? background : defaultImages}
        >


            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
                <Image
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: 150,
                        top: 0,
                        zIndex: 2
                    }}
                    source={forestMaskForBackgroundTop}
                />
                <Image
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: 150,
                        bottom: -20,
                        zIndex: 2
                    }}
                    source={forestMaskForBackgroundBottom}
                />
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    gap: 10,
                    height: '100%',
                    marginTop: 100
                }}>

                    <View style={{
                        padding: 10,
                        borderRadius: 8,
                        backgroundColor: 'white'
                    }}>
                        {/* <Text>Choose your character</Text> */}
                    </View>
                    <View style={{
                        width: '80%',
                        height: '80%',
                        zIndex: 1,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}>

                        <Text>{characters[currentIndex].name}</Text>
                        <Image
                            resizeMode="cover"
                            style={{
                                justifyContent: 'center',
                                alignSelf: 'center',
                                width: '100%',
                                height: '100%'
                            }}
                            source={currentCharacterToChoose.model}
                        />
                        <View style={chooseCharactersStyles.statsContainer}>
                            <View>
                                <Text>Attack:{currentCharacterToChoose.attack}</Text>
                                <Text>Defense:{currentCharacterToChoose.defense}</Text>
                                <Text>Evasion:{currentCharacterToChoose.evasion}</Text>
                                <Text>HP:{currentCharacterToChoose.healPoints}</Text>
                            </View>
                            <View style={chooseCharactersStyles.buttonChooseContainer}>
                                <TouchableOpacity style={chooseCharactersStyles.buttonChoose}
                                    onPress={() => handleCharacterChoose(currentCharacterToChoose)}
                                >
                                    <Text style={chooseCharactersStyles.buttonText}>Choose</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={chooseCharactersStyles.buttonContainer}>
                            <TouchableOpacity onPress={handlePreviousCharacter}>
                                <ImageBackground source={button} style={chooseCharactersStyles.button}>
                                    <Text style={chooseCharactersStyles.buttonText}>Previous</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleNextCharacter}>
                                <ImageBackground source={button} style={chooseCharactersStyles.button}>
                                    <Text style={chooseCharactersStyles.buttonText}>Next</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
const chooseCharactersStyles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: 'center',
        zIndex: 2,
        position: 'absolute'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: 'aquamarine',
        width: '100%',
        height: '10%',
        gap: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 182,
        height: 47,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ scale: 0.8 }],
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Universal Font',
        fontSize: 26,
        fontWeight: 900
    },
    buttonChoose: {
        backgroundColor: 'yellow',
        padding: 30,
        borderWidth: 2
    },
    buttonChooseContainer: {

    },
    statsContainer: {
        position: 'absolute',
        backgroundColor: 'coral',
        width: '90%',
        bottom: 70,
        left: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})