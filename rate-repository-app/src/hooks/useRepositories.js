// useRepositories

// import { useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';

// http://192.168.31.179:5000/api/repositories

import { GET_AUTHORIZATION, GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {

	// console.log('useRepositories', variables);

	const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORIES, { variables: variables, fetchPolicy: 'cache-and-network'} );

	const handleFetchMore = () => {

	    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

	    // console.log('handleFetchMore', canFetchMore, data);

	    if (!canFetchMore) {

	      return;
	    }

	    fetchMore({
	      variables: {
	        after: data.repositories.pageInfo.endCursor,
	        ...variables,
	      },
	    });
  	};

	return {
    	repositories: data?.repositories,
    	fetchMore: handleFetchMore,
    	loading,
    	...result,
  	};

};

export default useRepositories;