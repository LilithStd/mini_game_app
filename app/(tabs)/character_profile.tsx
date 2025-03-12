import { useCharacterStore } from "@/store/character_store";
import { useLocationStore } from "@/store/location_store";
import { useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";


export default function CharacterProfile() {
    enum CURRENT_PAGE {
        CHARACTER_STATS = 'character stats',
        CHARACTER_INVENTROY = 'character inventory'
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
            <View
                style={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '98%',
                    height: '98%'
                }}
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
                        justifyContent: 'space-around'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setCurrentList(CURRENT_PAGE.CHARACTER_STATS)
                            }}
                            style={{
                                backgroundColor: currentList === CURRENT_PAGE.CHARACTER_STATS ? 'green' : 'white'
                            }}>
                            <Text style={{
                                color: currentList === CURRENT_PAGE.CHARACTER_STATS ? 'white' : 'black'
                            }}>{CURRENT_PAGE.CHARACTER_STATS}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCurrentList(CURRENT_PAGE.CHARACTER_INVENTROY)
                            }}
                            style={{
                                backgroundColor: currentList === CURRENT_PAGE.CHARACTER_INVENTROY ? 'green' : 'white'
                            }}
                        >
                            <Text
                                style={{
                                    color: currentList === CURRENT_PAGE.CHARACTER_INVENTROY ? 'white' : 'black'
                                }}
                            >{CURRENT_PAGE.CHARACTER_INVENTROY}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            margin: 10,

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

                        }}>
                            {characterInventory.map((item) => (
                                <Text key={item.name}>{item.name} x {item.value}</Text>

                            ))}
                        </View>
                    </View>

                </View>


            </View>

        </ImageBackground>

    )
}
