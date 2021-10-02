// useSignUp

import { useMutation, useApolloClient } from '@apollo/client'; 

import { SIGNUP } from '../graphql/mutations';

const useSignUp = () => {

	const [mutate, result] = useMutation(SIGNUP);

	const signUp = async ({ username, password }) => {

		console.log('signUp', username, password);

		const data = await mutate({ variables: { username: username, password: password }});

		console.log('signUp', data);

		return data;

	};

	console.log('return', result);

	return [signUp, result];
};

export default useSignUp;