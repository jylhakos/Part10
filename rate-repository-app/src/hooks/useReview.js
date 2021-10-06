// useReview.js

import { useMutation } from '@apollo/client'; 

import { REVIEW } from '../graphql/mutations';

// 10.21
const useReview = () => {

	const [mutate, result] = useMutation(REVIEW);

	const review = async ({ repositoryName, ownerName, rating, text }) => {

		// console.log('review', repositoryName, ownerName, rating, text);

		const data = await mutate({ variables: { repositoryName: repositoryName, ownerName: ownerName, rating: rating, text: text }});

		//if (data) {

			// console.log('data', data);

		//}

		return data;

	};

	// console.log('return', result);

	return [review, result];
}

export default useReview

