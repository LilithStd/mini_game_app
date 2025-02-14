import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
    return (
        <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ title: "Home" }} />
                <Stack.Screen name="battle_screen" options={{ title: "Battle" }} />
                <Stack.Screen name="story_screen" options={{ title: "Story" }} />
            </Stack>
        </SafeAreaProvider>
    );
}