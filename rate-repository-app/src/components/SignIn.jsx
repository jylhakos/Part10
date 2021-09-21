// SignIn.jsx

// 10.6
import React from 'react';

import { View, StyleSheet, Text, Pressable } from 'react-native';

// 10.8
// $ npm install formik

import { Formik, useField } from 'formik';

import FormikTextInput from './FormikTextInput';

const initialValues = {
  user: '',
  password: ''
};

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
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const LoginForm = ({ onSubmit }) => {

  //const [userField, userMeta, userHelpers] = useField('user');

  //const [passwordField, passwordMeta,passwordHelpers] = useField('password');

  const title = "Sign In";

  const onPress = "onSubmit";

  return (
    <View style={{marginTop: 10}}>

      <View style={{margin: 10}}>
        <FormikTextInput
          name="user"
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

const SignIn = () => {

  const onSubmit = (values) => {

    console.log(values);

    const user = parseFloat(values.user);

    const password = parseFloat(values.password);

    if (!isNaN(user) && !isNaN(password) && password !== 0) {
      console.log(`Logged ${user}`);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );

  // return <Text>The sign in view</Text>;
};

export default SignIn;