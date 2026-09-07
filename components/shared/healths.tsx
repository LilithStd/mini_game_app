import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'

interface HealthsProps {
    values: {
        current: number;
        max: number;
    }
}

export default function Healths({ values }: HealthsProps) {
        const initialHP = values.max; // сохраняем начальное значение HP
        const hpValue = Math.max(0, values.current);
        const animatedHP = useRef(new Animated.Value(hpValue / initialHP)).current;
    
        // Анимируем при изменении HP
        useEffect(() => {
            Animated.timing(animatedHP, {
                toValue: hpValue / initialHP,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }, [hpValue]);
    
        const widthInterpolated = animatedHP.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
        });
    
        const colorInterpolated = animatedHP.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['#ff3333', '#ffcc00', '#4caf50'],
        });
    
    return    (
        <View>
         <View style={styles.hpWrapper}>
                            <Text style={styles.hpText}>
                                HP: {hpValue} / {initialHP}
                            </Text>
                            <View style={styles.hpBackground}>
                                <Animated.View
                                    style={[
                                        styles.hpBar,
                                        {
                                            width: widthInterpolated,
                                            backgroundColor: colorInterpolated,
                                        },
                                    ]}
                                />
                            </View>
                        </View>
        </View>
    )
}



const styles = StyleSheet.create({
    hpWrapper: {
        width: '90%',
    },
    hpText: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
    },
    hpBackground: {
        height: 20,
        backgroundColor: '#333',
        borderRadius: 8,
        overflow: 'hidden',
    },
    hpBar: {
        height: '100%',
        borderRadius: 8,
    },
});