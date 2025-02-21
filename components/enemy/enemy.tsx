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
        <View style={{
            width: '100%',
            height: '100%',
            position: 'relative'
        }}>
            <Text>Enemy Component</Text>
            <Text>{randomEnemyForCurrentLocation().name}</Text>
            <Image
                style={{
                    flex: 1,
                    position: 'absolute',
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    height: '100%',
                    width: '100%',
                    top: '50%',
                    right: '-20%',
                    zIndex: 1
                }}
                source={randomEnemyForCurrentLocation().model}
            />
        </View>

    )
}
