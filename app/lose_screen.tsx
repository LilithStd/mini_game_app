import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { useGlobalStore } from "@/store/global_store";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function LoseScreen() {
    const router = useRouter();
    const resetGlobalState = useGlobalStore(state => state.setNewGame)
    const handleExitToMainScreen = () => {
        resetGlobalState()
        router.push({
            pathname: GLOBAL_APP_PATH.MAIN
        })
    }
    return (
        <View>
            <Text>You lose</Text>
            <Button title='exit' onPress={handleExitToMainScreen} />
        </View>
    )
}
