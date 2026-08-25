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
import { PHASE_STATUS, INCOMING_STATUS, STATUS_BATTLE_SCREEN, UPDATE_STATS, useBattleStore } from "@/store/battle/battle_store";
import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF, UPDATE_CHARACTER_STATS, useCharacterStore } from "@/store/character_store";
import { getRandomNumber } from "@/constants/helpers";
import { ConsumableType, REWARD_VARIANT, useItemsStore } from "@/store/items_strore";
import ModalWindow, { VARIANTS_MODAL_WINDOW } from "@/components/modal_window/modal_window";
import { BOSS_STAGE, useEnemyStore } from "@/store/enemy_store";
import { useGlobalStore } from "@/store/global_store";
import { ACTIONS, ACTIONS_LIST, ActionsTypes, BATTLE_TYPE, BATTLE_TYPE_PROPS, BUTTON_LIST, default_stats_character, default_stats_enemy, SubTypeItems, VARIANTS_ITEMS } from "@/constants/battleScreen";
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
    const characterStats = useCharacterStore(state => state.characterStats)
    const enemyStats = useEnemyStore(state => state.currentEnemy)
    //battle store
    const defaultState = useBattleStore(state => state.setDefaultState)
    const setBattleStatus = useBattleStore(state => state.setBattleStatus)
    const attack = useBattleStore(state => state.attack)
    const defense = useBattleStore(state => state.defense)
    const isActiveTurn = useBattleStore(state => state.isActiveTurn)
    const setCharacterStats = useBattleStore(state => state.setCharacterStats)
    const setEnemyStats = useBattleStore(state => state.setEnemyStats)
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
    const [enemyAction, setEnemyAction] = useState<ActionsTypes>(ACTIONS.NOTHING)
    const [activeConsumbles, setActiveConsumbles] = useState<ConsumableType[]>([])
    const [currentTypeBattle, setCurrentTypeBattle] = useState<BATTLE_TYPE>(BATTLE_TYPE.DEFAULT)
    //
    // initialization Battle screen
    useEffect(() => {
        setCharacterStats(characterStats)
        setEnemyStats(enemyStats)
    }, [isActiveTurn])
    // 

    const handleModalCloseStatus = () => {
        setIsModalOpen(false)
    }




    const handleDefenseButton = () => {

    }
    const handleStandButton = () => {

    }

    const handleItemsButton = () => {
        // setIsItemsActive(true)
        // setActiveConsumbles(handleHealPotionsItems())

    }

    const getPotionsByType = (subType: string) => {
        // return consumblesFullItems.filter((potion) =>
        //     currentConsumblesOnCharacterInventory.some((item) => item.id === potion.id && potion.subType === subType)
        // );
    };


    const handleRetreatButton = () => {
        // setIsModalOpen(true)

    }

    const handleAttackButton = () => {
        // updateEnemy(UPDATE_STATS.HP, characterBattleStats.attack)
        // setEnemyAction(ACTIONS.ATTACK);
        // updateCharacter({
        //     updateCurrentStats: UPDATE_STATS.HP,
        //     incomingStatus: INCOMING_STATUS.ATTACK
        // }, enemyStats.stats.attack);
    };

    const handleItemsCallBackButton = (variant: string) => {

        // switch (variant) {
        //     case BUTTON_LIST.HEALTH:
        //         setActiveButton(variant)
        //         setActiveConsumbles(handleHealPotionsItems());
        //         break;
        //     case BUTTON_LIST.ATTACK:
        //         setActiveButton(variant)
        //         setActiveConsumbles(handleAttackPotionsItems())
        //         break;
        //     case BUTTON_LIST.DEFENSE:
        //         setActiveButton(variant)
        //         setActiveConsumbles(handleDefensePotionsItems())
        //         break;
        //     case BUTTON_LIST.EVASION:
        //         setActiveButton(variant)
        //         setActiveConsumbles(handleEvasionPotionsItems())
        //         break;
        //     case BUTTON_LIST.CLOSE:
        //         setIsItemsActive(false)
        //         setActiveButton(BUTTON_LIST.HEALTH)
        //         setActiveConsumbles(handleHealPotionsItems());
        //         break;
        // }
    }

    const handleActionsCallBackButton = (variant: string) => {

        // switch (variant) {
        //     case ACTIONS_LIST.ATTACK:
        //         handleAttackButton()
        //         break;
        //     case ACTIONS_LIST.DEFENSE:
        //         break;
        //     case ACTIONS_LIST.STAND:

        //         break;
        //     case ACTIONS_LIST.ITEMS:
        //         handleItemsButton()
        //         break;
        //     case ACTIONS_LIST.RETREAT:
        //         handleRetreatButton()
        //         break;
        // }
    }

    const handleItemsCloseButton = () => {
        // setIsItemsActive(false)
    }

    const handleRetreatConfirm = () => {
        // setIsModalOpen(false)
        // const retreat = "retreat";
        // router.push({
        //     pathname: GLOBAL_APP_PATH.VICTORY_SCREEN,
        //     params: { location, retreat }
        // });
    }



    const objectModalSettings = {
        variant: VARIANTS_MODAL_WINDOW.RETREAT,
        callBack: handleRetreatConfirm
    }



    const handleItemsUse = (variant: SubTypeItems, items: ConsumableType) => {
        // switch (variant) {
        //     case INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS.HEAL_RESTORE:
        //         const restoreHP = {
        //             updateCurrentStats: UPDATE_STATS.HP,
        //             incomingStatus: INCOMING_STATUS.ITEM
        //         }
        //         updateCharacter(restoreHP, items.stats?.healPotion ?? 0)
        //         break;
        //     case INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF.ATTACK_BUFF:
        //         const attackBuff = {
        //             updateCurrentStats: UPDATE_STATS.ATTACK,
        //             incomingStatus: INCOMING_STATUS.ITEM
        //         }
        //         updateCharacter(attackBuff, items.stats?.attack ?? 0)
        //         break;
        //     case VARIANTS_ITEMS.DEFENSE:
        //         const defenseBuff = {
        //             updateCurrentStats: UPDATE_STATS.ATTACK,
        //             incomingStatus: INCOMING_STATUS.ITEM
        //         }
        //         updateCharacter(defenseBuff, items.stats?.defense ?? 0)
        //         break;
        //     case VARIANTS_ITEMS.EVASION:
        //         const evasionBuff = {
        //             updateCurrentStats: UPDATE_STATS.ATTACK,
        //             incomingStatus: INCOMING_STATUS.ITEM
        //         }
        //         updateCharacter(evasionBuff, items.stats?.evasion ?? 0)
        //         break;
        // }
    }


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
                    {isActiveTurn && <View style={{
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
                    <View style={battleScreenStyles.absoluteContainer}>
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

                                <TouchableOpacity style={isActiveTurn ? battleScreenStyles.buttonDisable : battleScreenStyles.button}
                                    // onPress={() => handleItemsCallBackButton(BUTTON_LIST.HEALTH)}
                                    disabled={isActiveTurn}

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
                                    // onPress={() => handleItemsCallBackButton(BUTTON_LIST.ATTACK)}
                                    disabled={isActiveTurn}
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
                                    disabled={isActiveTurn}
                                    // onPress={() => handleItemsCallBackButton(BUTTON_LIST.DEFENSE)}
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
                                    // onPress={() => handleItemsCallBackButton(BUTTON_LIST.EVASION)}
                                    disabled={isActiveTurn}

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
                                    // onPress={() => handleItemsCallBackButton(BUTTON_LIST.CLOSE)}
                                    disabled={isActiveTurn}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={battleScreenStyles.buttonBackground}
                                    >
                                        <Text style={battleScreenStyles.buttonText}>CLOSE</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View> : <View style={battleScreenStyles.buttonView}>

                                <TouchableOpacity style={true ? battleScreenStyles.buttonDisable : battleScreenStyles.button}
                                    // onPress={handleAttackButton}
                                    disabled={isActiveTurn}

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
                                    disabled={isActiveTurn}
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
                                    disabled={isActiveTurn}
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
                                    // onPress={handleRetreatButton}
                                    // onPress={handleRetreatButton}
                                    disabled={isActiveTurn}
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
                                    // onPress={handleItemsButton}
                                    disabled={isActiveTurn}
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

                                            // onPress={() => handleItemsUse(item.subType, item)}
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
                        }

                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

