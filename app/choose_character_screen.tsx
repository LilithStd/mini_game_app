import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { getRandomNumber } from "@/constants/helpers";
import { useCharacterStore, UPDATE_CHARACTER_STATS, CharacterStats } from "@/store/character_store"
import { useGlobalStore } from "@/store/global_store"
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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

export default function ChooseCharacterScreen() {
    const router = useRouter();
    const [isChoosing, setIsChoosing] = useState(false);
    const [currentCharacterToChoose, setCurrentCharacterToChoose] = useState<CharacterStats>(CharacterDefaultStats)
    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const characters_pull_for_choose = useCharacterStore(state => state.choose_character_pull)
    const choose_character = useCharacterStore(state => state.updateCharacterStats)
    const setContinueGame = useGlobalStore(state => state.setContinueGame)


    useEffect(() => {
        setCurrentState(GLOBAL_APP_PATH.CHARACTER_CHOOSE_SCREEN);
        const randomCharacter = characters_pull_for_choose()[0] ?? CharacterDefaultStats;
        setCurrentCharacterToChoose(randomCharacter);
    }, [])

    const handleCharacterChoose = (item: CharacterStats) => {
        setIsChoosing(true);
        setContinueGame()
        choose_character(UPDATE_CHARACTER_STATS.ALL, item)
        router.push(GLOBAL_APP_PATH.LOCATION_CHOOSE_SCREEN)
    }
    const handlePreviousCharacter = () => {

    }

    const handleNextCharacter = () => {

    }

    if (isChoosing) {
        return null; // Пока происходит переход, ничего не рендерим
    }


    return (
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
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
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
                        <Text>Choose your character</Text>
                    </View>
                    <View style={{
                        width: '80%',
                        height: '80%',
                        // position: 'absolute',
                        backgroundColor: 'white',
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}>
                        <Text>{currentCharacterToChoose.name}</Text>
                        <Image
                            style={{
                                justifyContent: 'center',
                                alignSelf: 'center'
                            }}
                            source={currentCharacterToChoose.model}
                        />
                        <View style={styles.statsContainer}>
                            <View>
                                <Text>Attack:{currentCharacterToChoose.attack}</Text>
                                <Text>Defense:{currentCharacterToChoose.defense}</Text>
                                <Text>Evasion:{currentCharacterToChoose.evasion}</Text>
                                <Text>HP:{currentCharacterToChoose.healPoints}</Text>
                            </View>
                            <View style={styles.buttonChooseContainer}>
                                <TouchableOpacity style={styles.buttonChoose}
                                    onPress={() => handleCharacterChoose(currentCharacterToChoose)}
                                >
                                    <Text style={styles.buttonText}>Choose</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Previous</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: 'aquamarine',
        width: '100%',
        height: '10%',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    button: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        width: 100,

    },
    buttonText: {
        textAlign: 'center'
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