// 10.1

// $ npm install --global expo-cli

// $ expo init rate-repository-app --template expo-template-blank@sdk-40

// 10.2

// $ npm install --save-dev eslint @babel/eslint-parser eslint-plugin-react

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
