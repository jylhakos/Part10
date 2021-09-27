// useSignIn

// $ expo install @react-native-async-storage/async-storage

// AuthorizeInput

import { useMutation, useApolloClient } from '@apollo/client'; 

import { AUTHORIZE } from '../graphql/mutations';

import AsyncStorage from '@react-native-async-storage/async-storage';

import useAuthStorage from '../hooks/useAuthStorage';

// 10.13
const useSignIn = () => {

	const authStorage = useAuthStorage();

	const [mutate, result] = useMutation(AUTHORIZE);

	const apolloClient = useApolloClient();

	const signIn = async ({ username, password }) => {

		console.log('signIn', username, password);

		const data = await mutate({ variables: { username: username, password: password } });

		console.log('data', data);

		if (data.data) {

			const access_token = data.data.authorize.accessToken;

			console.log('access_token', access_token);

			await authStorage.setAccessToken(access_token);

			apolloClient.resetStore();
		}

		return data;

	};

	console.log('return', result);

	return [signIn, result];
};

export default useSignIn;