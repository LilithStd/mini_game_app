import { useCharacterStore } from '@/store/character_store'
import { rewards, useItemsStore } from '@/store/items_strore'
import { MotiText } from 'moti'
import { useState } from 'react'
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'

const defaultTreasure = { id: '', name: 'treasure', value: 0, type: '', subType: '' }
const countTreasureRollDefault = 3

type RewardTypes = {
    callback: (status: boolean) => void
}

export default function Reward(rewardProps: RewardTypes) {
    const { callback } = rewardProps
    const getReward = useItemsStore(state => state.getReward)
    const setChracterInventory = useCharacterStore(state => state.characterInventoryUpdate)
    const [isTresure, setIsTreausre] = useState(false)
    const [isChooseTreasure, setIsChooseTreasure] = useState(false)
    const [countRollTreasure, setCountRollTreasure] = useState(countTreasureRollDefault)

    const [currentReward, setCurrentReward] = useState(defaultTreasure);
    const [finalReward, setFinalReward] = useState<null | { id: string, name: string; value: number; type: string, subType: string }>(null);
    const [isRolling, setIsRolling] = useState(false);




    const handleGetTreasure = () => {
        setIsChooseTreasure(true)
    }
    const handleCancelGetTreasure = () => {
        callback(false)
    }

    const handleSubmitTreasure = () => {
        setIsChooseTreasure(false)
        setIsTreausre(false)
        callback(false)
        setCurrentReward(defaultTreasure)
        setFinalReward(defaultTreasure)
        setCountRollTreasure(countTreasureRollDefault)
        setChracterInventory(finalReward && finalReward !== null ? finalReward : currentReward)

    }


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

    return (
        <View style={styles.modalContainer}>
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
        </View>
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