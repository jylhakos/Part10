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

// 10.12
import Constants from 'expo-constants';

// 10.3
import Main from './src/components/Main';

import createApolloClient from './src/utils/apolloClient';

// 10.15
import AuthStorage from './src/utils/authStorage';

import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();

//const apolloClient = createApolloClient();

const apolloClient = createApolloClient(authStorage);

//export default function App() {
const App = () => {

  console.log('App', Constants.manifest, Constants.manifest.extra);

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
