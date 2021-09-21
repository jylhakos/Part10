// Main.jsx

import React from 'react';

import Constants from 'expo-constants';

import { Text, StyleSheet, View } from 'react-native';

// 10.6
// $ npm install react-router-native

// $ npm install @expo/webpack-config --save-dev

import { Route, Switch, Redirect } from 'react-router-native';

// 10.3
import RepositoryList from './RepositoryList';

import SignIn from './SignIn';

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

// 10.6
const Main = () => {

	return (
		<View style={styles.container}>
			<AppBar />
			<Switch>
				<Route path="/sigin">
					<SignIn />
				</Route>
				<Route path="/repositories">
					<RepositoryList />
				</Route>
				<Route path="/" exact>
        			<RepositoryList />
        		</Route>
        		<Redirect to="/" />
        	</Switch>
		</View>
	);
};

export default Main;