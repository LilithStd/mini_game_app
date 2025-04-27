import { GLOBAL_APP_PATH } from '@/constants/global_path';
import { getValidPath } from '@/constants/helpers';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { ImageBackground, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Typewriter from 'react-native-typewriter';

export default function Transistion() {
    const { title, pathToAfterTransistion } = useLocalSearchParams()
    const router = useRouter();
    const defaultRoute = GLOBAL_APP_PATH.MAIN
    //state
    const [typing, setTyping] = useState(false)
    const [skip, setSkip] = useState(false)
    const [isTimer, setIsTimer] = useState(false)
    //types
    const transistionContenxt = { contentTitle: title ? title : 'default transistion context' }
    const transistionPath = getValidPath(pathToAfterTransistion as string)
    //functions
    const handleTransistionChange = () => {
        if (!skip) {
            setSkip(true)
        } else {
            setIsTimer(true)
        }
    }
    //effect
    useEffect(() => {
        if (isTimer) {
            const timeoutId = setTimeout(() => {
                console.log("Сработал таймер!");
                router.push({
                    pathname: pathToAfterTransistion as typeof GLOBAL_APP_PATH[keyof typeof GLOBAL_APP_PATH]
                })
            }, 3000);


            return () => {
                clearTimeout(timeoutId);
                setIsTimer(false)
                console.log("Таймер очищен");

            };
        }

    }, [isTimer]);

    return (
        <ImageBackground
            style={transistionStyles.backgroundContainer}
            resizeMode='cover'
        >
            <View style={transistionStyles.mainContainer}>
                <Text style={transistionStyles.title}>Transistion</Text>
                <TouchableOpacity
                    onPress={handleTransistionChange}
                >
                    {skip ? <Text style={transistionStyles.title}>{transistionContenxt.contentTitle}</Text> :
                        <Typewriter
                            style={transistionStyles.title}
                            disabled={typing || skip}
                            typing={1}
                            minDelay={0}
                            onTyped={() => { setTyping(false) }}
                            onTypingEnd={() => { setTyping(false), setSkip(true) }}
                        >
                            {transistionContenxt.contentTitle}
                        </Typewriter>
                    }
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const transistionStyles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        justifyContent: 'center',
        padding: '5%'
    },
    backgroundContainer: {
        backgroundColor: 'black',
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontFamily: 'Title App',
    }
})