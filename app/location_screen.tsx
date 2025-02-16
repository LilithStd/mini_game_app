import { GLOBAL_APP_PATH } from '@/constants/global_path'
import { useGlobalStore } from '@/store/global_store'
import { Location_content_type, useLocationStore } from '@/store/location_store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Text, View, Image, ImageBackground, Button } from 'react-native'

export default function LocationScreen() {
    const router = useRouter();
    const { location } = useLocalSearchParams();
    const [locationImage, setLocationImage] = useState<Location_content_type>({ name: '', model: 0, group: '' })
    if (!location || location.length === 0 || location === undefined) {
        router.push(GLOBAL_APP_PATH.LOCATION_CHOOSE_SCREEN)
    }
    useEffect(() => {
        setCurrentState(GLOBAL_APP_PATH.LOCATION_SCREEN)
    }, [])

    useEffect(() => {
        getRandomLocationImage()
    }, [location])

    const getRandomLocationImage = () => {
        const tempImage = locationPull(location.toString())[Math.floor(Math.random() * locationPull(location.toString()).length)]
        setLocationImage(tempImage)
    }

    const setCurrentState = useGlobalStore(state => state.setCurrentState)
    const locationPull = useLocationStore(state => state.getPullLocations)




    return (
        <ImageBackground
            style={{
                flex: 1, // ✅ Заполняет весь экран
                width: "100%",
                height: "100%",
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
                justifyContent: 'center'
            }}>
                <Button
                    title="left"
                    onPress={getRandomLocationImage}

                />
                <Button
                    title="right"
                    onPress={getRandomLocationImage}
                />
            </View>

        </ImageBackground>



    )
}
