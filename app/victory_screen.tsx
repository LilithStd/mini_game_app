import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { REWARD_VARIANT, useItemsStore } from "@/store/items_strore";
import { useLocationStore } from "@/store/location_store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";


export default function VictoryScreen() {
    const router = useRouter();
    const { expirience, retreat, targetForReward } = useLocalSearchParams()

    //location_store
    const location = useLocationStore(state => state.locationToBattleScreen)
    const currentLocation = useLocationStore(state => state.currentLocation)
    //items_store
    const getReward = useItemsStore(state => state.getReward)
    //
    const rewardTarget = REWARD_VARIANT.MONSTER
    const reward = getReward(rewardTarget)

    const handleSwitchScreenToLocation = () => {
        router.push({
            pathname: GLOBAL_APP_PATH.LOCATION_CHOOSE_SCREEN,
            params: { currentLocation }
        });
    }

    const handleContinueBattle = () => {
        router.push({
            pathname: GLOBAL_APP_PATH.LOCATION_SCREEN,
            params: { currentLocation }
        });

    }

    return (
        <ImageBackground
            style={{
                flex: 1, // ✅ Заполняет весь экран
                width: "100%",
                height: "100%",
                alignItems: "center", // Центрирует по горизонтали
                justifyContent: "center", // Центрирует по вертикали
            }}
            source={location.model}
            resizeMode="cover"
        >
            <View
                style={{
                    backgroundColor: "white",
                    width: "80%",
                    padding: 20, // Добавляем отступы внутри блока
                    borderRadius: 20, // Закругляем углы
                    alignItems: "center", // Центрирует текст внутри View
                }}
            >{retreat ?
                <View>
                    <Text>you retreated and lost progress on the location</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'green',
                            margin: '5%',
                            padding: '3%',
                            borderRadius: 6
                        }}
                        onPress={handleSwitchScreenToLocation}
                    >
                        <Text style={{
                            color: 'white'
                        }}>Return</Text>
                    </TouchableOpacity>
                </View>
                :
                <View>
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>Victory Screen</Text>
                    <Text>EXP:{expirience}</Text>

                    {reward.length === 0 ? <Text>=Nothing reward=</Text> : reward.map((item) => <Text key={item.id}>{item.name} x {item.count}</Text>)}
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'green',
                                margin: '5%',
                                padding: '3%',
                                borderRadius: 6
                            }}
                            onPress={handleSwitchScreenToLocation}
                        >
                            <Text style={{
                                color: 'white'
                            }}>Return</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'green',
                                margin: '5%',
                                padding: '3%',
                                borderRadius: 6
                            }}
                            onPress={handleContinueBattle}
                        >
                            <Text
                                style={{
                                    color: 'white'
                                }}
                            >Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>}

            </View>
        </ImageBackground>
    )
}
