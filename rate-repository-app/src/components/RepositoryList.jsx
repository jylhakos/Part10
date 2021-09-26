// RepositoryList

import React, { useState, useEffect } from 'react';

import { FlatList, View, StyleSheet } from 'react-native';

// 10.3
import RepositoryItem from './RepositoryItem';

// 10.11
//import useRepositories from '../hooks/useRepositories';

import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	item: {
		padding: 10,
		fontSize: 16,
  },
});

/*
const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];
*/

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  // const { repositories } = useRepositories();

  const { data, error, loading } = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network'} );

  console.log(data);

  //const nodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  const nodes = data ? data.repositories.edges.map(edge => edge.node) : [];

	console.log('RepositoryList');

	const renderItem = ({ item }) => (
		<RepositoryItem fullName={item.fullName} 
						description={item.description}
						language={item.language}
						forksCount={item.forksCount}
						stargazersCount={item.stargazersCount}
						ratingAverage={item.ratingAverage}
						reviewCount={item.reviewCount}
            ownerAvatarUrl={item.ownerAvatarUrl}/>
	);

	return (
		<FlatList
		data={nodes}
		ItemSeparatorComponent={ItemSeparator}
		renderItem={renderItem}
		keyExtractor={item => item.id}
		// other props
		/>
	);
};

export default RepositoryList;