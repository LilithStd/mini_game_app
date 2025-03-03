import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { useGlobalStore } from "@/store/global_store";
import { LOCATIONS_GROUP, useLocationStore } from "@/store/location_store"
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { MotiView } from 'moti'

export default function LocationChooseScreen() {
    const router = useRouter();
    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const listLocations = Object.values(LOCATIONS_GROUP);
    const handleRedirectToLocation = (location: string) => {
        if (!location) return;


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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MotiView
                    from={{ opacity: 0, translateY: -50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 500 }}
                    style={{ width: 100, height: 100, backgroundColor: 'blue' }}
                />
            </View>
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
