// RepositoryListMock.jsx

import React from 'react';

import { FlatList } from 'react-native';

import useRepositories from '../hooks/useRepositories';

import RepositoryItem from '../components/RepositoryItem';

export const RepositoryListContainer = ({ repositories }) => {

  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  const renderItem = ({ item }) => (
    <RepositoryItem
            id={item.id}
            fullName={item.fullName}
            description={item.description}
            language={item.language}
            forksCount={item.forksCount}
            stargazersCount={item.stargazersCount}
            ratingAverage={item.ratingAverage}
            reviewCount={item.reviewCount}
            ownerAvatarUrl={item.ownerAvatarUrl}/>
  );

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      // ...
    />
  );
};

const RepositoryList = () => {

  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;