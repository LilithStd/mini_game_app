import { Button, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Character from "../components/player/character";
import { useLocalSearchParams } from 'expo-router';
import Enemy from "@/components/enemy/enemy";
import React, { useState } from "react";
import { battleScreenStyles } from '../styles/battle_screen_styles'
import BlurView from 'expo-blur';

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
                    width: '100%',
                    left: '-30%',
                    top: '10%',
                }}>
                    {/* <BlurView intensity={6} >
                        <Character />
                    </BlurView> */}
                </View>
            </View>
            <View style={{
                zIndex: currentElementOnFocus === FOCUS_ELEMENT.ENEMY ? 3 : 1,

                width: '100%'
            }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'green',
                        // position: 'absolute',
                        top: '50%',
                        left: '40%',
                        width: '30%',
                        alignItems: 'center',
                        zIndex: 2
                    }}
                    onPress={enemyTempButton}
                >
                    <Text>return</Text>
                </TouchableOpacity>
                <Enemy />
            </View>
        </SafeAreaView>
    )
}
