import { GLOBAL_APP_PATH } from '@/constants/global_path'
import { getRandomNumber } from '@/constants/helpers';
import { INVENTORY_ITEM_ARMOR_SUBTYPE, INVENTORY_ITEM_CONSUMBLES_SUBTYPE, INVENTORY_ITEM_TYPE, INVENTORY_ITEM_WEAPON_SUBTYPE, useCharacterStore } from '@/store/character_store';
import { useEnemyStore } from '@/store/enemy_store';
import { useGlobalStore } from '@/store/global_store'
import { Location_content_type, useLocationStore } from '@/store/location_store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiText } from 'moti';
import React, { useEffect, useState } from 'react'
import { Text, View, Image, ImageBackground, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native'



const rewards = [
    { id: '0', name: "Золотая монета", value: 10, type: INVENTORY_ITEM_TYPE.CONSUMBLES, subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE.CURRENCY },
    { id: '1', name: "Меч героя", value: 1, type: INVENTORY_ITEM_TYPE.WEAPON, subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SWORD },
    { id: '2', name: "Зелье здоровья", value: 5, type: INVENTORY_ITEM_TYPE.CONSUMBLES, subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE.POTION },
    { id: '3', name: "Редкий кристалл", value: 2, type: INVENTORY_ITEM_TYPE.CONSUMBLES, subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE.CRYSTAL },
    { id: '4', name: "Ключ от сундука", value: 1, type: INVENTORY_ITEM_TYPE.CONSUMBLES, subType: INVENTORY_ITEM_CONSUMBLES_SUBTYPE.KEY },
    { id: '5', name: "Меч дракона", value: 1, type: INVENTORY_ITEM_TYPE.WEAPON, subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SWORD },
    { id: '6', name: "Эльфийский лук", value: 1, type: INVENTORY_ITEM_TYPE.WEAPON, subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BOW },
    { id: '7', name: "Копьё воина", value: 1, type: INVENTORY_ITEM_TYPE.WEAPON, subType: INVENTORY_ITEM_WEAPON_SUBTYPE.SPEAR },
    { id: '8', name: "Булава огра", value: 1, type: INVENTORY_ITEM_TYPE.WEAPON, subType: INVENTORY_ITEM_WEAPON_SUBTYPE.BLUNT },
    { id: '9', name: "Шлем воина", value: 1, type: INVENTORY_ITEM_TYPE.ARMOR, subType: INVENTORY_ITEM_ARMOR_SUBTYPE.HELMET },
    { id: '10', name: "Шлем варвара", value: 1, type: INVENTORY_ITEM_TYPE.ARMOR, subType: INVENTORY_ITEM_ARMOR_SUBTYPE.HELMET },
    { id: '11', name: "Легкие ботинки", value: 1, type: INVENTORY_ITEM_TYPE.ARMOR, subType: INVENTORY_ITEM_ARMOR_SUBTYPE.BOOTS },
    { id: '12', name: "Кожанные сапоги", value: 1, type: INVENTORY_ITEM_TYPE.ARMOR, subType: INVENTORY_ITEM_ARMOR_SUBTYPE.BOOTS },
    { id: '13', name: "Броня рыцаря", value: 1, type: INVENTORY_ITEM_TYPE.ARMOR, subType: INVENTORY_ITEM_ARMOR_SUBTYPE.BODY },
    { id: '14', name: "Доспех воителя", value: 1, type: INVENTORY_ITEM_TYPE.ARMOR, subType: INVENTORY_ITEM_ARMOR_SUBTYPE.BODY },
];

const countTreasureRollDefault = 3

const defaultTreasure = { id: '', name: 'treasure', value: 0, type: '', subType: '' }

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
    const setChracterInventory = useCharacterStore(state => state.characterInventoryUpdate)



    const [countScreen, setCountScreen] = useState(0)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isTresure, setIsTreausre] = useState(false)
    const [isChooseTreasure, setIsChooseTreasure] = useState(false)
    const [countRollTreasure, setCountRollTreasure] = useState(countTreasureRollDefault)

    const [currentReward, setCurrentReward] = useState(defaultTreasure);
    const [finalReward, setFinalReward] = useState<null | { id: string, name: string; value: number; type: string, subType: string }>(null);
    const [isRolling, setIsRolling] = useState(false);


    const [locationImage, setLocationImage] = useState<Location_content_type>({ name: '', model: 0, group: '' })

    const startLottery = () => {
        if (countRollTreasure === 0) {
            return
        }
        setIsRolling(true);
        setFinalReward(null);
        setCountRollTreasure(countRollTreasure - 1)
        let count = 0;
        const interval = setInterval(() => {
            setCurrentReward(rewards[Math.floor(Math.random() * rewards.length)]);
            count++;

            if (count > 10) { // Через 10 итераций останавливаемся
                clearInterval(interval);
                const selectedReward = rewards[Math.floor(Math.random() * rewards.length)];
                setFinalReward(selectedReward);
                setIsRolling(false);
            }
        }, 100); // Скорость смены элементов (100мс)
    };

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



    const getRandomReward = (): { name: string; value: number } => {
        const randomIndex = Math.floor(Math.random() * rewards.length);
        return rewards[randomIndex];
    }

    const chanceFindTreasurePercent = 30

    const chanceFindTreasure = (percent: number): boolean => {
        return Math.random() * 100 < percent;
    }

    const handleDecrementCountScreen = () => {
        setCountScreen(countScreen + 1)
        setIsTreausre(chanceFindTreasure(chanceFindTreasurePercent))
    }
    const handleIncrementCountScreen = () => {
        setCountScreen(countScreen + 1)
        setIsTreausre(chanceFindTreasure(chanceFindTreasurePercent))
    }
    const handleGetTreasure = () => {
        setIsChooseTreasure(true)
    }
    const handleCancelGetTreasure = () => {
        setModalVisible(false)
    }

    const handleSubmitTreasure = () => {
        setIsChooseTreasure(false)
        setIsTreausre(false)
        setModalVisible(false)
        setCurrentReward(defaultTreasure)
        setFinalReward(defaultTreasure)
        setCountRollTreasure(countTreasureRollDefault)
        setChracterInventory(finalReward && finalReward !== null ? finalReward : currentReward)

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
        if (isTresure && countScreen !== countScreenToBattle) {
            setModalVisible(true)
        }
    }, [isTresure, countScreen, countScreenToBattle])

    useEffect(() => {
        if (countScreen >= countScreenToBattle) {
            if (isTresure) {
                setIsTreausre(false)
            }
            setModalVisible(true)
            setRandomCurrentEnemy(currentLocation)
            setCountScreenToBattle(getRandomNumber(1, 4))
            setCountScreen(0)
        }
    }, [isTresure, countScreen, countScreenToBattle]);



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
                    {isTresure ? <View style={styles.modalContainer}>
                        <Text>You Find Treasure!</Text>
                        {isChooseTreasure ?
                            <View
                                style={{
                                }}>
                                {currentReward && (
                                    <MotiText
                                        from={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", damping: 10 }}
                                        style={{
                                            fontSize: 12,
                                            fontWeight: "bold",
                                            color: "black", // Убедись, что цвет текста виден
                                            padding: 20,
                                            backgroundColor: "gold",
                                            borderRadius: 10,
                                            textAlign: "center",
                                            minWidth: 200,
                                            minHeight: 60, // Увеличиваем высоту, чтобы текст не сжимался
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        {finalReward?.name || currentReward?.name || "Награда"}
                                    </MotiText>
                                )}
                                <View style={{
                                    flexDirection: 'row',
                                    gap: 6,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        marginTop: 20,
                                        padding: 10,
                                        backgroundColor: isRolling || countRollTreasure === 0 ? "gray" : "orange",
                                        height: 40,
                                    }}
                                    >{countRollTreasure}</Text>
                                    <TouchableOpacity
                                        onPress={startLottery}
                                        disabled={isRolling || countRollTreasure === 0}
                                        style={{
                                            marginTop: 20,
                                            padding: 10,
                                            backgroundColor: isRolling || countRollTreasure === 0 ? "gray" : "orange",
                                            height: 40,
                                        }}
                                    >
                                        <Text
                                            style={{

                                                color: "black",
                                                fontSize: 12,
                                                fontWeight: "bold",
                                                textAlign: "center",
                                            }}
                                        >
                                            {isRolling ? "Waiting..." : "Get Treasure"}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleSubmitTreasure}
                                        disabled={isRolling || currentReward.name === 'treasure'}
                                        style={{
                                            marginTop: 20,
                                            padding: 10,
                                            backgroundColor: isRolling || currentReward.name === 'treasure' ? "gray" : "orange",
                                            height: 40,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "black",
                                                fontSize: 12,
                                                fontWeight: "bold",
                                                textAlign: "center",
                                            }}
                                        >
                                            Done
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={{
                                flexDirection: 'row',
                                gap: 10
                            }}>
                                <TouchableOpacity
                                    onPress={handleGetTreasure}
                                    style={{
                                        backgroundColor: 'red',
                                        padding: 4,
                                        borderRadius: 6
                                    }}>
                                    <Text>Get!</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleCancelGetTreasure}
                                    style={{
                                        backgroundColor: 'gray',
                                        padding: 4,
                                        borderRadius: 6
                                    }}
                                >
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View> :
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
                    }

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
