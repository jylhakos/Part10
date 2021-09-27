// apolloClient

// $ npm install @apollo/client graphql

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// 10.12
import Constants from 'expo-constants';

// 10.15
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	//uri: 'http://192.168.31.179:5000/graphql',
	uri: Constants.manifest.extra.APOLLO_URI
});

/*
const createApolloClient = () => {

	return new ApolloClient({
		link: httpLink,
		cache: new InMemoryCache(),
	});
};
*/

const createApolloClient = (authStorage) => {

	const authLink = setContext(async (_, { headers }) => {

		try {

			const accessToken = await authStorage.getAccessToken();

			console.log('accessToken', accessToken);

			return {
				headers: {
					...headers,
					authorization: accessToken ? `Bearer ${accessToken}` : '',
				},
			};
		} catch (e) {
			console.log(e);
			return {
				headers,
			};
		}
	});

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});
};

export default createApolloClient;


