// RepositoryList.test.jsx

import React, { useState } from 'react';

import { Text, TextInput, Pressable, View } from 'react-native';

import { render, fireEvent, getAllByTestId } from '@testing-library/react-native';

import { RepositoryListContainer, RepositoryList } from '../../mocks/RepositoryList';

// 10.17
describe('RepositoryList', () => {

	describe('RepositoryListContainer', () => {

		it('renders repository information correctly', () => {

			const repositories = {
				totalCount: 8,
				pageInfo: {
					hasNextPage: true,
					endCursor:'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
					startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
				},
				edges: [
					{
						node: {
							id: 'jaredpalmer.formik',
							fullName: 'jaredpalmer/formik',
							description: 'Build forms in React, without the tears',
							language: 'TypeScript',
							forksCount: 1619,
							stargazersCount: 21856,
							ratingAverage: 88,
							reviewCount: 3,
							ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
						},
						cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
					},
					{
						node: {
							id: 'async-library.react-async',
							fullName: 'async-library/react-async',
							description: 'Flexible promise-based React data loader',
							language: 'JavaScript',
							forksCount: 69,
							stargazersCount: 1760,
							ratingAverage: 72,
							reviewCount: 3,
							ownerAvatarUrl:'https://avatars1.githubusercontent.com/u/54310907?v=4',
					},
						cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
	          		},	
          		],
			};

			const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories}/>);

			debug();

			const results = getAllByTestId('id');

			// expect(results).toHaveLength(2);

			expect(results[0]).toHaveTextContent('jaredpalmer.formik');

			expect(results[0]).toHaveTextContent('jaredpalmer/formik');

			expect(results[0]).toHaveTextContent('Build forms in React, without the tears');

			expect(results[0]).toHaveTextContent('TypeScript');

			expect(results[0]).toHaveTextContent(/1.6k/);

			expect(results[0]).toHaveTextContent(/21.9k/);

			expect(results[0]).toHaveTextContent(/88/);

			expect(results[1]).toHaveTextContent('async-library.react-async');

			expect(results[1]).toHaveTextContent('async-library/react-async');

			expect(results[1]).toHaveTextContent('Flexible promise-based React data loader');

			expect(results[1]).toHaveTextContent('JavaScript');

			expect(results[1]).toHaveTextContent(/69/);

			expect(results[1]).toHaveTextContent(/1.8k/);

			expect(results[1]).toHaveTextContent(/72/);
		});
	});
});