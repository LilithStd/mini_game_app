import { ConsumableType } from '@/store/items_strore';
import React, { useState } from 'react'
import { View, TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native'
const buttonOrange = require('../../assets/buttons/orange_button_01(small).png')
const buttonDisabled = require('../../assets/buttons/orange_button_01(small_disabled).png')

interface ButtonBlockProps {
    isActiveTurn: boolean;
    activeConsumbles: ConsumableType[];
    callbacks: {
        handleAttackPress: () => void;
        handleDefensePress: () => void; 
        handleEvasionPress: () => void;
        handleHealthPress: () => void;
        handleRetreatPress: () => void;
        handleItemsPress: () => void;
    };
}

export default function ButtonBlock({ isActiveTurn, activeConsumbles, callbacks }: ButtonBlockProps) {
    const [isItemsActive, setIsItemsActive] = useState(false)
    return (
        <View style={styles.absoluteContainer}>
                        <View style={styles.buttonContainer}>
                            {isItemsActive ? <View style={styles.buttonView}>

                                <TouchableOpacity style={isActiveTurn ? styles.buttonDisable : styles.button}
                                    disabled={isActiveTurn}
                                    onPress={callbacks.handleHealthPress}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={[styles.buttonBackground, {
                                            marginLeft: 80
                                        }]}
                                    >
                                        <Text style={styles.buttonText}>HEALTH</Text>
                                    </ImageBackground>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, {
                                        marginLeft: 120
                                    }]}
                                    disabled={isActiveTurn}
                                    onPress={callbacks.handleAttackPress}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={styles.buttonBackground}
                                    >
                                        <Text style={styles.buttonText}>ATTACK</Text>
                                    </ImageBackground>
                                </TouchableOpacity >
                                <TouchableOpacity
                                    style={[styles.button, { marginLeft: 150 }]}
                                    disabled={isActiveTurn}
                                    onPress={callbacks.handleDefensePress}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={styles.buttonBackground

                                        }
                                    >
                                        <Text style={styles.buttonText}>DEFENSE</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, { marginLeft: 120 }]}
                                    disabled={isActiveTurn}
                                    onPress={callbacks.handleEvasionPress}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={styles.buttonBackground}
                                    >
                                        <Text style={styles.buttonText}>EVASION</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button,
                                    { marginLeft: 80 }]}
                                    disabled={isActiveTurn}
                                    onPress={callbacks.handleHealthPress}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={styles.buttonBackground}
                                    >
                                        <Text style={styles.buttonText}>CLOSE</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View> : <View style={styles.buttonView}>

                                <TouchableOpacity style={true ? styles.buttonDisable : styles.button}
                                    onPress={callbacks.handleAttackPress}
                                    disabled={isActiveTurn}

                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={[styles.buttonBackground, {
                                            marginLeft: 80
                                        }]}
                                    >
                                        <Text style={styles.buttonText}>ATTACK</Text>
                                    </ImageBackground>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, {
                                        marginLeft: 120
                                    }]}
                                    disabled={isActiveTurn}
                                    onPress={callbacks.handleDefensePress}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={styles.buttonBackground}
                                    >
                                        <Text style={styles.buttonText}>DEFENSE</Text>
                                    </ImageBackground>
                                </TouchableOpacity >
                                <TouchableOpacity
                                    style={[styles.button, { marginLeft: 150 }]}
                                    disabled={isActiveTurn}
                                    onPress={callbacks.handleEvasionPress}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={styles.buttonBackground

                                        }
                                    >
                                        <Text style={styles.buttonText}>STAND</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button,
                                    { marginLeft: 120 }]}
                                    onPress={callbacks.handleRetreatPress}
                                    disabled={isActiveTurn}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={styles.buttonBackground}
                                    
                                    >
                                        <Text style={styles.buttonText}>RETREAT</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, { marginLeft: 80 }]}
                                    onPress={callbacks.handleItemsPress}
                                    disabled={isActiveTurn}
                                >
                                    <ImageBackground
                                        source={buttonOrange}
                                        style={styles.buttonBackground}
                                        onProgress={() => {
                                            setIsItemsActive(true)
                                        }}
                                    >
                                        <Text style={styles.buttonText}>ITEMS</Text>
                                    </ImageBackground>
                                </TouchableOpacity>

                            </View>}
                        </View>
                        {isItemsActive ?
                            <View style={styles.characterStatsContainer}>
                                {activeConsumbles.map((item) =>
                                    <View
                                        key={item.id}
                                        style={{
                                            margin: 4
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: 'yellow'
                                            }}
                                        >
                                            <Text >
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View> : <View></View>
                        }
                    </View>
  )
}
const styles = StyleSheet.create({
    buttonContainer: {

		left: 10,
		justifyContent: 'space-between',
		alignItems: 'stretch',
	},
	buttonView: {
		gap: 1,
		// alignItems: 'stretch',
	},
    buttonBackground: {
		width: 182,
		height: 47,
		justifyContent: 'center',
		alignItems: 'center',
		transform: [{scale: 0.8}],
	},
	button: {
		// width: 120,
	},
	buttonDisable: {
		// backgroundColor: 'grey',
		// padding: 8,
		borderRadius: 4,
		width: 100,
	},
	buttonActive: {
		backgroundColor: 'aquamarine',
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 900,
		// color: 'white',
	},
    	absoluteContainer: {
		position: 'absolute', // Фиксируем внизу
		top: 430, // Прижимаем к нижнему краю
		width: '100%',
		height: '28%',
        
		// backgroundColor: 'black',
		justifyContent: 'center', // Центрируем содержимое
		alignItems: 'center', // Центрируем текст
		borderTopLeftRadius: 10, // Закруглим углы для красоты
		borderTopRightRadius: 10,
		// shadowColor: '#000',
		zIndex: 3,
		// shadowOffset: {width: 0, height: -2},
		// shadowOpacity: 0.2,
		// shadowRadius: 4,
		// elevation: 5, // Тень для Android
	},
    	characterStatsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
})
