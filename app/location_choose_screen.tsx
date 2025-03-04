import { GLOBAL_APP_PATH } from "@/constants/global_path";
import { useGlobalStore } from "@/store/global_store";
import { LOCATIONS_GROUP, useLocationStore } from "@/store/location_store"
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
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
        ><ImageBackground
            style={{
                flex: 1,
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: 'center'
            }}
            resizeMode='cover'
            source={require('../assets/backgrounds/bg_1.jpg')}
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
            </ImageBackground>
        </SafeAreaView>

    )
}
