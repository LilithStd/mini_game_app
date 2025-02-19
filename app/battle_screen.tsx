import { SafeAreaView, Text, View } from "react-native";
import Character from "../components/player/character";
import { useLocalSearchParams } from 'expo-router';
import Enemy from "@/components/enemy/enemy";

export default function Battle_Screen() {
    const { status } = useLocalSearchParams();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center', // Центрирует по горизонтали
                width: '100%',
                height: '100%'
            }}
        >
            {/* <Text>Battle Screen</Text> */}
            <Character />
            <Enemy />
        </SafeAreaView>
    )
}
