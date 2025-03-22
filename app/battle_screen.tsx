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
import { UPDATE_CHARACTER_STATS, useCharacterStore } from "@/store/character_store";
import { getRandomNumber } from "@/constants/helpers";
import { REWARD_VARIANT } from "@/store/items_strore";

export default function Battle_Screen() {
    const { status } = useLocalSearchParams();
    const router = useRouter();
    const locationToBattle = useLocationStore(state => state.locationToBattleScreen)
    const location = useLocationStore(state => state.currentLocation)
    const updateCharacter = useBattleStore(state => state.updateCharacterStats)
    const updateEnemy = useBattleStore(state => state.updateEnemyStats)
    const characterBattleStats = useBattleStore(state => state.character)
    const characterUpdateStats = useCharacterStore(state => state.updateCharacterStats)
    const characterStats = useCharacterStore(state => state.characterStats)
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
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 3000); // 3 секунды, можно менять

        return () => clearTimeout(timer); // Очистка таймера при размонтировании
    }, []);

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
        const retreat = 'retreat'
        router.push({
            pathname: GLOBAL_APP_PATH.VICTORY_SCREEN,
            params: { location, retreat }
        });
    }
    const enemyTempButton = () => {
        setCurrentElementOnFocus(FOCUS_ELEMENT.CHARACTER);
        setElementHide(FOCUS_ELEMENT.ENEMY);
        setScaleCharacter(1)
        setScaleEnemy(0.7)
        updateEnemy(UPDATE_STATS.HP, characterBattleStats.attack)
    };


    useEffect(() => {
        updateCharacter(UPDATE_STATS.ALL, characterStats ? characterStats : default_stats_character)
        updateEnemy(UPDATE_STATS.ALL, default_stats_enemy)
    }, [])

    useEffect(() => {
        const targetToReward = REWARD_VARIANT.MONSTER
        if (enemyStats.death) {
            const expirience = getRandomNumber(100, 300)
            characterUpdateStats(UPDATE_CHARACTER_STATS.EXPIRIENCE, expirience)
            router.push({
                pathname: GLOBAL_APP_PATH.VICTORY_SCREEN,
                params: { location, expirience, targetToReward }
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
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        position: 'relative',
                        zIndex: 4,
                    }}>
                        {visible && (
                            <MotiView
                                from={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", duration: 500 }}
                            >
                                <Text style={{
                                    position: 'absolute',
                                    top: 200,
                                    fontSize: 20,
                                    backgroundColor: "black",
                                    color: "white",
                                    padding: 10,
                                    borderRadius: 10
                                }}>
                                    {characterBattleStats.attack}
                                </Text>
                            </MotiView>
                        )}
                    </View>
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
