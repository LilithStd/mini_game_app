import { useBattleStore } from "@/store/battle_store";
import { useEnemyStore } from "@/store/enemy_store";
import { useLocationStore } from "@/store/location_store";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Enemy() {
    const setCurrentEnemy = useEnemyStore(state => state.setCurrentEnemy)
    const currentEnemy = useEnemyStore(state => state.currentEnemy)
    const enemyPull = useEnemyStore(state => state.getEnemyPullForLocations)
    const currentLocation = useLocationStore(state => state.currentLocation)
    const enemyStats = useBattleStore(state => state.enemy)

    return (
        <View style={{
            width: '100%',
            height: '100%',
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
                <Text>HP:{enemyStats.healPoints}</Text>
                <Text>Level:{enemyStats.level}</Text>
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
