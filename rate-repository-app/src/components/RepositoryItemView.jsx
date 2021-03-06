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
        width: 46,
    	height: 46,
    	borderRadius: 46 / 2,
    	overflow: 'hidden',
    	borderWidth: 2,
    	borderColor: '#0366d6',
    	paddingLeft: 2,
    	paddingTop: 2,
    	fontSize: 20,
    	textAlign: 'center',
    	paddingTop: '20%',
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

  	//console.log('review', review, 'review.createdAt', review.createdAt);

  	const date = parseISO(review.createdAt);

	//console.log('date', date);

	const year = date.getUTCFullYear();

	const month = date.getUTCMonth() + 1;

	const day = date.getUTCDate();

	const createdAt = day + '.' + month + '.' + year;

  	return(
  		(review) ? (

  			<View style={{backgroundColor: 'white', padding: 5}}>
  				<View style={{flex: 1, flexDirection: 'row'}}>
					<View style={{flex: 1}, {paddingTop: 15, paddingLeft: 10}}>
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

export const RepositoryItemContainer = ({repository, onEndReached }) => {

	let reviews = []

	if(repository && repository.reviews) {

		//console.log('repository.reviews', repository.reviews);

		reviews = repository.reviews ? repository.reviews.edges.map(edge => edge.node) : [];

	}

	return (
    
		<FlatList
			data={reviews}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ItemSeparatorComponent={ItemSeparator}
			ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
	      	onEndReached={onEndReached}
	      	onEndReachedThreshold={0.5}
	   
	    />
  );
};
  

const RepositoryItemView = () => {

	const { id } = useParams();

	//console.log('RepositoryItemView', id);

  	const variables = {first: 3, id: id};

  	const { repository, fetchMore } = useRepository(variables);

  	//console.log('RepositoryItemView', repository, variables, fetchMore);

  	const onEndReached = () => {

  		//console.log('RepositoryItemView: onEndReached')

    	fetchMore();
  	};

	//console.log('repository', repository);

  	return (
  		(repository) ? (
  			<RepositoryItemContainer
      			repository={repository}
		     	onEndReached={onEndReached}
		    />
	    ) : null
	 );

};

export default RepositoryItemView;
