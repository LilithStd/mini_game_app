import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { Character_Default, Character_Pull_Type, Character_Type, UPDATE_CHARACTER_STATS, useCharacterStore } from "@/store/character_store";
import { useGlobalStore } from "@/store/global_store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, Image, Text, View } from "react-native";

export default function Character() {
    const router = useRouter();
    const character_model = useCharacterStore(state => state.character_model)
    const default_state = useCharacterStore(state => state.default_state)

    // useEffect(() => {
    //     if (!default_state) {
    //         router.push(GLOBAL_APP_PATH.LOCATION_SCREEN)
    //     }
    // }, [default_state])

    if (!default_state) {
        return null; // Ничего не рендерим, пока идет редирект
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center', // Прижимает элементы к нижней части экрана
            alignItems: 'center', // Центрирует по горизонтали
            width: '100%',
            height: '100%'
        }}>
            <View style={{
                flex: 1,
                justifyContent: 'center', // Центрирует по вертикали
                alignItems: 'center', // Центрирует по горизонтали
                flexDirection: 'row', // Располагает изображения в ряд
                flexWrap: 'wrap', // Переносит элементы, если их слишком много
                gap: 10, // Расстояние между элементами
                // backgroundColor: 'red', // Временно, чтобы проверить, занимает ли View всю высоту
                height: '100%'
            }}>
                <View style={{
                    flex: 1,

                    justifyContent: 'center',  // вертикальное выравнивание по центру
                    alignItems: 'flex-start',  // горизонтальное выравнивание по центру
                    // position: 'relative',

                }}>
                    <Image
                        style={{
                            width: '80%',
                            height: '80%',
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            marginTop: '50%',
                            marginLeft: '-50%'
                        }}
                        source={character_model}
                    />
                </View>
            </View>
        </View>
    )
}
