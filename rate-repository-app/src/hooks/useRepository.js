// useRepository.js

import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {

	// console.log('useRepository',variables)

	const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORY, { variables: variables, fetchPolicy: 'cache-and-network'} );

  	// console.log('GET_REPOSITORY', loading, data, fetchMore);

	const handleFetchMore = () => {

	    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

	    // console.log('handleFetchMore', canFetchMore, data);

	    if (!canFetchMore) {

	      return;
	    }

	    fetchMore({
	      variables: {
	        after: data.repository.reviews.pageInfo.endCursor,
	        ...variables,
	      },
	    });
  	};

  	return {
    	repository: data?.repository,
    	fetchMore: handleFetchMore,
    	loading,
    	...result,
  	};

}

export default useRepository;