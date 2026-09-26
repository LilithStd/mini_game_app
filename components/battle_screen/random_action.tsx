import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MultilanguageType } from '@/constants/global_types';
import { useGlobalStore } from '@/store/global_store';

interface RandomActionProps {
    randomActionsArray: MultilanguageType[]
}

export default function RandomAction({ randomActionsArray }: RandomActionProps) {
    const currentLanguage = useGlobalStore(state => state.currentLanguage);

    const methodToRandomAction = () => {
        const randomIndex = Math.floor(Math.random() * randomActionsArray.length);
        return randomActionsArray[randomIndex][currentLanguage].title;
    };

    return (
        <View style={styles.container}>
        <Text>Random Action:</Text>
        <Text>{methodToRandomAction()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});