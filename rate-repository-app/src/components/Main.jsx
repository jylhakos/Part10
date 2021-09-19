// Main.jsx

import React from 'react';

import Constants from 'expo-constants';

import { Text, StyleSheet, View } from 'react-native';

// 10.3
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight,
		flexGrow: 1,
		flexShrink: 1,
	},
	titleText: {
		padding: 5,
		fontSize: 18,
		fontWeight: 'bold',
		color: 'black'
	}
});

const Main = () => {

	console.log('Main')

	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>Rate Repository Application</Text>
			<RepositoryList />
		</View>
	);
};

export default Main;