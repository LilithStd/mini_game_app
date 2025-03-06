import 'react-native-reanimated';
import { Stack, Tabs } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from '@react-navigation/stack';

export default function Layout() {

    return (
        <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ title: "Home" }} />
                <Stack.Screen name="battle_screen" options={{ title: "Battle" }} />
                <Stack.Screen name="story_screen" options={{ title: "Story" }} />
                {/* <Stack.Screen name="location_screen" options={{ title: "Location" }} /> */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="location_choose_screen" options={{ title: "ChooseLocation" }} />
                <Stack.Screen name="choose_character_screen" options={{ title: "ChooseCharacter" }} />
                <Stack.Screen name="victory_screen" options={{ title: "Victory" }} />
            </Stack>

        </SafeAreaProvider>
    );
}