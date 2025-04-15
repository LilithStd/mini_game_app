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
    const locationImagePull = [
        { name: 'forest', model: require('../assets/location/forest/location_06.png') },
        { name: 'swamp', model: require('../assets/location/swamp/location_02.png') }
    ]

    const defaultBackground = require('../assets/template/template_image.jpg')
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
            source={defaultBackground}
        >
                {listLocations.map((item) => (
                    <View
                        key={item}
                        style={{
                            width: '100%',
                            gap: 2,
                            justifyContent: 'center'

                        }}
                    >
                        <TouchableOpacity

                            style={{
                                backgroundColor: 'green',
                                padding: 2,
                                borderRadius: 5,
                                margin: 2
                            }}
                            onPress={() => handleRedirectToLocation(item)}
                        >
                            <ImageBackground
                                style={{
                                    height: 100,
                                    justifyContent: 'center'
                                }}
                                source={locationImagePull.find(location => location.name === item)?.model || defaultBackground}
                                resizeMode="cover"
                            >
                                <Text
                                    key={item}
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        justifyContent: 'center'
                                    }}
                                >{item}</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                ))}
            </ImageBackground>
        </SafeAreaView>

    )
}
