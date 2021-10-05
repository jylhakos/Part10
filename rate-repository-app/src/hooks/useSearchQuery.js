// useSearch.js

import { useQuery } from '@apollo/client';

import { SEARCH_REPOSITORIES } from '../graphql/queries';

const useSearchQuery = () => {

	// console.log('useSearch')

	const searchRepositoryQuery = async ( variables ) => {

		// console.log('searchQuery', keyword)

		const { loading, error, data } = await useQuery(SEARCH_REPOSITORIES, { variables: variables });

  		// console.log('SEARCH_REPOSITORIES', loading, error, data);

  		if (data && data.repositories) {

  			// console.log('data.repositories', data.repositories);

  			return data.repositories;
  		}
	};

	return [searchRepositoryQuery];
};

export default useSearchQuery;