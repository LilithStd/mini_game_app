import { useBattleStore } from "@/store/battle_store";
import { useEnemyStore } from "@/store/enemy_store";
import { useLocationStore } from "@/store/location_store";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

export default function Enemy() {
    const setCurrentEnemy = useEnemyStore(state => state.setCurrentEnemy);
    const currentEnemy = useEnemyStore(state => state.currentEnemy);
    const enemyStats = useBattleStore(state => state.enemy);
    const currentLocation = useLocationStore(state => state.currentLocation);

    const initialHP = useRef<number>(enemyStats.healPoints ?? 1);
    const hpValue = Math.max(0, enemyStats.healPoints);
    const animatedHP = useRef(new Animated.Value(hpValue / initialHP.current)).current;

    // Анимируем при изменении HP
    useEffect(() => {
        Animated.timing(animatedHP, {
            toValue: hpValue / initialHP.current,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [hpValue]);


    // интерполяция ширины и цвета
    const widthInterpolated = animatedHP.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const colorInterpolated = animatedHP.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['#ff3333', '#ffcc00', '#4caf50'], // красный → жёлтый → зелёный
    });

    return (
        <View style={styles.container}>
            <View style={styles.infoBlock}>
                <Text style={styles.name}>{currentEnemy.name}</Text>
                <Text style={styles.level}>Level: {enemyStats.level}</Text>

                <View style={styles.hpWrapper}>
                    <Text style={styles.hpText}>
                        HP: {hpValue} / {initialHP.current}
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

            <Image source={currentEnemy.model} style={styles.image} resizeMode="contain" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    infoBlock: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 8,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    level: {
        marginBottom: 8,
    },
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
    image: {
        width: '100%',
        height: '70%',
    },
});
