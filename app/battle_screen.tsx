import { Animated, Button, ImageBackground, Pressable, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, Image } from "react-native";
import Character from "../components/player/character";
import { useLocalSearchParams, useRouter } from "expo-router";
import Enemy from "@/components/enemy/enemy";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { battleScreenStyles } from '../styles/battle_screen_styles'
import { BlurView } from 'expo-blur';
import { useLocationStore } from "@/store/location_store";
import { MotiView } from "moti";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { CURRENT_TARGET_TO_MOVE, INCOMING_STATUS, STATUS_BATTLE_SCREEN, UPDATE_STATS, useBattleStore } from "@/store/battle_store";
import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF, UPDATE_CHARACTER_STATS, useCharacterStore } from "@/store/character_store";
import { getRandomNumber } from "@/constants/helpers";
import { ConsumableType, REWARD_VARIANT, useItemsStore } from "@/store/items_strore";
import ModalWindow, { VARIANTS_MODAL_WINDOW } from "@/components/modal_window/modal_window";
import { BOSS_STAGE, useEnemyStore } from "@/store/enemy_store";
import { useGlobalStore } from "@/store/global_store";
import { ACTIONS, ACTIONS_LIST, ActionsTypes, BATTLE_TYPE, BATTLE_TYPE_PROPS, BUTTON_LIST, VARIANTS_ITEMS } from "@/constants/battleScreen";
import { SCENARIO_HOOKS } from "@/constants/store/items/scenario";


const buttonOrange = require('../assets/buttons/orange_button_01(small).png')
const buttonDisabled = require('../assets/buttons/orange_button_01(small_disabled).png')
const playerPreview = require('../assets/character/player_preview.jpg')
const chestPreview = require('../assets/items/chest/chest_01.jpg')

export default function Battle_Screen() {
    const { scenarioHook, typeBattle } = useLocalSearchParams();

    const router = useRouter();





    const locationToBattle = useLocationStore(state => state.locationToBattleScreen)
    const location = useLocationStore(state => state.currentLocation)
    const updateCharacter = useBattleStore(state => state.updateCharacterStats)
    const updateEnemy = useBattleStore(state => state.updateEnemyStats)
    const characterBattleStats = useBattleStore(state => state.character)
    const characterUpdateStats = useCharacterStore(state => state.updateCharacterStats)
    const characterStats = useCharacterStore(state => state.characterStats)
    const enemyStats = useEnemyStore(state => state.currentEnemy)
    //battle store
    const enemyBattleStats = useBattleStore(state => state.enemy)
    const defaultState = useBattleStore(state => state.setDefaultState)
    const currentTargetToMove = useBattleStore(state => state.currentTargetToMove)
    const setBattleStatus = useBattleStore(state => state.setBattleStatus)
    //
    const currentConsumblesOnCharacterInventory = useCharacterStore(state => state.characterInventory)
    const consumblesFullItems = useItemsStore(state => state.consumbles)
    const currentState = useGlobalStore(state => state.currentState)
    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const getCurrentBoss = useEnemyStore(state => state.getCurrentBoss)
    const setCurrentEnemy = useEnemyStore(state => state.setCurrentEnemy)
    //

    const handleHealPotionsItems = () => getPotionsByType(INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE);
    const handleAttackPotionsItems = () => getPotionsByType(INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.ATTACK_BUFF);
    const handleDefensePotionsItems = () => getPotionsByType(INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.DEFENSE_BUFF);
    const handleEvasionPotionsItems = () => getPotionsByType(INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.EVASION_BUFF);
    //state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isItemsActive, setIsItemsActive] = useState(false)
    const [activeButton, setActiveButton] = useState(BUTTON_LIST.HEALTH)
    const [enemyAction, setEnemyAction] = useState<ActionsTypes>(ACTIONS.NOTHING)
    const [activeConsumbles, setActiveConsumbles] = useState<ConsumableType[]>([])
    const [currentTypeBattle, setCurrentTypeBattle] = useState<BATTLE_TYPE>(BATTLE_TYPE.DEFAULT)
    const [isTurn, setIsTurn] = useState(false)
    //



    const FOCUS_ELEMENT = {
        CHARACTER: 'character',
        ENEMY: 'enemy',
        NOTHING: 'nothing'
    }


    const handleModalCloseStatus = () => {
        setIsModalOpen(false)
    }




    const handleDefenseButton = () => {

    }
    const handleStandButton = () => {

    }

    const handleItemsButton = () => {
        setIsItemsActive(true)
        setActiveConsumbles(handleHealPotionsItems())

    }

    const getPotionsByType = (subType: string) => {
        return consumblesFullItems.filter((potion) =>
            currentConsumblesOnCharacterInventory.some((item) => item.id === potion.id && potion.subType === subType)
        );
    };


    const handleRetreatButton = () => {
        setIsModalOpen(true)

    }

    const handleAttackButton = () => {
        updateEnemy(UPDATE_STATS.HP, characterBattleStats.attack)
        setEnemyAction(ACTIONS.ATTACK);
        updateCharacter({
            updateCurrentStats: UPDATE_STATS.HP,
            incomingStatus: INCOMING_STATUS.ATTACK
        }, enemyStats.stats.attack);
    };

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

    const handleActionsCallBackButton = (variant: string) => {

        switch (variant) {
            case ACTIONS_LIST.ATTACK:
                handleAttackButton()
                break;
            case ACTIONS_LIST.DEFENSE:

                break;
            case ACTIONS_LIST.STAND:

                break;
            case ACTIONS_LIST.ITEMS:
                handleItemsButton()
                break;
            case ACTIONS_LIST.RETREAT:
                handleRetreatButton()
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



    const objectModalSettings = {
        variant: VARIANTS_MODAL_WINDOW.RETREAT,
        callBack: handleRetreatConfirm
    }

    type SubTypeItems =
        | INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF
        | INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS
        | INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY
        | INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL
        | INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS;

    const handleItemsUse = (variant: SubTypeItems, items: ConsumableType) => {
        switch (variant) {
            case INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE:
                const restoreHP = {
                    updateCurrentStats: UPDATE_STATS.HP,
                    incomingStatus: INCOMING_STATUS.ITEM
                }
                updateCharacter(restoreHP, items.stats?.healPotion ?? 0)
                break;
            case INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.ATTACK_BUFF:
                const attackBuff = {
                    updateCurrentStats: UPDATE_STATS.ATTACK,
                    incomingStatus: INCOMING_STATUS.ITEM
                }
                updateCharacter(attackBuff, items.stats?.attack ?? 0)
                break;
            case VARIANTS_ITEMS.DEFENSE:
                const defenseBuff = {
                    updateCurrentStats: UPDATE_STATS.ATTACK,
                    incomingStatus: INCOMING_STATUS.ITEM
                }
                updateCharacter(defenseBuff, items.stats?.defense ?? 0)
                break;
            case VARIANTS_ITEMS.EVASION:
                const evasionBuff = {
                    updateCurrentStats: UPDATE_STATS.ATTACK,
                    incomingStatus: INCOMING_STATUS.ITEM
                }
                updateCharacter(evasionBuff, items.stats?.evasion ?? 0)
                break;
        }
    }

    useEffect(() => {
        updateCharacter({ updateCurrentStats: UPDATE_STATS.ALL, incomingStatus: INCOMING_STATUS.ATTACK }, characterStats ? characterStats : default_stats_character)

        switch (typeBattle) {
            case BATTLE_TYPE_PROPS.MONSTER:
                setCurrentTypeBattle(BATTLE_TYPE.MONSTER)
                setBattleStatus(STATUS_BATTLE_SCREEN.MONSTER_BATTLE)

                updateEnemy(UPDATE_STATS.ALL, enemyStats.stats ? enemyStats.stats : default_stats_enemy)
                break;
            case BATTLE_TYPE_PROPS.BOSS:
                setBattleStatus(STATUS_BATTLE_SCREEN.BOSS_BATTLE)
                if (scenarioHook === SCENARIO_HOOKS.FIRST_BATTLE) {
                    const currentBoss = getCurrentBoss(BOSS_STAGE.FIRST)
                    setCurrentEnemy(currentBoss)
                    updateEnemy(UPDATE_STATS.ALL, currentBoss.stats ? currentBoss.stats : default_stats_enemy)
                }
                setCurrentTypeBattle(BATTLE_TYPE.BOSS)
                break;
            default:
                setCurrentTypeBattle(BATTLE_TYPE.DEFAULT),
                    setBattleStatus(STATUS_BATTLE_SCREEN.DEFAULT)

                updateEnemy(UPDATE_STATS.ALL, default_stats_enemy)
        }
    }, [typeBattle])

    useEffect(() => {
        const targetToReward = REWARD_VARIANT.MONSTER
        if (enemyBattleStats.death) {
            const expirience = getRandomNumber(5, 200)
            characterUpdateStats(UPDATE_CHARACTER_STATS.EXPIRIENCE, expirience)
            router.push({
                pathname: GLOBAL_APP_PATH.VICTORY_SCREEN,
                params: { location, expirience, targetToReward }
            });
            updateEnemy(UPDATE_STATS.ALL, default_stats_enemy)
        }

        if (characterBattleStats.death) {
            defaultState()
            router.push({
                pathname: GLOBAL_APP_PATH.LOSE_SCREEN
            })
        }
    }, [enemyBattleStats.death, characterBattleStats.death])


    useEffect(() => {
        if (currentState !== GLOBAL_APP_PATH.BATTLE_SCREEN) {
            setCurrentState(GLOBAL_APP_PATH.BATTLE_SCREEN)
        }

    }, [])


    return (
        <SafeAreaView
            style={battleScreenStyles.mainContainer}
        >
            <ImageBackground
                source={locationToBattle.model}
                resizeMode='cover'
                style={battleScreenStyles.imageBackground}

            >
                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black'

                }}>
                    {isItemsActive && <Character />}
                    {isTurn && <View style={{
                        backgroundColor: 'white',
                        width: '60%',
                        height: 60,
                        borderRadius: 10,
                        position: 'absolute',
                        right: 70,
                        top: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 3
                    }}>
                        <Text>{enemyAction.title !== ACTIONS.NOTHING.title ? enemyAction.description : ''}</Text>
                    </View>}
                    <Enemy />

                    {isModalOpen &&
                        <ModalWindow
                            onClose={handleModalCloseStatus}
                            objectSetting={objectModalSettings} />}
                    <View style={{
                        position: 'absolute', // Фиксируем внизу
                        bottom: 0, // Прижимаем к нижнему краю
                        width: '100%',
                        height: '28%',
                        backgroundColor: 'black',
                        justifyContent: 'center', // Центрируем содержимое
                        alignItems: 'center', // Центрируем текст
                        borderTopLeftRadius: 10, // Закруглим углы для красоты
                        borderTopRightRadius: 10,
                        shadowColor: '#000',
                        zIndex: 3,
                        shadowOffset: { width: 0, height: -2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 5, // Тень для Android
                    }}>
                        <View style={battleScreenStyles.buttonContainer}>
                            <Image
                                source={isItemsActive ? chestPreview : playerPreview}
                                style={{
                                    position: 'absolute',
                                    left: -160,
                                    bottom: -140,
                                    borderRadius: 1000,
                                    transform: [{ scale: 0.4 }]
                                }}
                            />
                            {isItemsActive ? <View style={battleScreenStyles.buttonView}>

                                <TouchableOpacity style={isTurn ? battleScreenStyles.buttonDisable : battleScreenStyles.button}
                                    onPress={() => handleItemsCallBackButton(BUTTON_LIST.HEALTH)}
                                    disabled={isTurn}

                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={[battleScreenStyles.buttonBackground, {
                                            marginLeft: 80
                                        }]}
                                    >
                                        <Text style={battleScreenStyles.buttonText}>HEALTH</Text>
                                    </ImageBackground>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[battleScreenStyles.button, {
                                        marginLeft: 120
                                    }]}
                                    onPress={() => handleItemsCallBackButton(BUTTON_LIST.ATTACK)}
                                    disabled={isTurn}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={battleScreenStyles.buttonBackground}
                                    >
                                        <Text style={battleScreenStyles.buttonText}>ATTACK</Text>
                                    </ImageBackground>
                                </TouchableOpacity >
                                <TouchableOpacity
                                    style={[battleScreenStyles.button, { marginLeft: 150 }]}
                                    disabled={isTurn}
                                    onPress={() => handleItemsCallBackButton(BUTTON_LIST.DEFENSE)}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={battleScreenStyles.buttonBackground

                                        }
                                    >
                                        <Text style={battleScreenStyles.buttonText}>DEFENSE</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[battleScreenStyles.button, { marginLeft: 120 }]}
                                    onPress={() => handleItemsCallBackButton(BUTTON_LIST.EVASION)}
                                    disabled={isTurn}

                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={battleScreenStyles.buttonBackground}
                                    >
                                        <Text style={battleScreenStyles.buttonText}>EVASION</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[battleScreenStyles.button,
                                    { marginLeft: 80 }]}
                                    onPress={() => handleItemsCallBackButton(BUTTON_LIST.CLOSE)}
                                    disabled={isTurn}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={battleScreenStyles.buttonBackground}
                                    >
                                        <Text style={battleScreenStyles.buttonText}>CLOSE</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View> : <View style={battleScreenStyles.buttonView}>

                                <TouchableOpacity style={isTurn ? battleScreenStyles.buttonDisable : battleScreenStyles.button}
                                    onPress={handleAttackButton}
                                    disabled={isTurn}

                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={[battleScreenStyles.buttonBackground, {
                                            marginLeft: 80
                                        }]}
                                    >
                                        <Text style={battleScreenStyles.buttonText}>ATTACK</Text>
                                    </ImageBackground>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[battleScreenStyles.button, {
                                        marginLeft: 120
                                    }]}
                                    disabled={isTurn}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={battleScreenStyles.buttonBackground}
                                    >
                                        <Text style={battleScreenStyles.buttonText}>DEFENSE</Text>
                                    </ImageBackground>
                                </TouchableOpacity >
                                <TouchableOpacity
                                    style={[battleScreenStyles.button, { marginLeft: 150 }]}
                                    disabled={isTurn}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={battleScreenStyles.buttonBackground

                                        }
                                    >
                                        <Text style={battleScreenStyles.buttonText}>STAND</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[battleScreenStyles.button,
                                    { marginLeft: 120 }]}
                                    onPress={handleRetreatButton}
                                    disabled={isTurn}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={battleScreenStyles.buttonBackground}
                                    >
                                        <Text style={battleScreenStyles.buttonText}>RETREAT</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[battleScreenStyles.button, { marginLeft: 80 }]}
                                    onPress={handleItemsButton}
                                    disabled={isTurn}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={battleScreenStyles.buttonBackground}
                                    >
                                        <Text style={battleScreenStyles.buttonText}>ITEMS</Text>
                                    </ImageBackground>
                                </TouchableOpacity>

                            </View>}
                        </View>
                        {isItemsActive ?
                            <View style={battleScreenStyles.characterStatsContainer}>
                                {activeConsumbles.map((item) =>
                                    <View
                                        key={item.id}
                                        style={{
                                            margin: 4
                                        }}
                                    >
                                        <TouchableOpacity

                                            onPress={() => handleItemsUse(item.subType, item)}
                                            style={{
                                                backgroundColor: 'yellow'
                                            }}
                                        >
                                            <Text >
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View> : <View></View>
                            // <View style={battleScreenStyles.characterStatsContainer}>
                            //     <Text style={battleScreenStyles.statsTitle}>Character stats:</Text>
                            //     <View style={battleScreenStyles.statContainer}>
                            //         <Text>Name:</Text>
                            //         <Text>{characterStats.name}</Text>
                            //     </View>
                            //     <View style={battleScreenStyles.statContainer}>
                            //         <Text>Level:</Text>
                            //         <Text>{characterStats.level}</Text>
                            //     </View>
                            //     <View style={battleScreenStyles.statContainer}>
                            //         <Text>HP:</Text>
                            //         <Text>{characterBattleStats.healPoints}</Text>
                            //     </View>
                            //     <View style={battleScreenStyles.statContainer}>
                            //         <Text>Attack:</Text>
                            //         <Text>{characterBattleStats.attack}</Text>
                            //     </View>
                            //     <View style={battleScreenStyles.statContainer}>
                            //         <Text>Defense:</Text>
                            //         <Text>{characterBattleStats.defense}</Text>
                            //     </View>
                            //     <View style={battleScreenStyles.statContainer}>
                            //         <Text>Accuracy:</Text>
                            //         <Text>{characterBattleStats.accuracy}</Text>
                            //     </View>
                            //     <View style={battleScreenStyles.statContainer}>
                            //         <Text>Evasion:</Text>
                            //         <Text>{characterBattleStats.evasion}</Text>
                            //     </View>
                            //     <View style={battleScreenStyles.statContainer}>
                            //         <Text>Critical:</Text>
                            //         <Text>{characterBattleStats.criticalRate}</Text>
                            //     </View>
                            //     <View style={battleScreenStyles.statContainer}>
                            //         <Text>Atribute:</Text>
                            //         <Text>{characterBattleStats.atribute}</Text>
                            //     </View>
                            // </View>
                        }

                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

