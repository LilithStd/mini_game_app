import { Modal, Text, View, TouchableOpacity } from "react-native";

type ModalWindowProps = {
    objectSetting: {
        variant: string,
        callBack?: (response: boolean) => void;
    }
    onClose: () => void;
};

export enum VARIANTS_MODAL_WINDOW {
    RETREAT = 'reatreat',
    VICTORY = 'victory',
    LOSE = 'lose',
    TREASURE_REWARD = 'treasure_reward',
    MONSTER_REWARD = 'monster_reward',
    DUNGEON_REWARD = 'dungeon_reward',
    BOSS_REWARD = 'boss_reward',
    DEFAULT = 'default'

}

export default function ModalWindow({ objectSetting, onClose }: ModalWindowProps) {
    const callBackModalWindow = () => {
        objectSetting.callBack
            ? objectSetting.callBack(true)
            : () => {
                console.log('return');
            }
    }

    return (
        <Modal
            animationType="fade"
            transparent
            visible
            onRequestClose={onClose}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <View
                    style={{
                        width: 300,
                        height: 300,
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        padding: 20,
                    }}
                >
                    <Text>Modal Window</Text>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10
                    }}>
                        <TouchableOpacity
                            onPress={callBackModalWindow}
                            style={{
                                marginTop: 20,
                                backgroundColor: 'green',
                                padding: 6,
                                borderRadius: 6
                            }}>
                            <Text style={{ color: "white" }}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onClose}
                            style={{
                                marginTop: 20,
                                backgroundColor: 'green',
                                padding: 6,
                                borderRadius: 6
                            }}

                        >
                            <Text style={{ color: "white" }}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}
