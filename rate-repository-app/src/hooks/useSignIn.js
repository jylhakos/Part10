// useSignIn

// $ expo install @react-native-async-storage/async-storage

// AuthorizeInput

import { useMutation } from '@apollo/client'; 

import { AUTHORIZE } from '../graphql/mutations';

import AsyncStorage from '@react-native-async-storage/async-storage';

// 10.13
const useSignIn = () => {

	const [mutate, result] = useMutation(AUTHORIZE);

	const signIn = async ({ username, password }) => {

		console.log('signIn', username, password)

		const data = await mutate({ variables: { username: username, password: password } });

		console.log('data', data);

		return data;

	};

	console.log('return', result);

	return [signIn, result];
};

export default useSignIn;