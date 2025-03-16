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
                        height: '60%',
                        opacity: currentList === CURRENT_PAGE.CHARACTER_INVENTORY ? 0.3 : 1
                    }}
                    source={characterStats.model}
                />
                <View style={{
                    width: '100%',

                }}>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        justifyContent: 'space-around',
                        backgroundColor: 'grey',
                        paddingBottom: 10,
                        paddingTop: 10,

                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                setCurrentList(CURRENT_PAGE.CHARACTER_STATS)
                            }}
                            style={{
                                padding: 6
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
                        flexDirection: 'row',
                        width: '100%',
                        height: '50%'
                    }}>
                        <View style={{
                            margin: 10,
                            width: currentList === CURRENT_PAGE.CHARACTER_STATS ? '100%' : '0%',
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

                            width: currentList === CURRENT_PAGE.CHARACTER_INVENTORY ? '100%' : '0%',
                            opacity: currentList === CURRENT_PAGE.CHARACTER_INVENTORY ? 1 : 0, // Элемент остается на месте, но невидим
                            pointerEvents: currentList === CURRENT_PAGE.CHARACTER_INVENTORY ? "auto" : "none", // Блокирует клики, если скрыт
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{
                                width: '50%'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>Equip</Text>
                            </View>
                            <View style={{
                                width: '50%'
                            }}>
                                <View style={{
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>Weapon:</Text>
                                    <View>
                                        {[
                                            ...characterInventory
                                                .filter((item) => item.type === INVENTORY_ITEM_TYPE.WEAPON)
                                                .map((element) => ({
                                                    text: `${element.name} x ${element.value}`,
                                                    opacity: 1
                                                })),
                                            ...Array(3).fill({ text: "--Empty--", opacity: 0.5 }) // Добавляем "Empty" с полупрозрачностью
                                        ]
                                            .slice(0, 3) // Обрезаем до 3 элементов
                                            .map((item, index) => (
                                                <Text key={index} style={{ opacity: item.opacity }}>
                                                    {item.text}
                                                </Text>
                                            ))}
                                    </View>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>Armor:</Text>
                                    <View>
                                        {[
                                            ...characterInventory
                                                .filter((item) => item.type === INVENTORY_ITEM_TYPE.ARMOR)
                                                .map((element) => ({
                                                    text: `${element.name} x ${element.value}`,
                                                    opacity: 1
                                                })),
                                            ...Array(3).fill({ text: "--Empty--", opacity: 0.5 }) // Добавляем "Empty" с полупрозрачностью
                                        ]
                                            .slice(0, 3) // Обрезаем до 3 элементов
                                            .map((item, index) => (
                                                <Text key={index} style={{ opacity: item.opacity }}>
                                                    {item.text}
                                                </Text>
                                            ))}
                                    </View>

                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>Consumbles:</Text>
                                    <View>
                                        {[
                                            ...characterInventory
                                                .filter((item) => item.type === INVENTORY_ITEM_TYPE.CONSUMBLES)
                                                .map((element) => ({
                                                    text: `${element.name} x ${element.value}`,
                                                    opacity: 1
                                                })),
                                            ...Array(3).fill({ text: "--Empty--", opacity: 0.5 }) // Добавляем "Empty" с полупрозрачностью
                                        ]
                                            .slice(0, 3) // Обрезаем до 3 элементов
                                            .map((item, index) => (
                                                <Text key={index} style={{ opacity: item.opacity }}>
                                                    {item.text}
                                                </Text>
                                            ))}
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </ImageBackground>

        </ImageBackground>

    )
}
