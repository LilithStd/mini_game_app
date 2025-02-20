import { useEnemyStore } from "@/store/enemy_store";
import { useLocationStore } from "@/store/location_store";
import { Image, Text, View } from "react-native";

export default function Enemy() {
    const enemyPull = useEnemyStore(state => state.getEnemyPullForLocations)
    const currentLocation = useLocationStore(state => state.currentLocation)

    const randomEnemyForCurrentLocation = () => {
        return enemyPull(currentLocation)[Math.floor(Math.random() * enemyPull(currentLocation).length)]
    }
    return (
        <View>
            <Text>Enemy Component</Text>
            <Image
                style={{
                    width: '80%',
                    height: '80%',
                    resizeMode: 'contain'
                }}
                source={randomEnemyForCurrentLocation().model}
            />
        </View>

    )
}
