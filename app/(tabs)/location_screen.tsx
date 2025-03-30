import ModalWindow, { VARIANTS_MODAL_WINDOW } from '@/components/modal_window/modal_window';
import Reward from '@/components/reward/reward';
import { GLOBAL_APP_PATH } from '@/constants/global_path'
import { getRandomNumber } from '@/constants/helpers';
import { CharacterInventoryType, useCharacterStore } from '@/store/character_store';
import { useEnemyStore } from '@/store/enemy_store';
import { useGlobalStore } from '@/store/global_store'
import { REWARD_VARIANT, rewards } from '@/store/items_strore';
import { Location_content_type, useLocationStore } from '@/store/location_store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, Image, ImageBackground, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native'

const defaultImage = require('../../assets/backgrounds/bg_2.jpg');
const chanceFindTreasurePercent = 40

export default function LocationScreen() {
    const router = useRouter();
    const { location } = useLocalSearchParams();
    const countScreenToBattle = useLocationStore(state => state.countLocationToRedirectForBattle)
    const setCountScreenToBattle = useLocationStore(state => state.setCountLocationToRedirectForBattle)
    const setLocationToBattleScreen = useLocationStore(state => state.setLocationToBattleScreen)
    const currentLocationPrevious = useLocationStore(state => state.locationToBattleScreen)
    const currentLocation = useLocationStore(state => state.currentLocation)
    const currentEnemy = useEnemyStore(state => state.currentEnemy)
    const setRandomCurrentEnemy = useEnemyStore(state => state.getRandomEnemyForBattle)
    const setRewardToInventary = useCharacterStore(state => state.characterInventoryUpdate)
    const currentState = useGlobalStore(state => state.currentState)
    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const locationPull = useLocationStore(state => state.getPullLocations)



    const [countScreen, setCountScreen] = useState(0)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isTresure, setIsTreausre] = useState(false)

    const [locationImage, setLocationImage] = useState<Location_content_type>({ name: '', model: 0, group: '' })


    const getRandomLocationImage = useCallback(() => {
        if (location !== undefined || currentLocation !== '') {
            const tempElement = location || currentLocationPrevious.group;
            const tempImage = locationPull(tempElement.toString())[Math.floor(Math.random() * locationPull(tempElement.toString()).length)];

            if (locationImage !== tempImage) {
                setLocationImage(tempImage);
                setLocationToBattleScreen(tempImage);
            }
        } else if (locationImage.model !== defaultImage) {
            setLocationImage({ name: '', model: defaultImage, group: '' });
        }
    }, [location, currentLocationPrevious, locationImage]);




    const chanceFindTreasure = (percent: number): boolean => {
        return Math.random() * 100 < percent;
    }

    const handleModalChooseBattle = () => {
        setModalVisible(false)
        router.push(GLOBAL_APP_PATH.BATTLE_SCREEN);
    }

    const handleAddRewardToInventry = (reward: CharacterInventoryType[]) => {
        setModalVisible(false)
        setRewardToInventary(reward)
    }

    const modalWindowObjectSettings = {
        variant: isTresure ? VARIANTS_MODAL_WINDOW.TREASURE_REWARD : VARIANTS_MODAL_WINDOW.ATTACK,
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }


    const handleCountScreenChange = () => {
        const treasure = chanceFindTreasure(chanceFindTreasurePercent);
        setCountScreen(prev => prev + 1);
        if (treasure) {
            setIsTreausre(true);
            setModalVisible(true)
        }
        if (countScreen >= countScreenToBattle) {
            setIsTreausre(false)
            setModalVisible(true)
            setCountScreen(0)
            setRandomCurrentEnemy(currentLocation)
            setCountScreenToBattle(getRandomNumber(1, 4))
        }

    };


    const handleModalReatreatBattle = () => {
        setModalVisible(false)
    }

    const handleMovAroundLocation = () => {
        getRandomLocationImage(),
            handleCountScreenChange()
    }

    useEffect(() => {
        if (currentState !== GLOBAL_APP_PATH.LOCATION_SCREEN) {
            setCurrentState(GLOBAL_APP_PATH.LOCATION_SCREEN)
        }
        getRandomLocationImage(),
            setCountScreenToBattle(getRandomNumber(1, 4))
    }, [])


    return (
        <ImageBackground
            style={{
                flex: 1,
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: 'center'
            }}
            source={locationImage.model}
            resizeMode='cover'
        >
            <Text
                style={{
                    color: 'white'
                }}

            >locations details, count screen: {countScreen} - counScreenG:{countScreenToBattle}</Text>
            <View style={styles.modalBackground}>
                {isModalVisible && <ModalWindow
                    objectSetting={modalWindowObjectSettings}
                    onClose={handleCloseModal}
                />}
                {/* {isTresure ?
                    <Text></Text>
                    :
                    <View style={styles.modalContainer}>
                        <Text>Player Choose Window</Text>
                        <Text>Enemy attack you.</Text>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text>{currentEnemy.name}</Text>
                            <Image
                                style={{
                                    width: 200,
                                    height: 200
                                }}
                                source={currentEnemy.model}
                            />
                        </View>
                        <Text>Your choose:</Text>
                        <View style={{
                            flexDirection: 'row',
                            gap: 10
                        }}>
                            <TouchableOpacity
                                onPress={handleModalChooseBattle}
                                style={{
                                    backgroundColor: 'red',
                                    padding: 4,
                                    borderRadius: 6
                                }}>
                                <Text>Battle!</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleModalReatreatBattle}
                                style={{
                                    backgroundColor: 'gray',
                                    padding: 4,
                                    borderRadius: 6
                                }}
                            >
                                <Text>Reatreat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                } */}

            </View>
            <View style={{
                width: '80%', // Задаем ширину для адаптивности
                alignItems: 'center', // Выравниваем кнопки по центру
                gap: 10, // Добавляем промежуток между кнопками
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                <Button
                    title="left"
                    onPress={handleMovAroundLocation}

                />
                <Button
                    title="right"
                    onPress={handleMovAroundLocation}
                />
            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Затемнённый фон
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
    },
});
