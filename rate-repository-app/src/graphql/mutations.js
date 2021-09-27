// mutations.js

import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
  mutation($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
  }
}
`;

/*
mutation {
  authorize(credentials: { username: "arto", password: "password" }) {
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

