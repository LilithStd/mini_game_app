import { useBattleStore } from "@/store/battle_store";
import { useEnemyStore } from "@/store/enemy_store";
import { useLocationStore } from "@/store/location_store";
import { useEffect, useRef } from "react";
import { Image, Text, View } from "react-native";

export default function Enemy() {
    const setCurrentEnemy = useEnemyStore(state => state.setCurrentEnemy)
    const currentEnemy = useEnemyStore(state => state.currentEnemy)
    const enemyPull = useEnemyStore(state => state.getEnemyPullForLocations)
    const currentLocation = useLocationStore(state => state.currentLocation)
    const enemyStats = useBattleStore(state => state.enemy)
    const initialHP = useRef<number>(enemyStats.healPoints ?? 1);
    const hpPercentage = (enemyStats.healPoints / initialHP.current) * 100;

    return (
        <View style={{
            width: '100%',
            height: '100%',
            position: 'absolute'
        }}>
            <View
                style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    width: '100%',
                    // left: '30%'
                }}
            >
                <Text>{currentEnemy.name}</Text>
                <Text>Level:{enemyStats.level}</Text>

                <View style={{
                    borderWidth: 1,
                    alignSelf: 'flex-start',
                    width: '100%',
                }}>
                    <Text style={{
                        textAlign: 'center',
                        width: '100%',
                        position: 'absolute',
                        zIndex: 1

                    }}>HP:{enemyStats.healPoints}</Text>
                    <View style={{
                        backgroundColor: 'red',
                        width: `${hpPercentage}%`,
                        alignSelf: 'flex-start',
                        height: 20
                    }}>
                    </View>
                </View>

            </View>
            <Image
                style={{
                    width: '100%',
                    height: '70%'
                }}
                source={currentEnemy.model}
            />
        </View>

    )
}
