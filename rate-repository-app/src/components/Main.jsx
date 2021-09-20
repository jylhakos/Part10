// Main.jsx

import React from 'react';

import Constants from 'expo-constants';

import { Text, StyleSheet, View } from 'react-native';

// 10.3
import RepositoryList from './RepositoryList';

// 10.4
import AppBar from './AppBar';

const styles = StyleSheet.create({
	container: {
		//marginTop: Constants.statusBarHeight,
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor : '#e1e4e8'
	},
	title: {
		padding: 5,
		fontSize: 18,
		fontWeight: 'bold',
		color: 'black'
	}
});

// <Text style={styles.title}>Rate Repository Application</Text>

const Main = () => {

	console.log('Main')

	return (
		<View style={styles.container}>
			<AppBar />
			
			<RepositoryList />
		</View>
	);
};

export default Main;