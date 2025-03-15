import { INVENTORY_ITEM_TYPE, useCharacterStore } from "@/store/character_store";
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
    const buttonMask = require('../../assets/mask/mask_brush.png')

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
                        paddingTop: 10,
                        // height: 200,
                        // width: '100%'
                    }}>
                        <ImageBackground
                        // style={{
                        //     width: '100%',
                        //     height: '80%'
                        // }}
                        // source={buttonMask}
                        // resizeMode="cover"
                        >
                            {/* <Image
                            style={{
                                width: '80%',
                                height: '100%',
                            }}
                            source={buttonMask} /> */}
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrentList(CURRENT_PAGE.CHARACTER_STATS)
                                }}
                                style={{
                                    // backgroundColor: currentList === CURRENT_PAGE.CHARACTER_STATS ? 'green' : 'white',
                                    padding: 6
                                    // width: '50%'
                                }}>

                                <Text style={{
                                    color: currentList === CURRENT_PAGE.CHARACTER_STATS ? 'white' : 'black'
                                }}>{CURRENT_PAGE.CHARACTER_STATS}</Text>


                            </TouchableOpacity>
                        </ImageBackground>
                        <TouchableOpacity
                            onPress={() => {
                                setCurrentList(CURRENT_PAGE.CHARACTER_INVENTORY)
                            }}
                            style={{
                                // backgroundColor: currentList === CURRENT_PAGE.CHARACTER_INVENTORY ? 'green' : 'white',
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
                            <View>
                                <Text>Weapon:</Text>
                                {characterInventory.filter((weaponType) => weaponType.type === INVENTORY_ITEM_TYPE.WEAPON).map((element) =>
                                    <Text key={element.id}>{element.name} x {element.value}</Text>
                                )}
                            </View>
                            <View>
                                <Text>Armor:</Text>
                                {characterInventory.filter((armorType) => armorType.type === INVENTORY_ITEM_TYPE.ARMOR).map((element) =>
                                    <Text key={element.id}>{element.name} x {element.value}</Text>
                                )}
                            </View>
                            <View>
                                <Text>Consumbles:</Text>
                                {characterInventory.filter((consumblesType) => consumblesType.type === INVENTORY_ITEM_TYPE.CONSUMBLES).map((element) =>
                                    <Text key={element.id}>{element.name} x {element.value}</Text>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>

        </ImageBackground>

    )
}
