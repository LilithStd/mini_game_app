import { useCharacterStore } from "@/store/character_store";
import { useLocationStore } from "@/store/location_store";
import { useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";


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
                        <Text>{CURRENT_PAGE.CHARACTER_STATS}</Text>
                        <Text>{CURRENT_PAGE.CHARACTER_INVENTROY}</Text>
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
                                <View>
                                    <Text>{item.name}</Text>
                                </View>

                            ))}
                        </View>
                    </View>

                </View>


            </View>

        </ImageBackground>

    )
}
