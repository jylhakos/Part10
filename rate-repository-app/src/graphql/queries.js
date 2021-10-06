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

  type Review {
    id: ID!
    user: User!
    repository: Repository!
    userId: String!
    repositoryId: String!
    rating: Int!
    createdAt: DateTime!
    text: String
  }
  type PageInfo {
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
    startCursor: String
    endCursor: String
  }
  type ReviewEdge {
    cursor: String!
    node: Review!
  }
  type ReviewConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [ReviewEdge!]!
  }
  type Repository {
    id: ID!
    ownerName: String!
    name: String!
    user: User!
    createdAt: DateTime!
    fullName: String!
    reviews(first: Int, after: String): ReviewConnection!
    ratingAverage: Int!
    reviewCount: Int!
    stargazersCount: Int
    watchersCount: Int
    forksCount: Int
    openIssuesCount: Int
    url: String
    ownerAvatarUrl: String
    description: String
    language: String
    authorizedUserHasReviewed: Boolean
  }
`;

export const GET_REPOSITORIES = gql`
  query repositories($first: Int, $after: String, $searchKeyword: String, $orderBy:AllRepositoriesOrderBy, $orderDirection:OrderDirection) {
    repositories(first:$first, after:$after, searchKeyword:$searchKeyword, orderBy:$orderBy, orderDirection:$orderDirection) {
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
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      } 
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
        totalCount
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
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
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
  //SEARCH_REPOSITORIES,
  GET_AUTHORIZATION
};

/*export const SEARCH_REPOSITORIES = gql`
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
*/


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
