import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { useEnemyStore } from "@/store/enemy_store";
import { REWARD_VARIANT, useItemsStore } from "@/store/items_strore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Text, View, TouchableOpacity, Image } from "react-native";



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
        }
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
    const getReward = useItemsStore(state => state.getReward)
    const enemyCurrent = useEnemyStore(state => state.currentEnemy)
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
                model: enemyCurrent.model,
            }
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
        router.push(GLOBAL_APP_PATH.MAIN);
    }

    const callBackModalWindow = () => {
        objectSetting.callBack
            ? objectSetting.callBack()
            : defaultCallBack()
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
                        width: 300,
                        height: 300,
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        padding: 20,
                    }}
                >
                    <Text>{currentModalProps.name}</Text>
                    <Text>{currentModalProps.description}</Text>
                    {currentTypeModal === VARIANTS_MODAL_WINDOW.ATTACK &&
                        <View style={{
                            width: '100%',
                            height: '100%'

                        }}>
                            <Text>{MODAL_VARIANTS.attack.monster.name}</Text>
                            <Image
                                resizeMode="contain"
                                style={{
                                    width: '50%',
                                    height: '20%',
                                    transform: [{ translateY: 10 }] // Поднимаем изображение вверх
                                }}
                                source={MODAL_VARIANTS.attack.monster.model}
                            />

                        </View>

                    }
                    {currentTypeModal === VARIANTS_MODAL_WINDOW.TREASURE_REWARD &&
                        <View>
                            {MODAL_VARIANTS.treasureReward.reward.map((item) =>
                                <Text key={item.id}>
                                    {item.name} x {item.count}
                                </Text>)}
                        </View>}
                    <View style={{
                        flexDirection: 'row',
                        gap: 10
                    }}>

                        <TouchableOpacity
                            onPress={callBackModalWindow}
                            style={{
                                marginTop: 20,
                                backgroundColor: 'green',
                                padding: 6,
                                borderRadius: 6
                            }}>
                            <Text style={{ color: "white" }}>Continue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onClose}
                            style={{
                                marginTop: 20,
                                backgroundColor: 'green',
                                padding: 6,
                                borderRadius: 6
                            }}

                        >
                            <Text style={{ color: "white" }}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}
