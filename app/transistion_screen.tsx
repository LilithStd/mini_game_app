import { GLOBAL_APP_PATH } from '@/constants/global_path';
import { getValidPath } from '@/constants/helpers';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import { ImageBackground, Text, View, StyleSheet } from 'react-native'


export default function Transistion() {
    const { title, pathToAfterTransistion } = useLocalSearchParams()
    const router = useRouter();
    const defaultRoute = GLOBAL_APP_PATH.MAIN

    //types
    const transistionContenxt = { contentTitle: title ? title : 'default transistion context' }
    const transistionPath = getValidPath(pathToAfterTransistion as string)
    //functions
    console.log(pathToAfterTransistion);

    //effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log("Сработал таймер!");
            router.push({
                pathname: pathToAfterTransistion as typeof GLOBAL_APP_PATH[keyof typeof GLOBAL_APP_PATH]
            })
        }, 3000);


        return () => {
            clearTimeout(timeoutId);
            console.log("Таймер очищен");

        };
    }, []);

    return (
        <ImageBackground>
            <View style={transistionStyles.mainContainer}>
                <Text style={transistionStyles.title}>Transistion</Text>
                <Text style={transistionStyles.title}>{transistionContenxt.contentTitle}</Text>
            </View>
        </ImageBackground>
    )
}

const transistionStyles = StyleSheet.create({
    mainContainer: {},
    backgroundContainer: {},
    title: {}
})