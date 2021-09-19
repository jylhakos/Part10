// 10.1

// $ npm install --global expo-cli

// $ expo init rate-repository-app --template expo-template-blank@sdk-40

// $ npm install metro-config

// $ npm instal react-native-debugger

// $ npm i --save-dev react-native-debugger-open

// $ REACT_DEBUGGER="rndebugger-open --open --port 8081" npm start

// 10.2

// $ npm install --save-dev eslint @babel/eslint-parser eslint-plugin-react

import React from 'react';

//import { StatusBar } from 'expo-status-bar';

//import { StyleSheet, Text, View } from 'react-native';

// 10.3
import Main from './src/components/Main';

//export default function App() {
const App = () => {

  console.log('App')

  return (

    <Main />

    //<View style={styles.container}>
    //  <Text>Open up App.js to start working on your app!</Text>
    //  <StatusBar style="auto" />
    //</View>
  );

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: '#fff',
//    alignItems: 'center',
//    justifyContent: 'center',
//  },

};

export default App;
