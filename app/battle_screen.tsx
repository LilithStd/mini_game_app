import { SafeAreaView, Text, View } from "react-native";
import Character from "../components/player/character";
import { useLocalSearchParams } from 'expo-router';
import Enemy from "@/components/enemy/enemy";

export default function Battle_Screen() {
    const { status } = useLocalSearchParams();
    console.log(status);

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
            <Character />
            <Enemy />
        </SafeAreaView>
    )
}
