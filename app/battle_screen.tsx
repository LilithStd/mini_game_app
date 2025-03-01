import { Animated, Button, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Character from "../components/player/character";
import { useLocalSearchParams } from 'expo-router';
import Enemy from "@/components/enemy/enemy";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { battleScreenStyles } from '../styles/battle_screen_styles'
import { BlurView } from 'expo-blur';
import { useLocationStore } from "@/store/location_store";
import { MotiView } from "moti";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { UPDATE_CHARACTER_STATS, useBattleStore } from "@/store/battle_store";

export default function Battle_Screen() {
    const { status } = useLocalSearchParams();
    const locationToBattle = useLocationStore(state => state.locationToBattleScreen)
    const updateCharacter = useBattleStore(state => state.updateCharacterStats)
    const FOCUS_ELEMENT = {
        CHARACTER: 'character',
        ENEMY: 'enemy',
        NOTHING: 'nothing'
    }
    const [currentElementOnFocus, setCurrentElementOnFocus] = useState(FOCUS_ELEMENT.CHARACTER)
    const [scale, setScale] = useState(0.7);
    const [elementHide, setElementHide] = useState(FOCUS_ELEMENT.ENEMY)
    const moveCharacterScaleElement = useSharedValue(0.7)
    const moveCharacterPositionElement = useSharedValue(0)


    const default_stats = {
        level: 1,
        attack: 10,
        defense: 5,
        healPoints: 30
    }


    const handleAttackButton = () => {
        setCurrentElementOnFocus(FOCUS_ELEMENT.ENEMY);
        setElementHide(FOCUS_ELEMENT.CHARACTER);
        setScale(0.7)
    };
    const handleDefenseButton = () => {

    }
    const handleStandButton = () => {

    }
    const handleRetreatButton = () => {

    }
    const enemyTempButton = () => {
        setCurrentElementOnFocus(FOCUS_ELEMENT.CHARACTER);
        setElementHide(FOCUS_ELEMENT.ENEMY);
        setScale(1)
    };

    useEffect(() => {
        updateCharacter(UPDATE_CHARACTER_STATS.ALL, default_stats)
    }, [])

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
            <ImageBackground
                source={locationToBattle.model}
                resizeMode='cover'
                style={{
                    flex: 1,
                    width: '100%',  // Убедимся, что фон занимает всю ширину
                    height: '100%', // Убедимся, что фон занимает всю высоту
                    position: 'absolute', // Фиксируем фон на заднем плане
                }}
            >

                <MotiView
                    animate={{
                        scale: scale, // Используем shared value для анимации
                    }}
                    transition={{
                        type: 'spring', // Тип анимации
                        damping: 10,     // Затухание
                        stiffness: 100,  // Жесткость
                    }}
                    style={{
                        position: 'absolute',
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        left: '20%',
                        zIndex: currentElementOnFocus === FOCUS_ELEMENT.CHARACTER ? 3 : 1,
                    }}
                >

                    <View
                        style={{
                            position: 'absolute',
                            gap: 10,
                            width: '30%',
                            top: '40%',

                            zIndex: 1
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
                        top: '10%',
                        left: '-40%'
                    }}>

                        <Character />
                    </View>

                </MotiView>
                <Animated.View style={{
                    position: 'absolute',
                    zIndex: currentElementOnFocus === FOCUS_ELEMENT.ENEMY ? 3 : 1,
                    width: '100%',
                    left: '-10%'
                    // right: enemyPostion
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'green',
                            top: '50%',
                            left: '40%',
                            width: '30%',
                            alignItems: 'center',
                            zIndex: 1
                        }}
                        onPress={enemyTempButton}
                    >
                        <Text>return</Text>
                    </TouchableOpacity>
                    <Enemy />
                </Animated.View>
            </ImageBackground>
        </SafeAreaView>
    )
}
