import { View, Text, StyleSheet } from "react-native";
import { useBattleStore } from "../../store/battle/battle_store";
import { BlurView } from "expo-blur";

export default function BattleMessage() {
    const battleMessages = useBattleStore(state => state.battleMessages)
    if (!battleMessages) return null;
    return (
        <View style={[styles.battleMessageContainer, styles.backgroundColorStyle]}>
            <BlurView 
                    intensity={65} 
                    tint="light" 
                    experimentalBlurMethod="none"
                    style={StyleSheet.absoluteFill}
                  />
                  <View style={styles.glassOverlay} />
            <Text style={styles.battleMessageText}>{ battleMessages.actor ?? 'Unknown title message'} - {battleMessages.type ?? 'Unknown content message'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    battleMessageContainer:{
        height: 100,
        padding: 10, 
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
    },
   glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,20,25,0.20)',
  },
});