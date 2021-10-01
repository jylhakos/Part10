// RepositoryItem.jsx

// $ npm install react-native-web

import React from 'react';

import { FlatList, View, StyleSheet, Image, Pressable } from 'react-native';

// 10.19
import { useHistory } from "react-router-dom";

import * as Linking from 'expo-linking';

import Text from './Text';

// 10.5
const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	item: {
		padding: 5,
		fontSize: 16,
		fontFamily: 'Roboto',
		//fontWeight: 'bold',
		color: 'black'
	},
	lightitem: {
		padding: 5,
		fontSize: 16,
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		color: 'lightgrey'
	},
	fixitem: {
		padding: 5,
		fontSize: 16,
		fontFamily: 'Roboto',
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
		fontFamily: 'Roboto',
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
		backgroundColor : '#0366d6',
		alignSelf: 'flex-start',
		
	},
	button: {
	    alignItems: 'center',
	    justifyContent: 'center',
	    paddingVertical: 18,
	    paddingHorizontal: 28,
	    borderRadius: 4,
	    elevation: 3,
	    backgroundColor: 'blue',
  	},
	  	text: {
	    fontSize: 20,
	    lineHeight: 22,
	    fontWeight: 'bold',
	    letterSpacing: 0.25,
	    color: 'white',
  },
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

	console.log('RepositoryItem', props)

	const { id, fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl, url, reviews, hasButton } = props

	console.log('RepositoryItem', props)

	const forks = getSuffix(forksCount);

	const stars = getSuffix(stargazersCount);

	const rating = getSuffix(ratingAverage);

	const review = getSuffix(reviewCount);

	const history = useHistory();

	const onRepositoryItemView = async (param) => {

		const id = param.id;

		console.log('onViewRepositoryItem', id);

		history.push(`/repository/${id}`);

	}

	const openGithubLink = ({url}) => {

		console.log("openGithubLink", url);

    	Linking.openURL(url);
  	};

  	if(reviews) {
  		console.log('reviews', reviews);
  	}

	return (

		<View testID='id' style={{backgroundColor : 'white', padding: 5}}>

			<View style={{ display: "none" }}><Text>{id}</Text></View>

			<Pressable onPress={() => {console.log('onPress', {id}); onRepositoryItemView({id})}}>

			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={{flex: 1}, {alignSelf: 'baseline'}}>
					<Image style={styles.avatar} source={{uri: ownerAvatarUrl}}/>
				</View>
				<View style={{flex: 2}, {alignSelf: 'baseline'}}>
					<Text fontWeight="bold" style={styles.item}>{fullName}</Text>

					<Text style={styles.lightitem}>{description}</Text>
			
					<Text style={styles.textbox}>{language}</Text>
				</View>
			</View>

			<View style={{flex: 1, flexDirection: 'row', paddingTop: 25}}>
				<View style={{flex: 1}, {alignSelf: 'baseline'}}>
					<Text style={styles.fixitem} >{stars}</Text>
					<Text style={styles.lightitem} >Stars</Text>
				</View>
				<View style={{flex: 2}, {alignSelf: 'baseline'}}>
					<Text style={styles.fixitem} >{forks}</Text>
					<Text style={styles.lightitem} >Forks</Text>
				</View>
				<View style={{flex: 3}, {alignSelf: 'baseline'}}>
					<Text style={styles.fixitem}>{review}</Text>
					<Text style={styles.lightitem}>Reviews</Text>
				</View>
				<View style={{flex: 4}, {alignSelf: 'baseline'}}>
					<Text style={styles.fixitem} >{rating}</Text>
					<Text style={styles.lightitem} >Rating</Text>
				</View>
			</View>

			<View style={{paddingTop: 15, paddingBottom: 25, paddingLeft: 15, paddingRight: 15 }}>
				{ 
					(hasButton) ? (
					<View style={styles.button}>
					<Pressable onPress={() => { openGithubLink({url}); }}> 
						<Text style={styles.text}>Open In Github</Text>
					</Pressable>
					</View>
					) : null 
				}
			</View>
			

			</Pressable>

		</View>
		
	)
};

export default RepositoryItem;