// SignUp.jsx

import React from 'react';

import { View, StyleSheet, Pressable } from 'react-native';

import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';

import * as yup from 'yup';

import theme from './theme';

import Text from './Text';

import { useHistory } from "react-router-dom";

const initialValues = {
  username: '',
  password: '',
  confirmation: ''
};

import useSignUp from '../hooks/useSignUp';

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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username is too short')
    .max(30, 'Username is too long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password is too short')
    .max(50, 'Password is too long')
    .required('Password is required'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {

  const title = "Sign Up";

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
        <FormikTextInput
          name="confirmation"
          placeholder="Password confirmation"
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

const SignUp = () => {

  const [signUp] = useSignUp();

  const [signIn] = useSignIn();

  const history = useHistory();

  const onSubmit = async (values) => {

    console.log('SignUp', values);

    const { username, password, confirmation } = values;

    console.log(username, password, confirmation);

    if (!isNaN(username) && !isNaN(password) && !isNaN(confirmation)) {

      console.log(`Validated ${username}`);
    }

    try {

      const { data } = await signUp({ username, password });

      console.log('SignUp', data);

      if(data && data.createUser) {

        const { data } = await signIn({ username, password });

        console.log('SignIn', data);

        if(data) {

          history.push("/repositories");

        }

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

      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}

    </Formik>
  );

};

export default SignUp;