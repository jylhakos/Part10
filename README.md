# React Native

React Native is a framework for developing native Android and iOS applications using JavaScript and React.

## Expo

Expo is a platform that eases the setup, development, building, and deployment of React Native applications.

Expo will automatically reload the application when we make changes to the code.

```

$ npm install --global expo-cli

```
## Metro bundler

The most relevant files are app.json file which contains Expo related configuration and App.js which is the root component of React application.

Running the script npm start starts the Metro bundler which is a JavaScript bundler for React Native.

Let's start the application in a web browser by clicking the Run in Metro bundler at web browser.

We have used the ReactDOM library to build React components into a DOM tree that can be rendered by a browser.

## Using flexbox for layout

Flexbox is a layout entity consisting of two separate components of a flex container and inside it a set of flex items.

## Routing

We can use the entire React router's core, including the hooks and components, but we can't reference pages with URLs and can't navigate back and forth through user's history using the browsers history.

```

$ npm install react-router-native

```

## Form state management

Implementation of forms relies on the state management. 

There are many libraries in the React that ease the state management of forms for example one of these libraries is Formik.

The Formik's context is provided by the Formik component that contains the form's state.

## Communicating with server

React Native provides Fetch API for making HTTP requests by  the applications.

React Native also supports the XMLHttpRequest API which makes it possible to use third-party libraries such as Axios. 

For example the Fetch API can send HTTP requests using the fetch function.

The fetch function returns a promise which resolves a Response object.

A link to Fetch document.

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

![alt text](https://github.com/jylhakos/Part10/blob/main/Part10.png?raw=true)

