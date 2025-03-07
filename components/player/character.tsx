import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { Character_Default, Character_Type, UPDATE_CHARACTER_STATS, useCharacterStore } from "@/store/character_store";
import { useGlobalStore } from "@/store/global_store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, Image, Text, View } from "react-native";

export default function Character() {
    const router = useRouter();
    const characterStats = useCharacterStore(state => state.characterStats)
    const default_state = useCharacterStore(state => state.default_state)

    return (
        <View style={{
            width: '100%',
            height: '100%',

        }}><Text>Character component</Text>
            <Image
                style={{

                }}
                source={characterStats.model}
            />
        </View>
    )
}
