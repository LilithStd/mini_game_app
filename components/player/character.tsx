import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { Character_Default, Character_Type, UPDATE_CHARACTER_STATS, useCharacterStore } from "@/store/character_store";
import { useGlobalStore } from "@/store/global_store";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Button, Image, Text, View } from "react-native";

export default function Character() {
    const router = useRouter();
    const characterStats = useCharacterStore(state => state.characterStats)
    const default_state = useCharacterStore(state => state.default_state)

    // const enemyStats = useBattleStore(state => state.enemy)

    const initialHP = useRef<number>(characterStats.healPoints ?? 1);
    const hpPercentage = (characterStats.healPoints / initialHP.current) * 100;

    return (
        <View style={{
            width: '100%',
            height: '70%',
            bottom: -100,
            zIndex: 2

        }}>
            <Text>Character component</Text>
            <View
                style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    width: '100%',
                    top: -120
                }}
            >
                <Text>{characterStats.name}</Text>
                <Text>Level:{characterStats.level}</Text>

                <View style={{
                    borderWidth: 1,
                    alignSelf: 'flex-start',
                    width: '100%',
                }}>
                    <Text style={{
                        textAlign: 'center',
                        width: '100%',
                        position: 'absolute',
                        zIndex: 1

                    }}>HP:{characterStats.healPoints}</Text>
                    <View style={{
                        backgroundColor: 'red',
                        width: `${hpPercentage}%`,
                        alignSelf: 'flex-start',
                        height: 20
                    }}>
                    </View>
                </View>

            </View>
            <Image
                style={{
                    position: 'absolute',
                    width: '100%', // Растянет изображение на всю ширину контейнера
                    height: '100%', // Аналогично с высотой
                    top: 0, // Чтобы не было смещения
                    left: 0, // Чтобы не было смещения
                }}
                source={characterStats.model}
            />
        </View>
    )
}
