// useRepositories

import { useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';

// http://192.168.31.179:5000/api/repositories

import { GET_AUTHORIZATION, GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {

	// 10.11
	const [repositories, setRepositories] = useState();

	const [loading, setLoading] = useState(false);

	const uri = 'http://192.168.31.179:5000/api/repositories';

	const fetchRepositories = async () => {

		setLoading(true);

	    const response = await fetch(uri);
	    
	    const json = await response.json();

	    console.log(json);

	    setLoading(false);

	    console.log(data);

	    setRepositories(data);
	};

	const getRepositories = async (variables) => {

	  	// console.log('getRepositores', variables);

	  	const { loading, error, data } = await useQuery(GET_REPOSITORIES, { variables: variables, fetchPolicy: 'cache-and-network'} );

	  	//const { loading, error, data } = await useQuery(GET_REPOSITORIES, { variables: {orderBy: AllRepositoriesOrderBy.RATING_AVERAGE, orderDirection: OrderDirection.DESC}, fetchPolicy: 'cache-and-network'} );

	    // console.log('GET_REPOSITORIES', loading, error, data);

	    if (data && data.repositories) {

	    	// console.log('data.repositories', data);

	    	return data.repositories;
	    }
  };
 
// 10.11
//useEffect(() => {
//	fetchRepositories();
//}, []);

//return { repositories, loading, refetch: fetchRepositories };

return [getRepositories];

};

export default useRepositories;