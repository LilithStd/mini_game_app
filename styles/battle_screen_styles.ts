import {transform} from '@babel/core';
import {StyleSheet} from 'react-native';

export const battleScreenStyles = StyleSheet.create({
	switchFocusElement: {
		zIndex: 3,
	},
	mainContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center', // Центрирует по горизонтали
		width: '100%',
		height: '100%',
		position: 'relative',
	},
	imageBackground: {
		flex: 1,
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
	buttonContainer: {
		position: 'absolute',
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
		padding: 8,
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
	characterStatsContainer: {
		position: 'absolute',
		width: '70%',
		height: '90%',
		right: 10,
		// backgroundColor: 'grey',
		marginLeft: 50,
	},
	statContainer: {
		flexDirection: 'row',
		paddingRight: 10,
		paddingLeft: 10,
		justifyContent: 'space-between',
	},
	statsTitle: {
		textAlign: 'center',
	},
});
