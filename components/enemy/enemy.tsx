import { useEnemyStore } from "@/store/enemy_store";
import { useLocationStore } from "@/store/location_store";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Enemy() {
    const setCurrentEnemy = useEnemyStore(state => state.setCurrentEnemy)
    const currentEnemy = useEnemyStore(state => state.currentEnemy)
    const enemyPull = useEnemyStore(state => state.getEnemyPullForLocations)
    const currentLocation = useLocationStore(state => state.currentLocation)

    const randomEnemyForCurrentLocation = () => {
        return enemyPull(currentLocation)[Math.floor(Math.random() * enemyPull(currentLocation).length)]
    }

    useEffect(() => {
        setCurrentEnemy(randomEnemyForCurrentLocation())
    }, [])


    return (
        <View style={{
            width: '100%',
            height: '100%',
        }}>
            <Text>Enemy Component</Text>
            <Text>{currentEnemy.name}</Text>
            <Image
                style={{

                }}
                source={currentEnemy.model}
            />
        </View>

    )
}
