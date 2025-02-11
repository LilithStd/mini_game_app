import { useCharacterStore } from "@/store/character_store";
import { Image, Text, View } from "react-native";

export default function Character() {
    const character_models = useCharacterStore(state => state.character_model)
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{
                textAlign: 'center'
            }}>Character Component</Text>
            <Image
                style={{
                    width: 200,
                    height: 400,
                    alignItems: 'center',

                }}
                source={character_models}
            />

        </View>

    )
}
