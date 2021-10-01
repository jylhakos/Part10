// RepositoryItemView.jsx

import React , { useState } from 'react';

import { useParams } from 'react-router-native';

import { View, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem';

// import { useQuery } from '@apollo/client';

// import { GET_REPOSITORY } from '../graphql/queries';

import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	item: {
		padding: 10,
		fontSize: 16,
  	},
});

const RepositoryItemView = () => {

	const [item, setItem] = useState(null)

	const [useRepositoryQuery] = useRepository();

	const { id } = useParams();

	console.log('RepositoryItemView', id);

	/*const getQuery = async ( ID ) => {

		console.log('getQuery', ID)

		const { loading, error, data } = await useQuery(GET_REPOSITORY, { variables: { id: 'jaredpalmer.formik' }});

  		console.log('GET_REPOSITORY', loading, error, data);

  		if (data && data.repository) {

  			console.log('data.repository', data.repository);

  			return data.repository;
  		}
	}*/

	const getQuery = async () => {

		console.log('getQuery', id)

		const data = await useRepositoryQuery({ id });

		if (data) {

    		console.log('getQuery', data);

   			setItem(data);

   		}
   	}

	getQuery();
	
	return (
			(item) ? (

	  			<RepositoryItem 
						fullName={item.fullName} 
	  					description={item.description}
	  					language={item.language}
	  					forksCount={item.forksCount}
	  					stargazersCount={item.stargazersCount}
	  					ratingAverage={item.ratingAverage}
	  					reviewCount={item.reviewCount}
	              		ownerAvatarUrl={item.ownerAvatarUrl}
	              		url={item.url}
	              		hasButton={true}/>
	            ) : null

    		)

};

export default RepositoryItemView;
