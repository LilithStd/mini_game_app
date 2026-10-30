import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { CharacterInventoryType, useCharacterStore } from "@/store/character_store";
import { useEnemyStore } from "@/store/enemy_store";
import { REWARD_VARIANT, useItemsStore } from "@/store/items_strore";
import { useLocationStore } from "@/store/location_store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {BlurView} from 'expo-blur';
import { Modal, Text, View, TouchableOpacity, Image, ImageBackground, StyleSheet } from "react-native";
const buttonOrange = require('../../assets/buttons/orange_button_01(small).png')
const buttonDisabled = require('../../assets/buttons/orange_button_01(small_disabled).png')


export enum VARIANTS_MODAL_WINDOW {
    RETREAT = 'reatreat',
    VICTORY = 'victory',
    LOSE = 'lose',
    ATTACK = 'attack',
    TREASURE_REWARD = 'treasure_reward',
    MONSTER_REWARD = 'monster_reward',
    DUNGEON_REWARD = 'dungeon_reward',
    BOSS_REWARD = 'boss_reward',
    DEFAULT = 'default'

}

type ModalWindowProps = {
    objectSetting: {
        variant: VARIANTS_MODAL_WINDOW,
        context?: {
            name: string,
            model: number
        }
        callBack?: () => void;
    }
    onClose: () => void;
};
interface ModalBaseTypes {
    name: string,
    description: string,
}

interface ModalTypes {
    retreat: {
        name: string,
        description: string,
    },
    attack: {
        name: string,
        description: string,
        monster: {
            name: string,
            model: number,
        },
    },
    treasureReward: {
        name: string,
        description: string,
        reward: []
    },
    monsterReward: {
        name: string,
        description: string,
        reward: []
    },
    default: {
        name: string,
        description: string
    }
}



export default function ModalWindow({ objectSetting, onClose }: ModalWindowProps) {
    const router = useRouter();
    const location = useLocationStore(state => state.currentLocation)
    const getReward = useItemsStore(state => state.getReward)
    const enemyCurrent = useEnemyStore(state => state.currentEnemy)
    const updateCharacterInventory = useCharacterStore(state => state.characterInventoryUpdate)


    const MODAL_VARIANTS = {
        retreat: {
            name: 'Reatreat Window',
            description: 'you retreated and lost progress on the location, but your still live',
        },
        attack: {
            name: 'Attack Monster Window',
            description: 'Monster Attack you!',
            monster: {
                name: enemyCurrent.name,
                preview: enemyCurrent.model,
            },
        },
        treasureReward: {
            name: 'Treasure Reward Window',
            description: 'Your reward from treasure is here',
            reward: getReward(REWARD_VARIANT.TREASURE)
        },
        monsterReward: {
            name: 'Victory on Monster!',
            description: 'You win in battle! And get reward:',
            reward: getReward(REWARD_VARIANT.MONSTER)
        },
        default: {
            name: 'default',
            description: 'default'
        }
    }

    type ModalVariant = ModalTypes[keyof ModalTypes];

    const [currentModalProps, setCurrentModalProps] = useState<ModalVariant>(MODAL_VARIANTS.default)
    const [currentTypeModal, setCurrentModalType] = useState(VARIANTS_MODAL_WINDOW.DEFAULT)

    const modalConfigure = (variant: VARIANTS_MODAL_WINDOW) => {
        switch (variant) {
            case VARIANTS_MODAL_WINDOW.RETREAT:
                setCurrentModalType(variant)
                setCurrentModalProps(MODAL_VARIANTS.retreat)
                break
            case VARIANTS_MODAL_WINDOW.ATTACK:
                setCurrentModalType(variant)
                setCurrentModalProps(MODAL_VARIANTS.attack)
                break
            case VARIANTS_MODAL_WINDOW.TREASURE_REWARD:
                setCurrentModalType(variant)
                setCurrentModalProps(MODAL_VARIANTS.treasureReward)
                break
            case VARIANTS_MODAL_WINDOW.MONSTER_REWARD:
                setCurrentModalType(variant)
                setCurrentModalProps(MODAL_VARIANTS.monsterReward)
                break
            case VARIANTS_MODAL_WINDOW.BOSS_REWARD:
                break
            case VARIANTS_MODAL_WINDOW.DUNGEON_REWARD:
                break
            case VARIANTS_MODAL_WINDOW.VICTORY:
                break
            case VARIANTS_MODAL_WINDOW.LOSE:
                break
            case VARIANTS_MODAL_WINDOW.DEFAULT:
                setCurrentModalProps(MODAL_VARIANTS.default)
                break
            default:
                console.warn(
                    `wrong request for configure modalProps: ${variant}`,
                );
                break
        }
    }

    const defaultCallBack = () => {

    }

    const callBackModalWindow = () => {
        switch (currentTypeModal) {
            case VARIANTS_MODAL_WINDOW.RETREAT:
                objectSetting.callBack?.(); // сброс состояния боя
                // router.push(GLOBAL_APP_PATH.MAIN);
                onClose();                  // закрытие модального окна
                break;
            case VARIANTS_MODAL_WINDOW.ATTACK:
                router.push(GLOBAL_APP_PATH.BATTLE_SCREEN);
                onClose()
                break;
            case VARIANTS_MODAL_WINDOW.TREASURE_REWARD:
                updateCharacterInventory(MODAL_VARIANTS.treasureReward.reward)
                onClose()
                break;
            case VARIANTS_MODAL_WINDOW.MONSTER_REWARD:
                router.push(GLOBAL_APP_PATH.LOCATION_SCREEN);
                updateCharacterInventory(MODAL_VARIANTS.monsterReward.reward)
                break;
            case VARIANTS_MODAL_WINDOW.BOSS_REWARD:
                break;
            case VARIANTS_MODAL_WINDOW.DUNGEON_REWARD:
                break;
            case VARIANTS_MODAL_WINDOW.VICTORY:
                break;
            case VARIANTS_MODAL_WINDOW.LOSE:
                router.push(GLOBAL_APP_PATH.MAIN);
                onClose();
                break;
            case VARIANTS_MODAL_WINDOW.DEFAULT:
                router.push(GLOBAL_APP_PATH.MAIN);
                break
        }

    }

    useEffect(() => {
        modalConfigure(objectSetting.variant)
    }, [objectSetting.variant])

    return (
        <Modal
            animationType="fade"
            transparent
            visible
            onRequestClose={onClose}
        >
     
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <View
                    style={{
                        // width: 300,
                        // height: 300,
                        width: '80%',
                        // height: '20%',
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: 'hidden', // Добавлено для корректного отображения размытия
                        borderRadius: 20,
                        padding: 20,
                    }}
                >
                    <BlurView
                        intensity={65}
                        tint="light"
                        pointerEvents="none"
                        experimentalBlurMethod="none"
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View
                        pointerEvents="none"
                        style={styles.glassOverlay}
                    />
                    <Text>{currentModalProps.name}</Text>
                    <Text>{currentModalProps.description}</Text>
                    {currentTypeModal === VARIANTS_MODAL_WINDOW.ATTACK &&
                        <View style={{
                            width: '100%',
                            height: '60%'

                        }}>
                            <Text style={{
                                textAlign: 'center'
                            }}>{MODAL_VARIANTS.attack.monster.name}</Text>
                            <View style={{
                                position: 'absolute',
                                borderWidth: 2,
                                bottom: 20,
                                left: 0,
                                width: '100%',
                                height: 100,
                                overflow: 'hidden', // Обрезает выходящие части
                                borderRadius: 10 // Если нужна рамка
                            }}>
                                <Image
                                    source={MODAL_VARIANTS.attack.monster.preview}
                                    resizeMode="cover" // Заполняет контейнер
                                    style={{
                                        width: '100%',
                                        height: 160,
                                        // transform: [{ translateY: 0 }, { translateX: -20 }] // Сдвигаем вверх
                                    }}
                                />
                            </View>


                        </View>

                    }
                    {currentTypeModal === VARIANTS_MODAL_WINDOW.TREASURE_REWARD &&
                        <View>
                            {MODAL_VARIANTS.treasureReward.reward.map((item) =>
                                <Text key={item.id}>
                                    {item.name} x {item.count}
                                </Text>)}
                        </View>}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={callBackModalWindow}
                            style={styles.buttonBackground}>
                            <ImageBackground
                                source={buttonOrange}
                                style={[styles.buttonBackground,{marginLeft: 50}]}
                            >
                                <Text style={styles.buttonText}>Continue</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.buttonBackground}

                        >
                        <ImageBackground
                            source={buttonOrange}
                            style={[styles.buttonBackground,{marginRight: 50}]}
                            >
                                <Text style={styles.buttonText}>Close</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    mainContainer:{    
        overflow: 'hidden',
        borderColor: 'rgba(255,255,255,0.85)',
        backgroundColor: 'rgba(20,20,30,0.12)',    
    },
    glassOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15,20,25,0.20)',
    },
    buttonBackground: {
        width: 182,
        height: 47,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scale: 0.8 }],
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    
});