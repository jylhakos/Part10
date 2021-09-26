// apolloClient

// $ npm install @apollo/client graphql

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// 10.12
import Constants from 'expo-constants';

const httpLink = createHttpLink({
	//uri: 'http://192.168.31.219:5000/graphql',
	uri: Constants.manifest.extra.APOLLO_URI
});

const createApolloClient = () => {

	return new ApolloClient({
		link: httpLink,
		cache: new InMemoryCache(),
	});
};

export default createApolloClient;


