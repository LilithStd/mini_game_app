import { useCharacterStore } from "@/store/character_store";
import { useLocationStore } from "@/store/location_store";
import { Image, ImageBackground, Text, View } from "react-native";


export default function CharacterProfile() {
    const characterStats = useCharacterStore(state => state.characterStats)
    const location = useLocationStore(state => state.locationToBattleScreen)
    return (
        <ImageBackground
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            source={location.model}
            resizeMode="cover"
        >
            <View
                style={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '98%',
                    height: '98%'
                }}
            >
                <Text>Character Profile</Text>
                <Image
                    style={{
                        width: '60%',
                        height: '60%'
                    }}
                    source={characterStats.model}
                />
                <Text>Name:{characterStats.name}</Text>
                <Text>Level:{characterStats.level}</Text>
                <Text>HP:{characterStats.healPoints}</Text>
                <Text>Attack:{characterStats.attack}</Text>
                <Text>Defense:{characterStats.defense}</Text>
                <Text>EXP:{characterStats.expirience}</Text>
                <Text>Total Damage:{characterStats.totalDamage}</Text>
            </View>

        </ImageBackground>

    )
}
