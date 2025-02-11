import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";


export default function Story_Screen() {
    const { text } = useLocalSearchParams();
    console.log(text)
    return (
        <View>
            <Text>story_Screen</Text>

        </View>

    )
}
