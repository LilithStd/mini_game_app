import {StyleSheet} from 'react-native';

export const battleScreenStyles = StyleSheet.create({
	switchFocusElement: {
		zIndex: 3,
	},
	buttonContainer: {
		position: 'absolute',
		left: 10,
		justifyContent: 'space-between',
		alignItems: 'stretch',
	},
	buttonView: {
		gap: 4,
		alignItems: 'stretch',
	},
	button: {
		backgroundColor: 'green',
		padding: 8,
		borderRadius: 4,
		width: 100,
	},
	buttonDisable: {
		backgroundColor: 'grey',
		padding: 8,
		borderRadius: 4,
		width: 100,
	},
	buttonActive: {
		backgroundColor: 'aquamarine',
	},
	buttonText: {
		textAlign: 'center',
		color: 'white',
	},
	characterStatsContainer: {
		position: 'absolute',
		width: '70%',
		height: '90%',
		right: 10,
		backgroundColor: 'grey',
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
