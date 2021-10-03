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
  GET_AUTHORIZATION
};

/* query {
    repositories(orderBy:RATING_AVERAGE, orderDirection:ASC) {
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
        }
      } 
    }
  }
*/

/*
query {
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
        }
      } 
    }
  }
*/

/*
query {
    repositories(first:30) {
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

/*
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0N2ZlMTNlYS04YTJlLTQ3NjgtYjEyYS03YmQzNzg0MTNkM2YiLCJpYXQiOjE2MzI3Mjc2NjgsImV4cCI6MjIzNzUyNzY2OCwic3ViIjoiYWNjZXNzVG9rZW4ifQ.BDuWRwWAenRYl4BDmpKYke0vskptaRjb6f8IGNxNIGY"
}
*/

/*
{
  "data": {
    "authorizedUser": {
      "id": "47fe13ea-8a2e-4768-b12a-7bd378413d3f",
      "username": "elina"
    }
  }
}
*/



