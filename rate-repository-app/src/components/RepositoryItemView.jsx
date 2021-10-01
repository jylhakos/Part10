// RepositoryItemView.jsx

import React , { useState } from 'react';

import { useParams } from 'react-router-native';

import { View, StyleSheet, FlatList } from 'react-native';

// 10.20
import { format, parseISO } from 'date-fns'

// $ npm install date-fns --save

import RepositoryItem from './RepositoryItem';

// import { useQuery } from '@apollo/client';

// import { GET_REPOSITORY } from '../graphql/queries';

import useRepository from '../hooks/useRepository';

import Text from './Text';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	item: {
		paddingLeft: 68,
		paddingTop: 10,
		paddingBottom: 10,
		fontSize: 16,
  	},
  	user: {
		paddingLeft: 20,
		paddingTop: 10,
		paddingBottom: 10,
		fontSize: 18,
  	},
  	circle: {
        width: 40,
    	height: 40,
    	borderRadius: 40 / 2,
    	overflow: 'hidden',
    	borderWidth: 2,
    	borderColor: '#0366d6',
    	paddingLeft: 8,
    	paddingTop: 8,
    	fontSize: 18, 
    	color: '#0366d6'
    },
    lightitem: {
		paddingTop: 5,
		paddingLeft: 20,
		fontSize: 18,
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		color: 'grey'
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {

	return (
		(repository) ? (
			<>
  			<RepositoryItem 
					fullName={repository.fullName} 
  					description={repository.description}
  					language={repository.language}
  					forksCount={repository.forksCount}
  					stargazersCount={repository.stargazersCount}
  					ratingAverage={repository.ratingAverage}
  					reviewCount={repository.reviewCount}
              		ownerAvatarUrl={repository.ownerAvatarUrl}
              		url={repository.url}
              		reviews={repository.reviews}
              		hasButton={true}/>
            <View style={styles.separator}/>
            </>
            ) : null

		)
	};

const ReviewItem = ({ review }) => {

  	console.log('review', review, 'review.createdAt', review.createdAt);

  	const date = parseISO(review.createdAt);

	console.log('date', date);

	const year = date.getUTCFullYear();

	const month = date.getUTCMonth();

	const day = date.getUTCDate();

	const createdAt = day + '.' + month + '.' + year;

  	return(
  		(review) ? (

  			<View style={{backgroundColor: 'white', padding: 5}}>
  				<View style={{flex: 1, flexDirection: 'row'}}>
					<View style={{flex: 1}, {alignSelf: 'baseline'}, {paddingTop: 15, paddingLeft: 10}}>
						<Text style={styles.circle}>{review.rating}</Text>
					</View>
					<View style={{flex: 2}, {alignSelf: 'left'}}>
						<Text fontWeight="bold" style={styles.user}>{review.user.username}</Text>
						<Text style={styles.lightitem}>{createdAt}</Text>
					</View>
				</View>
				<View style={{flex: 1}, {flexDirection: 'row'}}>
					<View style={{flex: 1, alignSelf: 'baseline'}}>
						<Text style={styles.item}>{review.text}</Text>
					</View>
				</View>
			</View>
  		) : null
  	);
};

const RepositoryItemView = () => {

	const [repository, setRepository] = useState(null)

	const [useRepositoryQuery] = useRepository();

	const { id } = useParams();

	console.log('RepositoryItemView', id);

	const getQuery = async () => {

		console.log('getQuery', id)

		const data = await useRepositoryQuery({ id });

		if (data) {

    		console.log('getQuery', data);

   			setRepository(data);

   		}
   	}

	getQuery();

	let reviews = []

	if(repository && repository.reviews) {

		console.log('repository.reviews', repository.reviews);

		reviews = repository.reviews ? repository.reviews.edges.map(edge => edge.node) : [];

	}
	

  	return (
  		(repository) ? (
		    <FlatList
		      data={reviews}
		      renderItem={({ item }) => <ReviewItem review={item} />}
		      keyExtractor={({ id }) => id}
		      ItemSeparatorComponent={ItemSeparator}
		      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
		    />
	    ) : null
	 );

};

export default RepositoryItemView;
