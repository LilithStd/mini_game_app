import { CharacterInventoryType, INVENTORY_ITEM_ARMOR_SUBTYPE, INVENTORY_ITEM_TYPE, INVENTORY_ITEM_WEAPON_SUBTYPE, useCharacterStore } from "@/store/character_store";
import { useItemsStore } from "@/store/items_strore";
import { useLocationStore } from "@/store/location_store";
import { useState } from "react";
import { FlatList, Image, ImageBackground, Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

enum CURRENT_PAGE {
    CHARACTER_STATS = 'character stats',
    CHARACTER_INVENTORY = 'character inventory'
}
const DefaultModal = {
    name: 'default',
    arrayItems: [{ id: '', name: '', value: 0, type: '', subType: '' }]
}

type ModalProps = {
    name: string,
    arrayItems: CharacterInventoryType[]
}

export default function CharacterProfile() {
    const [modalVisible, setModalVisible] = useState(false)
    const [currentTypeModal, setCurrentTypeModal] = useState<ModalProps>(DefaultModal)
    const [currentList, setCurrentList] = useState(CURRENT_PAGE.CHARACTER_STATS)
    //character_store_methods
    const characterEquipUpdate = useCharacterStore(state => state.characterEquipUpdate)
    const characterEquipCurrent = useCharacterStore(state => state.characterEquip)
    const characterStats = useCharacterStore(state => state.characterStats)
    const characterInventory = useCharacterStore(state => state.characterInventory)
    //
    const location = useLocationStore(state => state.locationToBattleScreen)
    const buttonMask = require('../../assets/mask/mask_brush.png')

    const ArmorBodyModal = {
        name: INVENTORY_ITEM_ARMOR_SUBTYPE.BODY,
        arrayItems: characterInventory.filter((item) => item.subType === INVENTORY_ITEM_ARMOR_SUBTYPE.BODY)
    }

    const ArmorHelmetModal = {
        name: INVENTORY_ITEM_ARMOR_SUBTYPE.HELMET,
        arrayItems: characterInventory.filter((item) => item.subType === INVENTORY_ITEM_ARMOR_SUBTYPE.HELMET)
    }

    const ArmorBootsModal = {
        name: INVENTORY_ITEM_ARMOR_SUBTYPE.BOOTS,
        arrayItems: characterInventory.filter((item) => item.subType === INVENTORY_ITEM_ARMOR_SUBTYPE.BOOTS)
    }

    const WeaponModal = {
        name: INVENTORY_ITEM_TYPE.WEAPON,
        arrayItems: characterInventory.filter((item) => item.type === INVENTORY_ITEM_TYPE.WEAPON)
    }


    //modal_actions_functions
    const closeModal = () => {
        setModalVisible(false)
    }
    const openModal = (EquipType: ModalProps) => {
        setModalVisible(true)
        setCurrentTypeModal(EquipType)
    }
    //

    //handle_equip_functions
    const handleWeaponEquip = () => {
        if (!modalVisible) {
            openModal(WeaponModal)
        }

    }
    const handleArmorBodyEquip = () => {
        if (!modalVisible) {
            openModal(ArmorBodyModal)
        }
    }

    const handleArmorHelmetEquip = () => {
        if (!modalVisible) {
            openModal(ArmorHelmetModal)
        }
    }

    const handleArmorBootsEquip = () => {
        if (!modalVisible) {
            openModal(ArmorBootsModal)
        }
    }
    //

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
                    height: '100%',
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
                    opacity: currentList === CURRENT_PAGE.CHARACTER_INVENTORY ? 1 : 0
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>Equip</Text>
                    <View style={{
                        position: 'absolute',
                        left: '20%',
                        top: '-1100%'
                    }}>
                        <Text style={{
                            backgroundColor: 'yellow',
                            // width: '50%',
                            borderColor: 'red',
                            borderWidth: 2,
                            textAlign: 'center'
                        }}>Weapon</Text>
                        <TouchableOpacity
                            onPress={handleWeaponEquip}
                        >
                            <Text style={{
                                textAlign: 'center',
                                backgroundColor: 'grey'
                            }}> {characterEquipCurrent.weapon !== '' ? characterEquipCurrent.weapon : `--Empty--`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        position: 'absolute',
                        right: '40%',
                        bottom: '1760%'
                    }}>
                        <Text style={{
                            backgroundColor: 'yellow',
                            // width: '50%',
                            borderColor: 'red',
                            borderWidth: 2,
                            textAlign: 'center'
                        }}>Helmet</Text>
                        <TouchableOpacity
                            onPress={handleArmorHelmetEquip}
                        >
                            <Text style={{
                                textAlign: 'center',
                                backgroundColor: 'grey'
                            }}>{characterEquipCurrent.armor.helmet !== '' ? characterEquipCurrent.armor.helmet : `--Empty--`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        position: 'absolute',
                        right: '40%',
                        top: '-1360%'
                    }}>
                        <Text style={{
                            backgroundColor: 'yellow',
                            // width: '50%',
                            borderColor: 'red',
                            borderWidth: 2,
                            textAlign: 'center'
                        }}>Body</Text>
                        <TouchableOpacity
                            onPress={handleArmorBodyEquip}
                        >
                            <Text style={{
                                textAlign: 'center',
                                backgroundColor: 'grey'
                            }}>{characterEquipCurrent.armor.body !== '' ? characterEquipCurrent.armor.body : `--Empty--`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        position: 'absolute',
                        left: '40%',
                        top: '-490%'
                    }}>
                        <Text style={{
                            backgroundColor: 'yellow',
                            // width: '50%',
                            borderColor: 'red',
                            borderWidth: 2,
                            textAlign: 'center'
                        }}>Boots</Text>
                        <TouchableOpacity
                            onPress={handleArmorBootsEquip}
                        >
                            <Text style={{
                                textAlign: 'center',
                                backgroundColor: 'grey'
                            }}>{characterEquipCurrent.armor.boots !== '' ? characterEquipCurrent.armor.boots : `--Empty--`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    width: '100%',
                    height: '40%'
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
                        }}><Modal transparent={true} visible={modalVisible} animationType="fade">
                                <View style={styles.overlay}>
                                    <View style={styles.modalContainer}>
                                        <Text style={styles.title}>Choose Item</Text>

                                        <FlatList
                                            data={currentTypeModal.arrayItems}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) =>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        characterEquipUpdate(currentTypeModal.name, item.name)
                                                        closeModal()
                                                    }

                                                    }
                                                >
                                                    <Text style={styles.item}>{item.name}</Text>
                                                </TouchableOpacity>
                                            }
                                        />

                                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                            <Text style={styles.closeText}>Закрыть</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>

                            <View style={{ flexDirection: "row", width: "100%" }}>
                                {/* Левый столбец: Weapon + Armor */}
                                <View style={{ width: "50%" }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Weapon:</Text>
                                    <View>
                                        {[
                                            ...characterInventory
                                                .filter((item) => item.type === INVENTORY_ITEM_TYPE.WEAPON)
                                                .map((element) => ({
                                                    text: `${element.name} x ${element.value}`,
                                                    opacity: 1,
                                                })),
                                            ...Array(4).fill({ text: "--Empty--", opacity: 0.5 }) // Добавляем "Empty"
                                        ]
                                            .slice(0, 4)
                                            .map((item, index) => (
                                                <Text
                                                    key={index}
                                                    style={{
                                                        opacity: item.opacity,
                                                        backgroundColor: item.text.split(' x ')[0] === characterEquipCurrent.weapon ? 'red' : 'transparent'
                                                    }}
                                                >
                                                    {item.text}
                                                </Text>
                                            ))}
                                    </View>

                                    <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Armor:</Text>
                                    <View>
                                        {[
                                            ...characterInventory
                                                .filter((item) => item.type === INVENTORY_ITEM_TYPE.ARMOR)
                                                .map((element) => ({
                                                    text: `${element.name} x ${element.value}`,
                                                    opacity: 1
                                                })),
                                            ...Array(5).fill({ text: "--Empty--", opacity: 0.5 }) // Добавляем "Empty"
                                        ]
                                            .slice(0, 5)
                                            .map((item, index) => {
                                                const itemName = item.text.split(' x ')[0]; // Убираем количество
                                                const isEquipped = [
                                                    characterEquipCurrent.armor.body,
                                                    characterEquipCurrent.armor.helmet,
                                                    characterEquipCurrent.armor.boots
                                                ].includes(itemName); // Проверяем, есть ли предмет в экипировке

                                                return (
                                                    <Text
                                                        key={index}
                                                        style={{
                                                            opacity: item.opacity,
                                                            backgroundColor: isEquipped ? 'red' : 'transparent'
                                                        }}>
                                                        {item.text}
                                                    </Text>
                                                );
                                            })}
                                    </View>

                                </View>

                                {/* Правый столбец: Consumbles */}
                                <View style={{ width: "50%" }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Consumbles:</Text>
                                    <View>
                                        {[
                                            ...characterInventory
                                                .filter((item) => item.type === INVENTORY_ITEM_TYPE.CONSUMBLES)
                                                .map((element) => ({
                                                    text: `${element.name} x ${element.value}`,
                                                    opacity: 1
                                                })),
                                            ...Array(10).fill({ text: "--Empty--", opacity: 0.5 }) // Добавляем "Empty"
                                        ]
                                            .slice(0, 10)
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
            </ImageBackground >

        </ImageBackground >

    )
}
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    item: {
        fontSize: 16,
        paddingVertical: 5,
        borderColor: 'red',
        borderWidth: 2
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "blue",
        borderRadius: 5,
    },
    closeText: {
        color: "white",
        fontSize: 16,
    },
});