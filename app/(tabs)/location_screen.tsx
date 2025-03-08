import { GLOBAL_APP_PATH } from '@/constants/global_path'
import { getRandomNumber } from '@/constants/helpers';
import { useEnemyStore } from '@/store/enemy_store';
import { useGlobalStore } from '@/store/global_store'
import { Location_content_type, useLocationStore } from '@/store/location_store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Text, View, Image, ImageBackground, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native'

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

    const [countScreen, setCountScreen] = useState(0)
    const [isModalVisible, setModalVisible] = useState(false);

    const [locationImage, setLocationImage] = useState<Location_content_type>({ name: '', model: 0, group: '' })

    const getRandomLocationImage = () => {
        const defaultImage = require('../../assets/backgrounds/bg_2.jpg');

        if (location !== undefined || currentLocation !== '') {
            const tempElement = location && location !== undefined ? location : currentLocationPrevious.group
            const tempImage = locationPull(tempElement.toString())[Math.floor(Math.random() * locationPull(tempElement.toString()).length)]
            setLocationToBattleScreen(tempImage)
            setLocationImage(tempImage)
        } else {
            setLocationImage({ name: '', model: defaultImage, group: '' })
        }

    }

    const handleDecrementCountScreen = () => {
        setCountScreen(countScreen + 1)
    }
    const handleIncrementCountScreen = () => {
        setCountScreen(countScreen + 1)
    }
    const handleModalChooseBattle = () => {
        setModalVisible(false)
        router.push(GLOBAL_APP_PATH.BATTLE_SCREEN);
    }
    const handleModalReatreatBattle = () => {
        setModalVisible(false)
    }

    useEffect(() => {
        setCurrentState(GLOBAL_APP_PATH.LOCATION_SCREEN)
    }, [])

    useEffect(() => {
        setCountScreenToBattle(getRandomNumber(1, 8))
        getRandomLocationImage()
    }, [location])


    useEffect(() => {
        if (countScreen === countScreenToBattle) {
            setModalVisible(true)
            setRandomCurrentEnemy(currentLocation)
            setCountScreenToBattle(getRandomNumber(1, 4))
            setCountScreen(0)

        }
    }, [countScreen, countScreenToBattle]);



    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const locationPull = useLocationStore(state => state.getPullLocations)




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
            <Modal
                visible={isModalVisible}
                animationType="fade" // Анимация появления
                transparent={true} // Прозрачный фон
                onRequestClose={() => setModalVisible(false)} // Закрытие на Android кнопкой "Назад"
            >
                <View style={styles.modalBackground}>
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
                </View>
            </Modal>
            <View style={{
                width: '80%', // Задаем ширину для адаптивности
                alignItems: 'center', // Выравниваем кнопки по центру
                gap: 10, // Добавляем промежуток между кнопками
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                <Button
                    title="left"
                    onPress={() => {
                        getRandomLocationImage(),
                            handleDecrementCountScreen()
                    }}

                />
                <Button
                    title="right"
                    onPress={() => {
                        getRandomLocationImage(),
                            handleIncrementCountScreen()
                    }}
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
