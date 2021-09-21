// AppBar

import React from 'react';

import { Link } from 'react-router-native';

import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';

import Constants from 'expo-constants';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		paddingBottom: Constants.statusBarHeight/2,
		flexDirection: 'row',
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		fontSize: 20,
		color: '#FFFFFF',
		backgroundColor: '#24292e'
    },
    bar: {
		//fontWeight: 'bold',
		fontFamily: 'Roboto',
		fontSize: 20,
		color: '#FFFFFF'
    },
});

// 10.7
const AppBar = () => {

	return (

		<View style={styles.container}>
			<ScrollView horizontal>
				<View style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 15 }}>
					<Link to="/repositories">
						<Text style={styles.bar}>Repositories</Text>
					</Link>
				</View>
				
				<View style={{paddingTop: 10, paddingBottom: 10, paddingRight: 15 }}>
					<Link to="/sigin">
						<Text fontWeight="bold" fontSize="subheading" style={styles.bar}>Sign In</Text>
					</Link>
				</View>
			</ScrollView>
		</View>
  );
};

export default AppBar;

				