// 10.1
// $ npm install --global expo-cli

// $ expo init rate-repository-app --template expo-template-blank@sdk-40

// $ npm install metro-config

// $ npm install react-native-debugger

// $ npm install --save-dev react-native-debugger-open

// $ REACT_DEBUGGER="rndebugger-open --open --port 8081" npm start

// 10.2
// $ npm install --save-dev eslint @babel/eslint-parser eslint-plugin-react

import React from 'react';

//import { StatusBar } from 'expo-status-bar';

//import { StyleSheet, Text, View } from 'react-native';

// 10.6
import { NativeRouter } from 'react-router-native';

// 10.11
import { ApolloProvider } from '@apollo/client';

// 10.3
import Main from './src/components/Main';

import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

//export default function App() {
const App = () => {

  console.log('App')

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
