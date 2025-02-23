import { Button, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Character from "../components/player/character";
import { useLocalSearchParams } from 'expo-router';
import Enemy from "@/components/enemy/enemy";
import { useState } from "react";
import { battleScreenStyles } from '../styles/battle_screen_styles'

export default function Battle_Screen() {
    const { status } = useLocalSearchParams();
    const FOCUS_ELEMENT = {
        CHARACTER: 'character',
        ENEMY: 'enemy',
        NOTHING: 'nothing'
    }
    const [currentElementOnFocus, setCurrentElementOnFocus] = useState(FOCUS_ELEMENT.NOTHING)
    const handleAttackButton = () => {
        setCurrentElementOnFocus(FOCUS_ELEMENT.ENEMY)
    }
    const handleDefenseButton = () => {

    }
    const handleStandButton = () => {

    }
    const handleRetreatButton = () => {

    }
    const enemyTempButton = () => {
        setCurrentElementOnFocus(FOCUS_ELEMENT.CHARACTER)
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center', // Центрирует по горизонтали
                width: '100%',
                height: '100%',
                position: 'relative'
            }}
        >
            <View style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 2,

                left: 30
            }}><View
                style={{
                    position: 'absolute',
                    gap: 10,
                    width: '30%',
                    top: '40%',
                    zIndex: currentElementOnFocus === FOCUS_ELEMENT.CHARACTER ? 3 : 1
                }}
            >
                    <Button
                        title="attack"
                        onPress={handleAttackButton}
                    />
                    <Button
                        title="defence"
                        onPress={handleDefenseButton}
                    />
                    <Button
                        title="stand"
                        onPress={handleStandButton}
                    />
                    <Button
                        title="retreat"
                        onPress={handleRetreatButton}
                    />
                </View>
                <View style={{
                    left: '-30%'
                }}>
                    <Character />
                </View>
            </View>
            <View style={{
                zIndex: currentElementOnFocus === FOCUS_ELEMENT.ENEMY ? 3 : 1
            }}>
                <Button
                    title="return to character"
                    onPress={enemyTempButton}
                />
                <Enemy />
            </View>
        </SafeAreaView>
    )
}
