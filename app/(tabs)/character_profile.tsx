import { useCharacterStore } from "@/store/character_store";
import { useLocationStore } from "@/store/location_store";
import { useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";


export default function CharacterProfile() {
    enum CURRENT_PAGE {
        CHARACTER_STATS = 'character stats',
        CHARACTER_INVENTORY = 'character inventory'
    }
    const [currentList, setCurrentList] = useState(CURRENT_PAGE.CHARACTER_STATS)
    const characterStats = useCharacterStore(state => state.characterStats)
    const characterInventory = useCharacterStore(state => state.characterInventory)
    const location = useLocationStore(state => state.locationToBattleScreen)

    return (
        <ImageBackground
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            source={location.model}
            resizeMode="cover"
        >
            <ImageBackground
                style={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%'
                }}
                source={require('../../assets/backgrounds/bg_4.jpg')}
                resizeMode='cover'
            >
                <Text>Character Profile</Text>
                <Image
                    style={{
                        width: '60%',
                        height: '60%'
                    }}
                    source={characterStats.model}
                />
                <View style={{
                    width: '100%',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        // justifyContent: "space-between"
                        justifyContent: 'space-around',
                        backgroundColor: 'grey',
                        paddingBottom: 10,
                        paddingTop: 10
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setCurrentList(CURRENT_PAGE.CHARACTER_STATS)
                            }}
                            style={{
                                backgroundColor: currentList === CURRENT_PAGE.CHARACTER_STATS ? 'green' : 'white',
                                padding: 6
                                // width: '50%'
                            }}>
                            <Text style={{
                                color: currentList === CURRENT_PAGE.CHARACTER_STATS ? 'white' : 'black'
                            }}>{CURRENT_PAGE.CHARACTER_STATS}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCurrentList(CURRENT_PAGE.CHARACTER_INVENTORY)
                            }}
                            style={{
                                backgroundColor: currentList === CURRENT_PAGE.CHARACTER_INVENTORY ? 'green' : 'white',
                                padding: 6
                            }}
                        >
                            <Text
                                style={{
                                    color: currentList === CURRENT_PAGE.CHARACTER_INVENTORY ? 'white' : 'black'
                                }}
                            >{CURRENT_PAGE.CHARACTER_INVENTORY}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            margin: 10,
                            opacity: currentList === CURRENT_PAGE.CHARACTER_STATS ? 1 : 0, // Элемент остается на месте, но невидим
                            pointerEvents: currentList === CURRENT_PAGE.CHARACTER_STATS ? "auto" : "none", // Блокирует клики, если скрыт

                        }}>
                            <Text>Name:{characterStats.name}</Text>
                            <Text>Level:{characterStats.level}</Text>
                            <Text>HP:{characterStats.healPoints}</Text>
                            <Text>Attack:{characterStats.attack}</Text>
                            <Text>Defense:{characterStats.defense}</Text>
                            <Text>EXP:{characterStats.expirience}</Text>
                            <Text>Total Damage:{characterStats.totalDamage}</Text>
                        </View>
                        <View style={{
                            margin: 10,
                            opacity: currentList === CURRENT_PAGE.CHARACTER_INVENTORY ? 1 : 0, // Элемент остается на месте, но невидим
                            pointerEvents: currentList === CURRENT_PAGE.CHARACTER_INVENTORY ? "auto" : "none", // Блокирует клики, если скрыт
                        }}>
                            {characterInventory.map((item) => (
                                <Text key={item.id}>{item.name} x {item.value}</Text>

                            ))}
                        </View>
                    </View>
                </View>
            </ImageBackground>

        </ImageBackground>

    )
}
