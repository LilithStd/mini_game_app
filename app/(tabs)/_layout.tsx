import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="location_screen" options={{ title: "Location" }} />
            <Tabs.Screen name="character_profile" options={{ title: "Character Profile" }} />
        </Tabs>
    );
}