// Main.jsx

import React from 'react';

import Constants from 'expo-constants';

import { StyleSheet, View } from 'react-native';

// 10.6
// $ npm install react-router-native

// $ npm install @expo/webpack-config --save-dev

import { Route, Switch, Redirect } from 'react-router-native';

// import Text from './Text';

// 10.3
import RepositoryList from './RepositoryList';

// 10.4
import AppBar from './AppBar';

// 10.19
import RepositoryItemView from './RepositoryItemView';

// 10.21
import Review from './Review';

import SignIn from './SignIn';

// 10.22
import SignUp from './SignUp';

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

	// const { id, fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl } = useParams();

	return (
		<View style={styles.container}>
			<AppBar />
			<Switch>
				<Route path="/signin">
					<SignIn />
				</Route>
				<Route path="/signup">
					<SignUp />
				</Route>
				<Route path="/repositories">
					<RepositoryList />
				</Route>
				<Route path="/repository/:id" component={RepositoryItemView}>
				</Route>
				<Route path="/createreview">
					<Review />
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