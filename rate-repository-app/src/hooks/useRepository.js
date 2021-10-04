// useRepository.js

import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = () => {

	// console.log('useRepository')

	const repositoryQuery = async ( param ) => {

		// console.log('repositoryQuery', param.id)

		const { loading, error, data } = await useQuery(GET_REPOSITORY, { fetchPolicy: 'cache-and-network', variables: { id: param.id }});

  		// console.log('GET_REPOSITORY', loading, error, data);

  		if (data && data.repository) {

  			// console.log('data.repository', data.repository);

  			return data.repository;
  		}
	}

	return [repositoryQuery];
}

export default useRepository;