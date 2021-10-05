// SignIn.jsx

// 10.6
import React, { useEffect } from 'react';

import { View, StyleSheet, Pressable } from 'react-native';

// 10.8
// $ npm install --save-dev formik

import { Formik, useField } from 'formik';

import FormikTextInput from './FormikTextInput';

// 10.9
// $ npm install --save-dev yup

// $ npm install babel-loader --save-dev

import * as yup from 'yup';

import theme from './theme';

import Text from './Text';

// 10.15
// $ npm install react-router-dom

import { useHistory } from "react-router-dom";

const initialValues = {
  username: '',
  password: ''
};

// 10.13
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

function Button(props) {

  console.log(props)

  const { title, onPress } = props;

  return (
    <Pressable {...props}>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

// 10.9
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username is too short')
    .required('Username is required'),
  password: yup
    .string()
    .min(1, 'Password is too short')
    .required('Password is required'),
});

const LoginForm = ({ onSubmit }) => {

  //const [userField, userMeta, userHelpers] = useField('username');

  //const [passwordField, passwordMeta,passwordHelpers] = useField('password');

  const title = "Sign In";

  const onPress = "onSubmit";

  return (

    <View style={{marginTop: 10, backgroundColor: 'white', height: '100%'}}>

      <View style={{margin: 10}}>
        <FormikTextInput
          name="username"
          placeholder="Username"
          placeholderTextColor='lightgray'
        />
      </View>

      <View style={{margin: 10}}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          placeholderTextColor='lightgray'
          secureTextEntry={true}
        />
      </View>

      <View style={{margin: 10}}>
        <Button title={title} onPress={onSubmit}></Button>
      </View>

    </View>
  );
};

/*const SignIn = () => {

  const onSubmit = async (values) => {

    const { username, password } = values;

    try {

      const { data } = await signIn({ username, password });

      console.log(data);

    } catch (e) {

      console.log(e);
    }
  };
};*/

const SignIn = () => {

  // 10.13
  const [signIn] = useSignIn();

  // 10.15
  const history = useHistory();

  const onSubmit = async (values) => {

    console.log('SignIn', values);

    const { username, password } = values;

    console.log(username, password);

    if (!isNaN(username) && !isNaN(password) && password !== 0) {

      console.log(`Logged ${username}`);
    }

    try {

      const { data } = await signIn({ username, password });

      console.log('SignIn', data);

      if(data) {

        history.push("/repositories");

      }

    } catch (e) {

      console.log('error', e);

    }
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      validationSchema={validationSchema}>

      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}

    </Formik>
  );

  // return <Text>The sign in view</Text>;
};

export default SignIn;