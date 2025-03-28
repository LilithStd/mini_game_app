import { Animated, Button, ImageBackground, Pressable, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import Character from "../components/player/character";
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import Enemy from "@/components/enemy/enemy";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { battleScreenStyles } from '../styles/battle_screen_styles'
import { BlurView } from 'expo-blur';
import { useLocationStore } from "@/store/location_store";
import { MotiView } from "moti";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { UPDATE_STATS, useBattleStore } from "@/store/battle_store";
import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF, UPDATE_CHARACTER_STATS, useCharacterStore } from "@/store/character_store";
import { getRandomNumber } from "@/constants/helpers";
import { ConsumableType, REWARD_VARIANT, useItemsStore } from "@/store/items_strore";
import ModalWindow, { VARIANTS_MODAL_WINDOW } from "@/components/modal_window/modal_window";
import { useEnemyStore } from "@/store/enemy_store";

export default function Battle_Screen() {
    const { status } = useLocalSearchParams();
    const router = useRouter();
    const BUTTON_LIST = {
        HEALTH: 'active',
        ATTACK: 'attack',
        DEFENSE: 'defense',
        EVASION: 'evasion',
        CLOSE: 'close'
    }

    const locationToBattle = useLocationStore(state => state.locationToBattleScreen)
    const location = useLocationStore(state => state.currentLocation)
    const updateCharacter = useBattleStore(state => state.updateCharacterStats)
    const updateEnemy = useBattleStore(state => state.updateEnemyStats)
    const characterBattleStats = useBattleStore(state => state.character)
    const characterUpdateStats = useCharacterStore(state => state.updateCharacterStats)
    const characterStats = useCharacterStore(state => state.characterStats)
    const enemyStats = useEnemyStore(state => state.currentEnemy)
    // const enemyStats = useBattleStore(state => state.enemy)
    const currentConsumblesOnCharacterInventory = useCharacterStore(state => state.characterInventory)
    const consumblesFullItems = useItemsStore(state => state.consumbles)

    //
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isItemsActive, setIsItemsActive] = useState(false)
    const [activeButton, setActiveButton] = useState(BUTTON_LIST.HEALTH)
    const [activeConsumbles, setActiveConsumbles] = useState<ConsumableType[]>([])
    //

    const FOCUS_ELEMENT = {
        CHARACTER: 'character',
        ENEMY: 'enemy',
        NOTHING: 'nothing'
    }


    const handleModalCloseStatus = () => {
        setIsModalOpen(false)
    }



    const default_stats_character = {
        level: 1,
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
        death: false,
    }
    const default_stats_enemy = {
        level: 1,
        attack: 0,
        defense: 0,
        accuracy: 0,
        criticalRate: 0,
        criticalDamage: 0,
        evasion: 0,
        reduceCriticalDamage: 0,
        atribute: '',
        resistAtribute: '',
        expirience: 0,
        healPoints: 0,
        death: false,
    }


    // const handleAttackButton = () => {
    //     setCurrentElementOnFocus(FOCUS_ELEMENT.ENEMY);
    //     setScaleCharacter(0.7)
    //     setScaleEnemy(1)
    // };
    const handleDefenseButton = () => {

    }
    const handleStandButton = () => {

    }

    const handleItemsButton = () => {
        setIsItemsActive(true)

    }

    const getPotionsByType = (subType: string) => {
        return consumblesFullItems.filter((potion) =>
            currentConsumblesOnCharacterInventory.some((item) => item.id === potion.id && potion.subType === subType)
        );
    };

    const handleHealPotionsItems = () => getPotionsByType(INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE);
    const handleAttackPotionsItems = () => getPotionsByType(INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.ATTACK_BUFF);
    const handleDefensePotionsItems = () => getPotionsByType(INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.DEFENSE_BUFF);
    const handleEvasionPotionsItems = () => getPotionsByType(INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.EVASION_BUFF);


    const handleItemsCallBackButton = (variant: string) => {

        switch (variant) {
            case BUTTON_LIST.HEALTH:
                setActiveButton(variant)
                setActiveConsumbles(handleHealPotionsItems());
                break;
            case BUTTON_LIST.ATTACK:
                setActiveButton(variant)
                setActiveConsumbles(handleAttackPotionsItems())
                break;
            case BUTTON_LIST.DEFENSE:
                setActiveButton(variant)
                setActiveConsumbles(handleDefensePotionsItems())
                break;
            case BUTTON_LIST.EVASION:
                setActiveButton(variant)
                setActiveConsumbles(handleEvasionPotionsItems())
                break;
            case BUTTON_LIST.CLOSE:
                setIsItemsActive(false)
                setActiveButton(BUTTON_LIST.HEALTH)
                setActiveConsumbles(handleHealPotionsItems());
                break;
        }
    }

    const handleItemsCloseButton = () => {
        setIsItemsActive(false)
    }

    const handleRetreatConfirm = () => {
        setIsModalOpen(false)
        const retreat = "retreat";
        router.push({
            pathname: GLOBAL_APP_PATH.VICTORY_SCREEN,
            params: { location, retreat }
        });
    }
    const handleRetreatButton = () => {
        setIsModalOpen(true)

    }
    const enemyTempButton = () => {
        updateEnemy(UPDATE_STATS.HP, characterBattleStats.attack)
    };

    const objectModalSettings = {
        variant: VARIANTS_MODAL_WINDOW.RETREAT,
        callBack: handleRetreatConfirm
    }


    useEffect(() => {
        updateCharacter(UPDATE_STATS.ALL, characterStats ? characterStats : default_stats_character)
        updateEnemy(UPDATE_STATS.ALL, enemyStats.stats ? enemyStats.stats : default_stats_enemy)
    }, [])

    useEffect(() => {
        const targetToReward = REWARD_VARIANT.MONSTER
        if (enemyStats.stats.death) {
            const expirience = getRandomNumber(5, 200)
            characterUpdateStats(UPDATE_CHARACTER_STATS.EXPIRIENCE, expirience)
            router.push({
                pathname: GLOBAL_APP_PATH.VICTORY_SCREEN,
                params: { location, expirience, targetToReward }
            });
            updateEnemy(UPDATE_STATS.ALL, default_stats_enemy)
        }
    }, [enemyStats.stats.death])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center', // Центрирует по горизонтали
                width: '100%',
                height: '100%',
                position: 'relative'
            }}
        >
            <ImageBackground
                source={locationToBattle.model}
                resizeMode='cover'
                style={{
                    flex: 1,
                    width: '100%',  // Убедимся, что фон занимает всю ширину
                    height: '100%', // Убедимся, что фон занимает всю высоту
                    position: 'absolute', // Фиксируем фон на заднем плане

                }}

            >
                <View style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)'
                }}>
                    <Enemy />
                    {isModalOpen &&
                        <ModalWindow
                            onClose={handleModalCloseStatus}
                            objectSetting={objectModalSettings} />}
                    <View style={{
                        position: 'absolute', // Фиксируем внизу
                        bottom: 0, // Прижимаем к нижнему краю
                        width: '100%',
                        height: '30%',
                        backgroundColor: 'white',
                        justifyContent: 'center', // Центрируем содержимое
                        alignItems: 'center', // Центрируем текст
                        borderTopLeftRadius: 10, // Закруглим углы для красоты
                        borderTopRightRadius: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: -2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 5, // Тень для Android
                    }}>
                        <Text>battle interface</Text>
                        <View style={styles.buttonContainer}>
                            {isItemsActive ? <View style={styles.buttonView}>

                                {Object.entries(BUTTON_LIST).map(([key, value]) => (
                                    <TouchableOpacity
                                        key={key}
                                        style={[
                                            styles.button,
                                            activeButton === value && styles.buttonActive // Подсветка активной кнопки
                                        ]}
                                        onPress={() => handleItemsCallBackButton(value)}
                                    >
                                        <Text style={styles.buttonText}>{key}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View> : <View style={styles.buttonView}>
                                <TouchableOpacity style={styles.button}
                                    onPress={enemyTempButton}
                                >
                                    <Text style={styles.buttonText}>ATTACK</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>DEFENSE</Text>
                                </TouchableOpacity >
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>STAND</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}
                                    onPress={handleItemsButton}
                                >
                                    <Text style={styles.buttonText}>ITEMS</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}
                                    onPress={handleRetreatButton}
                                >
                                    <Text style={styles.buttonText}>RETREAT</Text>
                                </TouchableOpacity>
                            </View>}



                        </View>
                        {isItemsActive ?
                            <View style={styles.characterStatsContainer}>
                                {activeConsumbles.map((item) => <Text key={item.id}>
                                    {item.name}
                                </Text>)}
                            </View> :
                            <View style={styles.characterStatsContainer}>
                                <Text style={styles.statsTitle}>Character stats:</Text>
                                <View style={styles.statContainer}>
                                    <Text>Name:</Text>
                                    <Text>{characterStats.name}</Text>
                                </View>
                                <View style={styles.statContainer}>
                                    <Text>Level:</Text>
                                    <Text>{characterStats.level}</Text>
                                </View>
                                <View style={styles.statContainer}>
                                    <Text>HP:</Text>
                                    <Text>{characterStats.healPoints}</Text>
                                </View>
                                <View style={styles.statContainer}>
                                    <Text>Attack:</Text>
                                    <Text>{characterStats.attack}</Text>
                                </View>
                                <View style={styles.statContainer}>
                                    <Text>Defense:</Text>
                                    <Text>{characterStats.defense}</Text>
                                </View>
                                <View style={styles.statContainer}>
                                    <Text>Accuracy:</Text>
                                    <Text>{characterStats.accuracy}</Text>
                                </View>
                                <View style={styles.statContainer}>
                                    <Text>Evasion:</Text>
                                    <Text>{characterStats.evasion}</Text>
                                </View>
                                <View style={styles.statContainer}>
                                    <Text>Critical:</Text>
                                    <Text>{characterStats.criticalRate}</Text>
                                </View>
                                <View style={styles.statContainer}>
                                    <Text>Atribute:</Text>
                                    <Text>{characterStats.atribute}</Text>
                                </View>
                            </View>
                        }

                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        left: 10,
        justifyContent: 'space-between',
        alignItems: 'stretch'

    },
    buttonView: {
        gap: 4,
        alignItems: 'stretch'
    },
    button: {
        backgroundColor: 'green',
        padding: 8,
        borderRadius: 4,
        width: 100,
    },
    buttonActive: {
        backgroundColor: 'aquamarine',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
    characterStatsContainer: {
        position: 'absolute',
        width: '70%',
        height: '90%',
        right: 10,
        backgroundColor: 'grey',
        marginLeft: 50
    },
    statContainer: {
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10,
        justifyContent: 'space-between',
    },
    statsTitle: {
        textAlign: 'center'
    }
})

//alternative_view_reserved
{/* 
                <MotiView
                    animate={{
                        scale: scaleCharacter, // Используем shared value для анимации
                    }}
                    transition={{
                        type: 'spring', // Тип анимации
                        damping: 10,     // Затухание
                        stiffness: 100,  // Жесткость
                    }}
                    style={{
                        position: 'absolute',
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        left: '20%',
                        zIndex: currentElementOnFocus === FOCUS_ELEMENT.CHARACTER ? 3 : 1,
                    }}
                >

                    <View
                        style={{
                            position: 'absolute',
                            gap: 10,
                            width: '30%',
                            top: '40%',

                            zIndex: 1
                        }}
                    >
                        <Button
                            title="attack"
                            onPress={handleAttackButton}
                        />
                        <Button
                            title="defence"
                            onPress={handleDefenseButton}
                        />
                        <Button
                            title="stand"
                            onPress={handleStandButton}
                        />
                        <Button
                            title="retreat"
                            onPress={handleRetreatButton}
                        />
                    </View>

                    <View style={{
                        width: '100%',
                        top: '10%',
                        left: '-40%'
                    }}>

                        <Character />
                    </View>

                </MotiView>
                <MotiView
                    animate={{
                        scale: scaleEnemy, // Используем shared value для анимации
                    }}
                    transition={{
                        type: 'spring', // Тип анимации
                        damping: 10,     // Затухание
                        stiffness: 100,  // Жесткость
                    }}

                    style={{
                        position: 'absolute',
                        zIndex: currentElementOnFocus === FOCUS_ELEMENT.ENEMY ? 3 : 1,
                        width: '100%',
                        left: '-10%'
                        // right: enemyPostion
                    }}>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        position: 'relative',
                        zIndex: 4,
                    }}>

                        <MotiView
                            from={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", duration: 500 }}
                        >
                            <Text style={{
                                position: 'absolute',
                                top: 200,
                                fontSize: 20,
                                backgroundColor: "black",
                                color: "white",
                                padding: 10,
                                borderRadius: 10
                            }}>
                                {characterBattleStats.attack}
                            </Text>
                        </MotiView>

                    </View>
                    <Pressable
                        style={{

                        }}
                        onPress={enemyTempButton}
                    >
                        <Enemy />
                    </Pressable>
                </MotiView> */}