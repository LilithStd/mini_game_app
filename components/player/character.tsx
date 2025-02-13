import { useCharacterStore } from "@/store/character_store";
import { Image, Text, View } from "react-native";

export default function Character() {
    const character_models = useCharacterStore(state => state.character_model)
    const default_state = useCharacterStore(state => state.default_state)
    const characters_pull_for_choose = useCharacterStore(state => state.choose_character)
    // const choose_player_character_in_pull = () => {

    // }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{
                textAlign: 'center'
            }}>Character Component</Text>
            {default_state ?
                characters_pull_for_choose().flatMap((item) => <Image source={item.model} />)

                :
                <Image
                    style={{
                        width: 200,
                        height: 400,
                        alignItems: 'center',

                    }}
                    source={require('')}
                />}


        </View>

    )
}
