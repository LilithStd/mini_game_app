import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { useBattleStore } from "@/store/battle_store";
import { useCharacterStore } from "@/store/character_store";
import { useGlobalStore } from "@/store/global_store";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

export default function Character() {
    const globalRoute = useGlobalStore(state => state.currentState);
    const characterStatsGlobal = useCharacterStore(state => state.characterStats);
    const characterStats =
        globalRoute === GLOBAL_APP_PATH.BATTLE_SCREEN
            ? useBattleStore(state => state.character)
            : characterStatsGlobal;

    const initialHP = useRef<number>(characterStats.healPoints ?? 1);
    const hpValue = Math.max(0, characterStats.healPoints);
    const animatedHP = useRef(new Animated.Value(hpValue / initialHP.current)).current;

    useEffect(() => {
        Animated.timing(animatedHP, {
            toValue: hpValue / initialHP.current,
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

    return (
        <View style={styles.container}>
            <Image source={characterStatsGlobal.model} style={styles.image} resizeMode="contain" />

            <View style={styles.infoBlock}>
                <Text style={styles.name}>{characterStatsGlobal.name}</Text>
                <Text style={styles.level}>Level: {characterStats.level}</Text>

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '70%',
        bottom: 0,
        top: 120,
        zIndex: 2,
        position: 'relative',
    },
    infoBlock: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        top: -120,
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
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
});
