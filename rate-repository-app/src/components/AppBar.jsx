// AppBar

import React from 'react';

import { View, StyleSheet, Text, Pressable } from 'react-native';

import Constants from 'expo-constants';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		paddingBottom: Constants.statusBarHeight/4,
		fontWeight: 'bold',
		fontSize: 20,
		color: '#FFFFFF',
		backgroundColor: '#24292e'
    	// ...
    },
});

const AppBar = () => {

	return  (
		<View style={styles.container}>
			<Pressable onPress={() => {} }>
				<Text style={styles.container}>Repositories</Text>
			</Pressable>
		</View>
  );
};

export default AppBar;
