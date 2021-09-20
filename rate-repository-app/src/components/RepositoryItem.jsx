// RepositoryItem

// $ npm install react-native-web

import React from 'react';

import { Text, FlatList, View, StyleSheet, Image } from 'react-native';

// 10.5
const styles = StyleSheet.create({separator: {
	height: 10,
	},
	item: {
		padding: 5,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'black'
	},
	lightitem: {
		padding: 5,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'lightgrey'
	},
	fixitem: {
		padding: 5,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'black',
		alignSelf: 'center',
	},
	avatar: {
		height: 25,
		width: 25,
	},
	textbox: {
		padding: 5,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
		backgroundColor : '#0366d6',
		alignSelf: 'flex-start',
		
	},
	flexContainer: {
		flexDirection: 'row',
	}
});

const SUFFIX = ["", "k", "M", "G"];

function getSuffix(number) {

	let tier = Math.log10(Math.abs(number)) / 3 | 0;

	if(tier == 0) return number;

	let suffix = SUFFIX[tier];

	let scale = Math.pow(10, tier * 3);

	let scaled = number / scale;

	return scaled.toFixed(1) + suffix;
}

const RepositoryItem = ( props ) => {

	const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl } = props

	console.log('RepositoryItem', props)

	const forks = getSuffix(forksCount);

	const stars = getSuffix(stargazersCount);

	const rating = getSuffix(ratingAverage);

	const reviews = getSuffix(reviewCount);

	return (
		<View style={{backgroundColor : 'white', padding: 5}}>
			
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={{flex: 1}, {alignSelf: 'baseline'}}>
					<Image style={styles.avatar} source={{uri: ownerAvatarUrl}}/>
				</View>
				<View style={{flex: 2}, {alignSelf: 'baseline'}}>
					<Text style={styles.item}>{fullName}</Text>

					<Text style={styles.lightitem}>{description}</Text>
			
					<Text style={styles.textbox}>{language}</Text>
				</View>
			</View>

			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={{flex: 2}, {alignSelf: 'baseline'}}>
					<Text style={styles.fixitem} >{stars}</Text>
					<Text style={styles.lightitem} >Stars</Text>
				</View>
				<View style={{flex: 1}, {alignSelf: 'baseline'}}>
					<Text style={styles.fixitem} >{forks}</Text>
					<Text style={styles.lightitem} >Forks</Text>
				</View>
				<View style={{flex: 4}, {alignSelf: 'baseline'}}>
					<Text style={styles.fixitem}>{reviews}</Text>
					<Text style={styles.lightitem}>Reviews</Text>
				</View>
				<View style={{flex: 3}, {alignSelf: 'baseline'}}>
					<Text style={styles.fixitem} >{rating}</Text>
					<Text style={styles.lightitem} >Rating</Text>
				</View>
			</View>
		</View>
	)
};

export default RepositoryItem;