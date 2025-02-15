import { Character_Default, Character_Pull_Type, Character_Type, UPDATE_CHARACTER_STATS, useCharacterStore } from "@/store/character_store";
import { useGlobalStore } from "@/store/global_store";
import { Button, Image, Text, View } from "react-native";

export default function Character() {
    const setContinueGame = useGlobalStore(state => state.setContinueGame)
    const character_model = useCharacterStore(state => state.character_model)
    const default_state = useCharacterStore(state => state.default_state)
    const choose_character = useCharacterStore(state => state.update_character)
    const characters_pull_for_choose = useCharacterStore(state => state.choose_character_pull)
    const handleCharacterChoose = (item: Character_Pull_Type) => {
        setContinueGame()
        choose_character(UPDATE_CHARACTER_STATS.ALL, item)
    }
    // const choose_player_character_in_pull = () => {

    // }

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
                {default_state ? characters_pull_for_choose().map((item, index) => (
                    <View
                        key={index}
                        style={{

                        }}>
                        <Image source={item.model}
                            style={{
                                width: 160,
                                height: 130,
                                resizeMode: 'contain',
                                margin: 5,
                            }}
                        />
                        <Button
                            title='choose'
                            onPress={() => handleCharacterChoose(item)}
                        />
                    </View>

                )) :
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
                }
            </View>
        </View>
    )
}
