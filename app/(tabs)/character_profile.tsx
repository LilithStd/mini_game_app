import { CharacterInventoryType, INVENTORY_ITEM_ARMOR_SUBTYPE, INVENTORY_ITEM_CONSUMBLES_TYPE, INVENTORY_ITEM_TYPE, INVENTORY_ITEM_WEAPON_SUBTYPE, UpdateItemStats, useCharacterStore } from "@/store/character_store";
import { REWARD_VARIANT, useItemsStore } from "@/store/items_strore";
import { useLocationStore } from "@/store/location_store";
import { useState } from "react";
import { FlatList, Image, ImageBackground, Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

enum CURRENT_PAGE {
    CHARACTER_STATS = 'character stats',
    CHARACTER_INVENTORY = 'character inventory'
}
const DefaultModal = {
    name: 'default',
    arrayItems: [{ id: '', name: '', count: 0, stats: {} }]
}

type ArrayItemsProps = {
    id: string,
    name: string,
    stats: UpdateItemStats
}

type ModalProps = {
    name: string,
    arrayItems: ArrayItemsProps[]
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
    //items__store_methods
    const getReward = useItemsStore(state => state.getReward)
    const weaponItems = useItemsStore(state => state.weapons)
    const armorsItems = useItemsStore(state => state.armors)
    const consumblesItems = useItemsStore(state => state.consumbles)
    //
    const location = useLocationStore(state => state.locationToBattleScreen)
    const buttonMask = require('../../assets/mask/mask_brush.png')

    const fullDescriptionWeapons = weaponItems
        .filter((weapon) =>
            characterInventory.some((item) => item.name === weapon.name && item.id === weapon.id)
        )
        .map((weapon) => ({
            ...weapon,
            count: characterInventory.find((item) => item.name === weapon.name && item.id === weapon.id)?.count ?? 1,
        }));


    const fullDescriptionArmors = armorsItems.filter((armor) =>
        characterInventory.some((item) => item.name === armor.name && item.id === armor.id)
    )
        .map((armor) => ({
            ...armor,
            count: characterInventory.find((item) => item.name === armor.name && item.id === armor.id)?.count ?? 1,
        }));
    const fullDescriptionConsumbles = consumblesItems.filter((consumbles) =>
        characterInventory.some((item) => item.name === consumbles.name && item.id === consumbles.id)
    )
        .map((consumbles) => ({
            ...consumbles,
            count: characterInventory.find((item) => item.name === consumbles.name && item.id === consumbles.id)?.count ?? 1,
        }));





    const WeaponModal = {
        name: INVENTORY_ITEM_TYPE.WEAPON,
        arrayItems: fullDescriptionWeapons.filter((item) => item.type === INVENTORY_ITEM_TYPE.WEAPON)
    };

    const ArmorBodyModal = {
        name: INVENTORY_ITEM_ARMOR_SUBTYPE.BODY,
        arrayItems: fullDescriptionArmors.filter((item) => item.subType === INVENTORY_ITEM_ARMOR_SUBTYPE.BODY)
    };

    const ArmorHelmetModal = {
        name: INVENTORY_ITEM_ARMOR_SUBTYPE.HELMET,
        arrayItems: fullDescriptionArmors.filter((item) => item.subType === INVENTORY_ITEM_ARMOR_SUBTYPE.HELMET)
    };

    const ArmorBootsModal = {
        name: INVENTORY_ITEM_ARMOR_SUBTYPE.BOOTS,
        arrayItems: fullDescriptionArmors.filter((item) => item.subType === INVENTORY_ITEM_ARMOR_SUBTYPE.BOOTS)
    };

    //modal_actions_functions
    const closeModal = () => {
        setModalVisible(false)
    }
    const openModal = (EquipType: ModalProps) => {
        setModalVisible(true)
        setCurrentTypeModal(EquipType)
    }
    //

    const handleWeaponEquip = () => {
        if (!modalVisible) {
            openModal({
                name: INVENTORY_ITEM_TYPE.WEAPON,
                arrayItems: fullDescriptionWeapons.filter((item) => item.type === INVENTORY_ITEM_TYPE.WEAPON)
            });
        }
    };

    const handleArmorBodyEquip = () => {
        if (!modalVisible) {
            openModal({
                name: INVENTORY_ITEM_ARMOR_SUBTYPE.BODY,
                arrayItems: fullDescriptionArmors.filter((item) => item.subType === INVENTORY_ITEM_ARMOR_SUBTYPE.BODY)
            });
        }
    };

    const handleArmorHelmetEquip = () => {
        if (!modalVisible) {
            openModal({
                name: INVENTORY_ITEM_ARMOR_SUBTYPE.HELMET,
                arrayItems: fullDescriptionArmors.filter((item) => item.subType === INVENTORY_ITEM_ARMOR_SUBTYPE.HELMET)
            });
        }
    };

    const handleArmorBootsEquip = () => {
        if (!modalVisible) {
            openModal({
                name: INVENTORY_ITEM_ARMOR_SUBTYPE.BOOTS,
                arrayItems: fullDescriptionArmors.filter((item) => item.subType === INVENTORY_ITEM_ARMOR_SUBTYPE.BOOTS)
            });
        }
    };


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
                            }}> {characterEquipCurrent.weapon.name !== '' ? characterEquipCurrent.weapon.name : `--Empty--`}</Text>
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
                            }}>{characterEquipCurrent.armor.helmet.name !== '' ? characterEquipCurrent.armor.helmet.name : `--Empty--`}</Text>
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
                            }}>{characterEquipCurrent.armor.body.name !== '' ? characterEquipCurrent.armor.body.name : `--Empty--`}</Text>
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
                            }}>{characterEquipCurrent.armor.boots.name !== '' ? characterEquipCurrent.armor.boots.name : `--Empty--`}</Text>
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
                            <Text>Evasion:{characterStats.evasion}</Text>
                            <Text>Critical Rate:{characterStats.criticalRate}</Text>
                            <Text>Items SKill:{characterStats.itemsSkills.map((item) => <Text key={item}>
                                {item}
                            </Text>)}</Text>
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
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        characterEquipUpdate(currentTypeModal.name, {
                                                            id: item.id,
                                                            name: item.name,
                                                            stats: item.stats // Теперь передается полный объект!
                                                        });
                                                        closeModal();
                                                    }}
                                                >
                                                    <Text style={styles.item}>{item.name}</Text>
                                                </TouchableOpacity>
                                            )}
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
                                            ...fullDescriptionWeapons
                                                .filter((item) => item.type === INVENTORY_ITEM_TYPE.WEAPON)
                                                .map((element) => ({
                                                    text: `${element.name} x ${element.count}`,
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
                                                        backgroundColor: item.text.split(' x ')[0] === characterEquipCurrent.weapon.name ? 'red' : 'transparent'
                                                    }}
                                                >
                                                    {item.text}
                                                </Text>
                                            ))}
                                    </View>

                                    <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Armor:</Text>
                                    <View>
                                        {[
                                            ...fullDescriptionArmors
                                                .filter((item) => item.type === INVENTORY_ITEM_TYPE.ARMOR)
                                                .map((element) => ({
                                                    text: `${element.name} x ${element.count}`,
                                                    opacity: 1
                                                })),
                                            ...Array(5).fill({ text: "--Empty--", opacity: 0.5 }) // Добавляем "Empty"
                                        ]
                                            .slice(0, 5)
                                            .map((item, index) => {
                                                const itemName = item.text.split(' x ')[0]; // Убираем количество
                                                const isEquipped = [
                                                    characterEquipCurrent.armor.body.name,
                                                    characterEquipCurrent.armor.helmet.name,
                                                    characterEquipCurrent.armor.boots.name
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
                                            ...fullDescriptionConsumbles
                                                .filter((item) => item.type === INVENTORY_ITEM_CONSUMBLES_TYPE.POTION || INVENTORY_ITEM_CONSUMBLES_TYPE.CRYSTAL || INVENTORY_ITEM_CONSUMBLES_TYPE.CURRENCY || INVENTORY_ITEM_CONSUMBLES_TYPE.KEY)
                                                .map((element) => ({
                                                    text: `${element.name} x ${element.count}`,
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