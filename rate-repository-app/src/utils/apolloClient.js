// apolloClient

// $ npm install @apollo/client graphql

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
	uri: 'http://192.168.31.219:5000/graphql',
});

const createApolloClient = () => {

	return new ApolloClient({
		link: httpLink,
		cache: new InMemoryCache(),
	});
};

export default createApolloClient;

