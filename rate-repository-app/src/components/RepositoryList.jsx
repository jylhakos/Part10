// RepositoryList.jsx

import React, { useState, useEffect } from 'react';

import { FlatList, View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

// 10.3
import RepositoryItem from './RepositoryItem';

// 10.11
import useRepositories from '../hooks/useRepositories';

import { useQuery } from '@apollo/client';

// import { GET_AUTHORIZATION, GET_REPOSITORIES } from '../graphql/queries';

// 10.23
// $ npm install @react-native-picker/picker --save

import {Picker} from '@react-native-picker/picker';

import Text from './Text';

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

const RepositoryOrder = ({ selectOrder, setSelectOrder, setOrderBy, setOrderDirection}) => {

  console.log('RepositoryOrder', selectOrder)

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
        <View style={{paddingTop: 5, paddingBottom: 5 }}>
          <Picker 
            style={styles.picker}
            showTickIcon={false}
            selectedValue={selectOrder}
            onValueChange={(value, index) => {setSelectOrder(value); selectState(value)}}
          >
          <Picker.Item label="Latest repositories" value={PickerOrder.LATEST} />
          <Picker.Item label="Highest rated repositories" value={PickerOrder.HIGHEST} />
          <Picker.Item label="Lowest rated repositories" value={PickerOrder.LOWEST} />
          </Picker>
          
        </View>
    )
};

const RepositoryList = () => {

  // 10.1
  // const { repositories } = useRepositories();

  // const authorized = authorizedSignIn();

  // console.log('GET_AUTHORIZATION', authorized);

  const [getRepositories] = useRepositories();

  const [repositories, setRepositories] = useState(null);

  let nodes = [];

  const [orderBy, setOrderBy] = useState(AllRepositoriesOrderBy.CREATED_AT);

  const [orderDirection, setOrderDirection] = useState(OrderDirection.DESC);

  const [selectOrder, setSelectOrder] = useState("latest");

  console.log('orderBy', orderBy, 'orderDirection', orderDirection, 'selectOrder', selectOrder);

  //const { data, error, loading } = useQuery(GET_REPOSITORIES, { variables: {orderBy: 'CREATED_AT', orderDirection: 'DESC'}}, { fetchPolicy: 'cache-and-network'} );

  //console.log('GET_REPOSITORIES', data);

  /*const getRepositores = async () => {

    console.log('getRepositores')

    const { loading, error, data } = await useQuery(GET_REPOSITORIES, { variables: {orderBy: AllRepositoriesOrderBy.CREATED_AT, orderDirection: OrderDirection.DESC}, fetchPolicy: 'cache-and-network'} );

      console.log('GET_REPOSITORIES', loading, error, data);

      if (data && data.repositories) {

        console.log('return', data);

        return data;
      }
  }*/

  const queryRepositories = async () => {

    console.log('queryRepositories', orderBy, orderDirection);

    const variables = {orderBy: orderBy, orderDirection: orderDirection};

    const data = await getRepositories(variables);

    if (data) {

        console.log('queryRepositories', data);

        setRepositories(data);
    }
  }

  queryRepositories();

  if(repositories && repositories.edges) {

    nodes = repositories ? repositories.edges.map(edge => edge.node) : [];

    console.log('nodes', nodes)

  }

	console.log('RepositoryList');

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
    //(authorized && authorized.authorizedUser) ? (
		<FlatList
		data={nodes}
		ItemSeparatorComponent={ItemSeparator}
		renderItem={renderItem}
		keyExtractor={item => item.id}
    ListHeaderComponent={() => <RepositoryOrder selectOrder={selectOrder} setSelectOrder={setSelectOrder} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />}
		/>
    //) : (
    //<View style={styles.container}/>
    //)
	);
};

export default RepositoryList;