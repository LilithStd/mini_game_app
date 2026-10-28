import { View, Text, StyleSheet } from "react-native";
import { useBattleStore } from "../../store/battle/battle_store";

export default function BattleMessage() {
    const battleMessages = useBattleStore(state => state.battleMessages)
    if (!battleMessages) return null;
    return (
        <View style={[styles.battleMessageContainer, styles.backgroundColorStyle]}>
            <Text style={styles.battleMessageText}>{ battleMessages.actor ?? 'Unknown title message'} - {battleMessages.type ?? 'Unknown content message'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    battleMessageContainer:{
        position: 'absolute', 
        bottom: 50, 
        left: 0, 
        right: 0,
        top:100,
        height: 100,
        padding: 10, 
        backgroundColor: 'white', 
        margin: 20, 
        zIndex: 3,
        borderRadius: 20,
    },
    battleMessageText: {
        fontSize: 16,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundColorStyle: {
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.85)',
        borderRadius: 16,
    }
});