import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { useGlobalStore } from "@/store/global_store";
import { LOCATIONS_GROUP, useLocationStore } from "@/store/location_store"
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native"

export default function LocationScreen() {
    const router = useRouter();
    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const listLocations = Object.values(LOCATIONS_GROUP);
    const handleRedirectToLocation = (location: string) => {
        if (!location) return;
        // router.push(`/location_screen?location=${location}`)
        router.push({
            pathname: GLOBAL_APP_PATH.LOCATION_SCREEN,
            params: { location }
        });
    }


    useEffect(() => {
        setCurrentState(GLOBAL_APP_PATH.LOCATION_CHOOSE_SCREEN)
    }, [])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center', // Центрирование по вертикали
                alignItems: 'center', // Центрирование по горизонтали
                gap: 6
            }}
        >
            {listLocations.map((item) => (
                <TouchableOpacity
                    key={item}
                    style={{
                        backgroundColor: 'green',
                        padding: 10,
                        borderRadius: 5
                    }}
                    onPress={() => handleRedirectToLocation(item)}
                >
                    <Text
                        key={item}
                        style={{
                            color: 'white'
                        }}
                    >{item}</Text>
                </TouchableOpacity>
            ))}
        </SafeAreaView>

    )
}
