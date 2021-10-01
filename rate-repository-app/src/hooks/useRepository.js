// useRepository.js

import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = () => {

	console.log('useRepository')

	const useRepositoryQuery = async ( param ) => {

		console.log('useRepositoryQuery', param.id)

		const { loading, error, data } = await useQuery(GET_REPOSITORY, { variables: { id: param.id }});

  		console.log('GET_REPOSITORY', loading, error, data);

  		if (data && data.repository) {

  			console.log('data.repository', data.repository);

  			return data.repository;
  		}
	}

	return [useRepositoryQuery];
}

export default useRepository;