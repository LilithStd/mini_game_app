import { GLOBAL_APP_PATH } from '@/constants/global_path'
import { useGlobalStore } from '@/store/global_store'
import { Location_content_type, useLocationStore } from '@/store/location_store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Text, View, Image, ImageBackground, Button } from 'react-native'

export default function LocationScreen() {
    const router = useRouter();
    const { location } = useLocalSearchParams();
    const countScreenToBattle = useLocationStore(state => state.countLocationToRedirectForBattle)
    const setCountScreenToBattle = useLocationStore(state => state.setCountLocationToRedirectForBattle)
    const setLocationToBattleScreen = useLocationStore(state => state.setLocationToBattleScreen)
    const currentLocationPrevious = useLocationStore(state => state.locationToBattleScreen)
    const currentLocation = useLocationStore(state => state.currentLocation)

    const getRandomNumber = (min: number = 1, max: number = 4): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    getRandomNumber()
    const [countScreen, setCountScreen] = useState(0)

    const [locationImage, setLocationImage] = useState<Location_content_type>({ name: '', model: 0, group: '' })

    const getRandomLocationImage = () => {
        // const defaultImage = currentLocationPrevious ? currentLocationPrevious.model : require('../assets/backgrounds/bg_2.jpg');
        const defaultImage = require('../assets/backgrounds/bg_2.jpg');

        if (location !== undefined || currentLocation !== '') {
            const tempElement = location && location !== undefined ? location : currentLocationPrevious.group
            const tempImage = locationPull(tempElement.toString())[Math.floor(Math.random() * locationPull(tempElement.toString()).length)]
            setLocationToBattleScreen(tempImage)
            setLocationImage(tempImage)
        } else {
            setLocationImage({ name: '', model: defaultImage, group: '' })
        }

    }

    const handleDecrementCountScreen = () => {
        setCountScreen(countScreen + 1)
    }
    const handleIncrementCountScreen = () => {
        setCountScreen(countScreen + 1)
    }

    useEffect(() => {
        setCurrentState(GLOBAL_APP_PATH.LOCATION_SCREEN)
    }, [])

    useEffect(() => {
        setCountScreenToBattle(getRandomNumber())
        getRandomLocationImage()
    }, [location])


    useEffect(() => {
        if (countScreen === countScreenToBattle) {
            setCountScreenToBattle(getRandomNumber())
            setCountScreen(0)
            router.push(GLOBAL_APP_PATH.BATTLE_SCREEN);
        }
    }, [countScreen, countScreenToBattle]);



    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const locationPull = useLocationStore(state => state.getPullLocations)




    return (
        <ImageBackground
            style={{
                flex: 1,
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: 'center'
            }}
            source={locationImage.model}
            resizeMode='cover'
        >
            <Text
                style={{
                    color: 'white'
                }}

            >locations details</Text>
            <View style={{
                width: '80%', // Задаем ширину для адаптивности
                alignItems: 'center', // Выравниваем кнопки по центру
                gap: 10, // Добавляем промежуток между кнопками
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                <Button
                    title="left"
                    onPress={() => {
                        getRandomLocationImage(),
                            handleDecrementCountScreen()
                    }}

                />
                <Button
                    title="right"
                    onPress={() => {
                        getRandomLocationImage(),
                            handleIncrementCountScreen()
                    }}
                />
            </View>

        </ImageBackground>



    )
}
