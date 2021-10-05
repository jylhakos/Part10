// RepositoryList.jsx

import React, { useState, useEffect, useRef } from 'react';

import { FlatList, View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

// 10.3
import RepositoryItem from './RepositoryItem';

// 10.11
import useRepositories from '../hooks/useRepositories';

// import { useQuery } from '@apollo/client';

// import { GET_AUTHORIZATION, GET_REPOSITORIES } from '../graphql/queries';

// 10.23
// $ npm install @react-native-picker/picker --save

import {Picker} from '@react-native-picker/picker';

import Text from './Text';

// 10.24
// $ npm install react-native-paper --save

import { Searchbar } from 'react-native-paper';

// import useSearchQuery from '../hooks/useSearchQuery';

// $ npm install use-debounce --save

import { useDebounce, useDebouncedCallback } from 'use-debounce';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	item: {
		padding: 10,
		fontSize: 16,
  },
  picker: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 18,
    fontFamily: 'Roboto',
    borderWidth: 0,
    backgroundColor : '#e1e4e8'
  },
});

const PickerOrder = {
  LATEST: 'LATEST',
  HIGHEST: 'HIGHEST',
  LOWEST: 'LOWEST'
 };

const OrderDirection = {
  ASC: 'ASC',
  DESC: 'DESC'
};

const AllRepositoriesOrderBy = {
  CREATED_AT: 'CREATED_AT',
  RATING_AVERAGE: 'RATING_AVERAGE'
};

const ItemSeparator = () => <View style={styles.separator} />;

function authorizedSignIn() {

  const {loading, error, data } = useQuery(GET_AUTHORIZATION);

  console.log('authorizedSignIn', data);

  return data;
}

const SearchBar = ({ searchKeyword, setSearchKeyword }) => {

  const input = useRef(null);

  useEffect(() => {

    if (input.current != null && searchKeyword) {

      input.current.focus();

    }

  }, [searchKeyword]);

  // const [value] = useDebounce(searchKeyword, 500);

  const debounced = useDebouncedCallback(

    (value) => {

      setSearchKeyword(value);

      //setHook('search');
    },

    250

  );

  const onChangeSearch = (value) => { debounced(value) };

  return (
    <View style={{paddingTop: 15, paddingBottom: 5, paddingLeft: 25, paddingRight: 25 }}>
      <Searchbar
        ref={input}
        key={"searchbar"}
        autoFocus={false}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchKeyword}
      />
    </View>
  );
};

const RepositoryOrder = ({ selectOrder, setSelectOrder, setOrderBy, setOrderDirection, setHook }) => {

  // console.log('RepositoryOrder', selectOrder)

  const selectState = (value) => {

    switch(value) {
      case PickerOrder.LATEST:
        setOrderBy(AllRepositoriesOrderBy.CREATED_AT);
        setOrderDirection(OrderDirection.DESC);
        break;
      case PickerOrder.HIGHEST:
        setOrderBy(AllRepositoriesOrderBy.RATING_AVERAGE);
        setOrderDirection(OrderDirection.DESC);
        break;
      case PickerOrder.LOWEST:
        setOrderBy(AllRepositoriesOrderBy.RATING_AVERAGE);
        setOrderDirection(OrderDirection.ASC);
        break;
      default:
        setOrderBy(AllRepositoriesOrderBy.CREATED_AT);
    }

  }

  return (
        <View style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
          <Picker 
            style={styles.picker}
            showtickicon="false"
            selectedValue={selectOrder}
            onValueChange={(value, index) => {setSelectOrder(value); selectState(value); }}
          >
          <Picker.Item label="Latest repositories" value={PickerOrder.LATEST} />
          <Picker.Item label="Highest rated repositories" value={PickerOrder.HIGHEST} />
          <Picker.Item label="Lowest rated repositories" value={PickerOrder.LOWEST} />
          </Picker>
          
        </View>
    )
};

export const RepositoryListContainer = ({repositories, searchKeyword, setSearchKeyword, selectOrder, setSelectOrder, setOrderBy, setOrderDirection, onEndReached }) => {
  
  const repositoryNodes = (repositories && repositories.edges) ? repositories.edges.map((edge) => edge.node) : [];

  console.log('repositoryNodes', repositoryNodes);

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
      ownerAvatarUrl={item.ownerAvatarUrl}
      url={item.url}
      hasButton={false}/>
    
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => 
        <>
        <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
        <RepositoryOrder selectOrder={selectOrder} setSelectOrder={setSelectOrder} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />
        </>
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
   
    />
  );
};


const RepositoryList = () => {

  const [searchKeyword, setSearchKeyword] = useState('');

  //const [searchRepositoryQuery] = useSearchQuery();

  const [orderBy, setOrderBy] = useState(AllRepositoriesOrderBy.CREATED_AT);

  const [orderDirection, setOrderDirection] = useState(OrderDirection.DESC);

  const [selectOrder, setSelectOrder] = useState("latest");

  console.log('query', searchKeyword, orderBy, orderDirection);

  const variables = {first: 8, searchKeyword: searchKeyword, orderBy: orderBy, orderDirection: orderDirection};

  const { repositories, fetchMore } = useRepositories(variables);

  console.log('query', repositories, variables, fetchMore);

  const onEndReach = () => {

    fetchMore();
  };

  
  console.log('repositories', repositories);

	return (
    (repositories) ? (
    <RepositoryListContainer
      repositories={repositories}
      searchKeyword={searchKeyword} 
      setSearchKeyword={setSearchKeyword}
      selectOrder={selectOrder} 
      setSelectOrder={setSelectOrder} 
      setOrderBy={setOrderBy} 
      setOrderDirection={setOrderDirection}
      onEndReach={onEndReach}
    />
    ) : null
 
	);
};

export default RepositoryList;