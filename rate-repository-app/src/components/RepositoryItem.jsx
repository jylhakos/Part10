// RepositoryItem

// $ npm install react-native-web

import React from 'react';

import { Text, FlatList, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({separator: {
	height: 10,
	},
	item: {
		padding: 5,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'black'
	},
});

const RepositoryItem = ( props ) => {

	const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount } = props

	console.log('RepositoryItem', props)

	return (
		<View style={styles.item}>
			<Text style={styles.item}>Full name: {fullName}</Text>
			<Text style={styles.item}>Description: {description}</Text>
			<Text style={styles.item}>Language: {language}</Text>
			<Text style={styles.item} >Forks: {forksCount}</Text>
			<Text style={styles.item} >Stars: {stargazersCount}</Text>
			<Text style={styles.item} >Rating: {ratingAverage}</Text>
			<Text style={styles.item}>Reviews: {reviewCount}</Text>
		</View>
	)
};

export default RepositoryItem;