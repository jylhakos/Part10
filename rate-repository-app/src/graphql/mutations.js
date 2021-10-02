// mutations.js

import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
  mutation($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
  }
}
`;

export const REVIEW = gql`
  mutation($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
    createReview(review: { repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text }) {
      repositoryId
  }
}
`;

/*
mutation {
  authorize(credentials: { username: "elina", password: "password" }) {
    accessToken
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

type CreateReviewInput {
repositoryName: String!
ownerName: String!
rating: Int!
text: String
}

createReview(
review: CreateReviewInput
): Review


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

*/

