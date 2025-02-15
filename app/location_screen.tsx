import { GLOBAL_APP_PATH } from '@/constants/global_path'
import { useGlobalStore } from '@/store/global_store'
import { useLocationStore } from '@/store/location_store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

export default function LocationScreen() {
    const router = useRouter();
    const { location } = useLocalSearchParams();
    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const locationPull = useLocationStore(state => state.getPullLocations)
    if (!location || location.length === 0 || location === undefined) {
        router.push(GLOBAL_APP_PATH.LOCATION_CHOOSE_SCREEN)
    }
    useEffect(() => {

        setCurrentState(GLOBAL_APP_PATH.LOCATION_SCREEN)
    }, [])

    return (
        <View>
            <Text>locations details</Text>
            {locationPull('forest').map((item) => (
                <Text
                    key={item.name}
                >{item.name}</Text>
            ))}

        </View>

    )
}
