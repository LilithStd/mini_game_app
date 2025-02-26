import { Animated, Button, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Character from "../components/player/character";
import { useLocalSearchParams } from 'expo-router';
import Enemy from "@/components/enemy/enemy";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { battleScreenStyles } from '../styles/battle_screen_styles'
import { BlurView } from 'expo-blur';
import { useLocationStore } from "@/store/location_store";

export default function Battle_Screen() {
    const { status } = useLocalSearchParams();
    const locationToBattle = useLocationStore(state => state.locationToBattleScreen)
    const FOCUS_ELEMENT = {
        CHARACTER: 'character',
        ENEMY: 'enemy',
        NOTHING: 'nothing'
    }
    const [currentElementOnFocus, setCurrentElementOnFocus] = useState(FOCUS_ELEMENT.CHARACTER)
    const [elementHide, setElementHide] = useState(FOCUS_ELEMENT.ENEMY)
    const characterPosition = useRef(new Animated.Value(0)).current;
    const enemyPostion = useRef(new Animated.Value(0)).current;


    const moveCharacter = useCallback((element: string) => {
        Animated.timing(characterPosition, {
            toValue: element === FOCUS_ELEMENT.CHARACTER ? 160 : -10,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, []);

    const moveEnemy = useCallback((element: string) => {
        Animated.timing(enemyPostion, {
            toValue: element === FOCUS_ELEMENT.CHARACTER ? 80 : -10,
            duration: 500,
            useNativeDriver: false,
        }).start();

    }, []);

    const scaleEnemy = useRef(new Animated.Value(1)).current;
    const scaleCharacter = useRef(new Animated.Value(1)).current;


    const scaleUp = (scaleValue: Animated.Value) => {
        Animated.timing(scaleValue, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const scaleDown = (scaleValue: Animated.Value) => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };


    const handleAttackButton = () => {
        setCurrentElementOnFocus(FOCUS_ELEMENT.ENEMY);
        setElementHide(FOCUS_ELEMENT.CHARACTER);

        scaleUp(scaleEnemy);   // Увеличиваем ENEMY (прямое указание)
        scaleDown(scaleCharacter); // Уменьшаем CHARACTER (прямое указание)

        moveCharacter(FOCUS_ELEMENT.CHARACTER);
        moveEnemy(FOCUS_ELEMENT.ENEMY);
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

        scaleUp(scaleCharacter);
        scaleDown(scaleEnemy);

        moveCharacter(FOCUS_ELEMENT.ENEMY);
        moveEnemy(FOCUS_ELEMENT.CHARACTER);
    };

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

                <Animated.View
                    style={{
                        position: 'absolute',
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        left: '20%',
                        zIndex: currentElementOnFocus === FOCUS_ELEMENT.CHARACTER ? 3 : 1,
                        transform: [{ scale: scaleCharacter }]
                        // left: characterPosition
                    }}>

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

                </Animated.View>
                <Animated.View style={{
                    position: 'absolute',
                    zIndex: currentElementOnFocus === FOCUS_ELEMENT.ENEMY ? 3 : 1,
                    width: '100%',
                    transform: [{ scale: scaleEnemy }],
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
