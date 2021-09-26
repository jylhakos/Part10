// queries.js

import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
query {
    repository (id:"zeit.swr")
    {
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
*/
