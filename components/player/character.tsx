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

    return (
        <View style={{
            width: '100%',
            height: '100%',
            // position: 'relative'
        }}><Text>Character component</Text>
            <Image
                style={{
                    // flex: 1,
                    // position: 'absolute',
                    // resizeMode: 'contain',
                    // alignSelf: 'center',
                    // height: '100%',
                    // width: '10%',
                    // top: '-50%',
                    // left: '-20%',
                    // zIndex: 1
                }}
                source={character_model}
            />
        </View>
    )
}
