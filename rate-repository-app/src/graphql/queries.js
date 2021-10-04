// queries.js

import { gql } from '@apollo/client';

export const typeDefs = gql`
  enum AllRepositoriesOrderBy {
      CREATED_AT
      RATING_AVERAGE
  }
  enum OrderDirection {
      ASC
      DESC
  }
`;

export const GET_REPOSITORIES = gql`
  query repositories($orderBy:AllRepositoriesOrderBy, $orderDirection:OrderDirection) {
    repositories(orderBy:$orderBy, orderDirection:$orderDirection) {
      edges {
        node {
          id
          name
          fullName
          description
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          url
          ownerAvatarUrl
          language
          createdAt
        }
      } 
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      id
      name
      fullName
      description
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      url
      ownerAvatarUrl
      language
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_REPOSITORIES = gql`
  query repositories($searchKeyword: String!) {
    repositories(searchKeyword:$searchKeyword) {
      edges {
        node {
          id
          name
          fullName
          description
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          url
          ownerAvatarUrl
          language
          createdAt
        }
      } 
    }
  }
`;

export const GET_AUTHORIZATION = gql`
  {
    authorizedUser {
      id
      username
    }
  }
`;

export default {
  GET_REPOSITORIES,
  GET_REPOSITORY,
  SEARCH_REPOSITORIES,
  GET_AUTHORIZATION
};

/* query {
    repositories(orderBy:CREATED_AT, orderDirection:ASC) {
      edges {
        node {
          id
          name
          fullName
          description
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          url
          ownerAvatarUrl
          language
          createdAt
        }
      } 
    }
  }
*/

/*
mutation {
  authorize(credentials: { username: username, password: password }) {
    accessToken
  }
}
*/

/*
{
  authorizedUser {
    id
    username
  }
}
*/

/*
mutation {
  createUser(user: { username: "username", password: "password" }) {
    id
    username
  }
}
*/

/*
{
  "Authorization": "Bearer <ACCESS_TOKEN>"
}
*/
