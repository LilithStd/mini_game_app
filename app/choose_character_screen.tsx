import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { useCharacterStore, Character_Pull_Type, UPDATE_CHARACTER_STATS } from "@/store/character_store"
import { useGlobalStore } from "@/store/global_store"
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View, Image, ImageBackground } from "react-native"

export default function ChooseCharacterScreen() {
    const router = useRouter();
    const [isChoosing, setIsChoosing] = useState(false);
    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const characters_pull_for_choose = useCharacterStore(state => state.choose_character_pull)
    const choose_character = useCharacterStore(state => state.update_character)
    const setContinueGame = useGlobalStore(state => state.setContinueGame)


    useEffect(() => {
        setCurrentState(GLOBAL_APP_PATH.CHARACTER_CHOOSE_SCREEN)
    }, [])

    const handleCharacterChoose = (item: Character_Pull_Type) => {
        setIsChoosing(true);
        setContinueGame()
        choose_character(UPDATE_CHARACTER_STATS.ALL, item)
        router.push(GLOBAL_APP_PATH.LOCATION_CHOOSE_SCREEN)
    }
    if (isChoosing) {
        return null; // Пока происходит переход, ничего не рендерим
    }

    return (
        <ImageBackground
            style={{
                flex: 1,
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: 'center'
            }}
            resizeMode='cover'
            source={require('../assets/backgrounds/bg_1.jpg')}
        >


            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 10,
                    height: '100%',
                }}>
                    {characters_pull_for_choose().map((item, index) => (
                        <View key={index} style={{ alignItems: 'center' }}>
                            <Image
                                source={item.model}
                                style={{
                                    width: 160,
                                    height: 130,
                                    resizeMode: 'contain',
                                    margin: 5,
                                }}
                            />
                            <Button
                                title="Choose"
                                onPress={() => handleCharacterChoose(item)}
                                disabled={isChoosing} // Блокируем кнопку при выборе
                            />
                        </View>
                    ))}
                </View>
            </View>
        </ImageBackground>
    );
}