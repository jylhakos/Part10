// AppBar

import React from 'react';

import { Link } from 'react-router-native';

import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';

import Constants from 'expo-constants';

import { useQuery, useApolloClient } from '@apollo/client';

import { GET_AUTHORIZATION } from '../graphql/queries';

import useAuthStorage from '../hooks/useAuthStorage';

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

	const apolloClient = useApolloClient();

	const authStorage = useAuthStorage();

	const { loading, error, data } = useQuery(GET_AUTHORIZATION);

	console.log('AppBar', data);

	if (data) {

		console.log('authorizedUser', data.authorizedUser);

	}

	return (

		(data && data.authorizedUser) ? (

			<View style={styles.container}>
				<ScrollView horizontal>
					<View style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 15 }}>
						<Link to="/repositories">
							<Text style={styles.bar}>Repositories</Text>
						</Link>
					</View>

					<View style={{paddingTop: 10, paddingBottom: 10, paddingRight: 15 }}>
						<Link to="/createreview">
							<Text fontWeight="bold" fontSize="subheading" style={styles.bar}>Create a review</Text>
						</Link>
					</View>
					
					<View style={{paddingTop: 10, paddingBottom: 10, paddingRight: 15 }}>
						<Pressable onPress={() => { console.log("Sign Out"); authStorage.removeAccessToken(); apolloClient.resetStore();}}> 
							<Text fontWeight="bold" fontSize="subheading" style={styles.bar}>Sign Out</Text>
						</Pressable>
					</View>

				</ScrollView>
			</View>

	) : (

			<View style={styles.container}>
				<View style={{paddingTop: 10, paddingBottom: 10, paddingRight: 15 }}>
					<Link to="/signin">
						<Text fontWeight="bold" fontSize="subheading" style={styles.bar}>Sign In</Text>
					</Link>
					
				</View>

				<View style={{paddingTop: 10, paddingBottom: 10, paddingRight: 15 }}>
					<Link to="/signup">
						<Text fontWeight="bold" fontSize="subheading" style={styles.bar}>Sign Up</Text>
					</Link>

				</View>

			</View>

		)
  );
};

export default AppBar;

				