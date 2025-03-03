import { Animated, Button, ImageBackground, Pressable, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Character from "../components/player/character";
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import Enemy from "@/components/enemy/enemy";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { battleScreenStyles } from '../styles/battle_screen_styles'
import { BlurView } from 'expo-blur';
import { useLocationStore } from "@/store/location_store";
import { MotiView } from "moti";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { UPDATE_STATS, useBattleStore } from "@/store/battle_store";
import { GLOBAL_APP_PATH } from "@/constants/global_path";

export default function Battle_Screen() {
    const { status } = useLocalSearchParams();
    const router = useRouter();
    const locationToBattle = useLocationStore(state => state.locationToBattleScreen)
    const location = useLocationStore(state => state.currentLocation)
    const updateCharacter = useBattleStore(state => state.updateCharacterStats)
    const updateEnemy = useBattleStore(state => state.updateEnemyStats)
    const characterStats = useBattleStore(state => state.character)
    const enemyStats = useBattleStore(state => state.enemy)

    const FOCUS_ELEMENT = {
        CHARACTER: 'character',
        ENEMY: 'enemy',
        NOTHING: 'nothing'
    }
    const [currentElementOnFocus, setCurrentElementOnFocus] = useState(FOCUS_ELEMENT.CHARACTER)
    // animations state blocks
    const [scaleCharacter, setScaleCharacter] = useState(1);
    const [scaleEnemy, setScaleEnemy] = useState(0.7);
    const [isPressed, setIsPressed] = useState(false);
    // 
    const [elementHide, setElementHide] = useState(FOCUS_ELEMENT.ENEMY)

    const default_stats_character = {
        level: 1,
        attack: 10,
        defense: 5,
        healPoints: 30,
        death: false
    }
    const default_stats_enemy = {
        level: 1,
        attack: 10,
        defense: 5,
        healPoints: 30,
        death: false
    }


    const handleAttackButton = () => {
        setCurrentElementOnFocus(FOCUS_ELEMENT.ENEMY);
        setElementHide(FOCUS_ELEMENT.CHARACTER);
        setScaleCharacter(0.7)
        setScaleEnemy(1)
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

        setScaleCharacter(1)
        setScaleEnemy(0.7)
        updateEnemy(UPDATE_STATS.HP, characterStats.attack)
    };


    useEffect(() => {
        updateCharacter(UPDATE_STATS.ALL, default_stats_character)
        updateEnemy(UPDATE_STATS.ALL, default_stats_enemy)
    }, [])

    useEffect(() => {
        if (enemyStats.death) {
            router.push({
                pathname: GLOBAL_APP_PATH.VICTORY_SCREEN,
                params: { location }
            });
            updateEnemy(UPDATE_STATS.ALL, default_stats_enemy)
        }
    }, [enemyStats.death])

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
                        scale: scaleCharacter, // Используем shared value для анимации
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
                <MotiView
                    animate={{
                        scale: scaleEnemy, // Используем shared value для анимации
                        backgroundColor: isPressed ? 'white' : ''
                    }}
                    transition={{
                        type: 'spring', // Тип анимации
                        damping: 10,     // Затухание
                        stiffness: 100,  // Жесткость
                    }}

                    style={{
                        position: 'absolute',
                        zIndex: currentElementOnFocus === FOCUS_ELEMENT.ENEMY ? 3 : 1,
                        width: '100%',
                        left: '-10%'
                        // right: enemyPostion
                    }}>
                    <Pressable
                        style={{

                        }}
                        onPress={enemyTempButton}
                    >
                        <Enemy />
                    </Pressable>

                </MotiView>
            </ImageBackground>
        </SafeAreaView>
    )
}
