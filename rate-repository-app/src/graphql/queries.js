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

export const GET_AUTHORIZATION = gql`
{
  authorizedUser {
    id
    username
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
{
  authorizedUser {
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



