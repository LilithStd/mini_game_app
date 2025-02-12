import { useStoryStore } from "@/store/story_store";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, ImageBackground, Text, View } from "react-native";
import Typewriter from 'react-native-typewriter';

export default function Story_Screen() {
    const { chapter } = useLocalSearchParams();
    const getChapterStory = useStoryStore(state => state.getChapterContent)
    const [typing, setTyping] = useState(false)
    const [skip, setSkip] = useState(false)
    const storyTextContent = getChapterStory()?.text ? getChapterStory()?.text : 'no content'
    return (
        <ImageBackground
            source={getChapterStory()?.background || require('../assets/backgrounds/test_bg.png')}
            style={{
                flex: 1, // Главное: ImageBackground должен растягиваться!
                width: '100%',
                height: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
            resizeMode="cover"
        >
            <Text>story_Screen</Text>
            <Text
                style={{
                    backgroundColor: 'yellow',
                    width: 400,
                    height: 200,
                    padding: 20,
                    margin: 10,
                    borderRadius: 10
                }}
            >{skip ? <Text style={{
                fontSize: 14,
                fontWeight: 'bold',

            }}>{storyTextContent}</Text> :
                <Typewriter
                    style={{
                        fontSize: 14,
                        fontWeight: 'bold',

                    }}
                    typing={1}
                    minDelay={0}
                    onTyped={() => { setTyping(false) }}
                    onTypingEnd={() => { setTyping(false), setSkip(true) }}
                >
                    <Text>{storyTextContent}</Text>
                </Typewriter>
                }</Text>
            <View style={{
                flexDirection: 'row',
                gap: 6,
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <Button
                    disabled={typing || skip}
                    title="skip"
                    onPress={() => setSkip(true)}
                />
                <Button
                    title="go to location"
                />
            </View>

        </ImageBackground>

    )
}
