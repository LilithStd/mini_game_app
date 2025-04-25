import React from 'react'
import { Text, View } from 'react-native'

export interface TransistionType {
    title: string,
}


export default function Transistion({ title }: TransistionType) {
    const transistionContenxt = { contentTitle: title ? title : 'default transistion context' }
    return (
        <View>
            <Text>Transistion</Text>
            <Text>{transistionContenxt.contentTitle}</Text>
        </View>

    )
}
