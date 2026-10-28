import { Animated, Button, ImageBackground, Pressable, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, Image } from "react-native";
import Character from "../components/player/character";
import { useLocalSearchParams,useNavigation, useRouter } from "expo-router";
import { usePreventRemove } from "@react-navigation/native";
import Enemy from "@/components/enemy/enemy";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BlurView } from 'expo-blur';
import { useLocationStore } from "@/store/location_store";
import { MotiView } from "moti";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { PHASE_STATUS, INCOMING_STATUS, STATUS_BATTLE_SCREEN, UPDATE_STATS, useBattleStore } from "@/store/battle/battle_store";
import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CRYSTAL, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_CURRENCY, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_KEYS, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS, INVENTORY_ITEM_CONSUMBLES_SUBTYPE_POTIONS_BUFF, UPDATE_CHARACTER_STATS, useCharacterStore } from "@/store/character_store";
import { getRandomNumber, useGoToMain } from "@/constants/helpers";
import { ConsumableType, REWARD_VARIANT, useItemsStore } from "@/store/items_strore";
import ModalWindow, { VARIANTS_MODAL_WINDOW } from "@/components/modal_window/modal_window";
import { BOSS_STAGE, useEnemyStore } from "@/store/enemy_store";
import { useGlobalStore } from "@/store/global_store";
import { ACTIONS, ACTIONS_LIST, ActionsTypes, BATTLE_TYPE, BATTLE_TYPE_PROPS, BUTTON_LIST, default_stats_character, default_stats_enemy, SubTypeItems, VARIANTS_ITEMS } from "@/constants/battle_screen";
import { SCENARIO_HOOKS } from "@/constants/store/items/scenario";
import CharacterBattle from "@/components/player/character_battle";
import EnemyBattle from "@/components/enemy/enemy_battle";
import ButtonBlock from "@/components/battle_screen/button_block";
import BattleMessage from "@/components/battle_screen/battle_message";


const buttonOrange = require('../assets/buttons/orange_button_01(small).png')
const buttonDisabled = require('../assets/buttons/orange_button_01(small_disabled).png')
const playerPreview = require('../assets/character/player_preview.jpg')
const chestPreview = require('../assets/items/chest/chest_01.jpg')

export default function Battle_Screen() {
    const { scenarioHook, typeBattle } = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();
    const locationToBattle = useLocationStore(state => state.locationToBattleScreen)
    const location = useLocationStore(state => state.currentLocation)
    const characterStats = useCharacterStore(state => state.characterStats)
    const enemyStats = useEnemyStore(state => state.currentEnemy)
    //battle store
    const setBattleStatus = useBattleStore(state => state.setBattleStatus)
    const setPhaseBattle = useBattleStore(state => state.setPhaseBattle)
    const setDefaultState = useBattleStore(state => state.setDefaultState)
    const setDefaultCharacterStats = useCharacterStore(state => state.setDefaultState)
    const setDefaultEnemyStats = useEnemyStore(state => state.setDefaultState)
    const battleMessages = useBattleStore(state => state.battleMessages)
    const startBattle = useBattleStore(state => state.startBattle)
    const attack = useBattleStore(state => state.attack)
    const defense = useBattleStore(state => state.defense)
    const isActiveTurn = useBattleStore(state => state.isActiveTurn)
    const currentPhaseBattle = useBattleStore(state => state.phaseBattle)
    const isInitialized = useBattleStore(state => state.isInitialized)
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
    const [confirmRetreat, setConfirmRetreat] = useState(false)

    //
    const goToMain = useGoToMain();
    const allowExitRef = useRef(false);
    // initialization Battle screen
    useEffect(() => {
        startBattle(characterStats, enemyStats);
    }, []);

    const handleRetreatButton = () => {
        setIsModalOpen(true)
    }

    useEffect(() => {
        if (currentPhaseBattle === PHASE_STATUS.PLAYER_LOSE || currentPhaseBattle === PHASE_STATUS.PLAYER_WIN) {
            handleRetreatButton();
        }
    }, [currentPhaseBattle]);
    // check return to main screen
    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", (event) => {
            if (allowExitRef.current) return;
            event.preventDefault();
            handleRetreatButton();
            if(confirmRetreat) {
                navigation.dispatch(event.data.action);
            }
        });
        return unsubscribe;
    }, [navigation, confirmRetreat]);


        if (!isInitialized) {
        return null;
    }

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

    const handleAttackButton = () => {
        attack()
    };

    const handleItemsCallBackButton = (variant: string) => {
    }

    const handleActionsCallBackButton = (variant: string) => {
    }

    const handleItemsCloseButton = () => {
        // setIsItemsActive(false)
    }

    const handleRetreatConfirm = () => {
        setDefaultState();
        setDefaultCharacterStats();
        setDefaultEnemyStats();
        setPhaseBattle(PHASE_STATUS.DEFAULT);
        allowExitRef.current = true;
        goToMain();
    }



    const objectModalSettings = {
        variant: VARIANTS_MODAL_WINDOW.RETREAT,
        callBack: handleRetreatConfirm
    }



    const handleItemsUse = (variant: SubTypeItems, items: ConsumableType) => {
        
    }

    // components

    const callbacks = {
        handleAttackPress: () => {
            attack();
        },
        handleDefensePress: () => {
            defense();
        },
        handleEvasionPress: () => {},
        handleHealthPress: () => {},
        handleRetreatPress: () => {},
        handleItemsPress: () => {
            setIsItemsActive(!isItemsActive);
        },
    };

    // components
    // const BattleMessage = () => {
    //     if (!battleMessages) return null;
    //     return (
    //         <View style={[styles.battleMessageContainer, styles.backgroundColorStyle]}>
    //             <Text style={styles.battleMessageText}>{ battleMessages.actor ?? 'Unknown title message'} - {battleMessages.type ?? 'Unknown content message'}</Text>
    //         </View>
    //     );
    // }

    return (
        <SafeAreaView
            style={styles.mainContainer}
        >
            <ImageBackground
                source={locationToBattle.model}
                resizeMode='cover'
                style={styles.imageBackground}

            >
                <View style={{
                    flex: 1,
                }}>
                    <View style={styles.visualContainer}>
                        <View style={styles.characterComponentContainer}>
                            <CharacterBattle isItemsActive={isItemsActive} />
                        </View>
                        <View style={styles.enemyComponentContainer}>
                            <EnemyBattle />
                        </View>
                        <View style={styles.battleMessageContainer}>
                            <BattleMessage />
                        </View>
                        <View style={styles.buttonBlockContainer}>
                            <ButtonBlock
                                isActiveTurn={isActiveTurn}
                                isItemsActive={isItemsActive}
                                activeConsumbles={activeConsumbles}
                                callbacks={callbacks}
                            />
                        </View>
                    </View>
                    
                    {isModalOpen &&
                        <ModalWindow
                            onClose={handleModalCloseStatus}
                            objectSetting={objectModalSettings} />}
                   
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
	switchFocusElement: {
		zIndex: 3,
	},
	mainContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
        backgroundColor: 'black',
	},
	imageBackground: {
		flex: 1,
		width: '100%',
		height: '100%',
        
	},
	buttonContainer: {
		left: 10,
		justifyContent: 'space-between',
		alignItems: 'stretch',
	},
	buttonView: {
		gap: 1,

	},
	characterStatsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	buttonBackground: {
		width: 182,
		height: 47,
		justifyContent: 'center',
		alignItems: 'center',
		transform: [{scale: 0.8}],
	},
    backgroundColorStyle: {
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.85)',
        // backgroundColor: 'rgba(20,20,30,0.12)',
        borderRadius: 16,
    },
	button: {
		// width: 120,
	},
	buttonDisable: {
		// backgroundColor: 'grey',
		padding: 8,
		borderRadius: 4,
		width: 100,
	},
	buttonActive: {
		backgroundColor: 'aquamarine',
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 900,
		// color: 'white',
	},
	statContainer: {
		flexDirection: 'row',
		paddingRight: 10,
		paddingLeft: 10,
		justifyContent: 'space-between',
	},
	statsTitle: {
		textAlign: 'center',
	},
    battleMessageContainer:{
        position: 'absolute', 
        bottom: 50, 
        left: 0, 
        right: 0,
        top:100,
        height: 100,
        padding: 10, 
        backgroundColor: 'white', 
        margin: 20, 
        zIndex: 3,
        borderRadius: 20,
    },
    battleMessageText: {
        fontSize: 16,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    visualContainer: {
        flex: 1,
        position: 'relative',
        // width: '100%',
        // height: '100%',
    },
    enemyComponentContainer:{
        position:'absolute',
        width: '100%',
        top: 0,
        zIndex: 1,
    },
    characterComponentContainer:{
        position:'absolute',
        width: '95%',
        bottom: -5,
        
        zIndex: 2,
        // height: '100%',
    },
    buttonBlockContainer: {
        position:'absolute',
        bottom: 10,
        width: '100%',
        zIndex: 2,
        
    }
});