// RepositoryForm.test.jsx

import React, { useState } from 'react';

import { Text, TextInput, Pressable, View } from 'react-native';

import { render, fireEvent, waitFor, act, screen } from '@testing-library/react-native';

import userEvent from '@testing-library/user-event';

import * as yup from 'yup';

import { Formik } from 'formik';

// 10.18
// $ npm install --save-dev @testing-library/user-event @testing-library/dom

const Form = ({ onSubmit }) => {

	const [username, setUsername] = useState('');

	const [password, setPassword] = useState('');

	const handleSubmit = () => {

		onSubmit({ username, password });
	};

	return (
		<View>
			<View>
				<TextInput
				value={username}
				onChangeText={(text) => setUsername(text)}
				placeholder="Username"
				testID="usernameField"
				/>

			</View>
				<View>
					<TextInput
					value={password}
					onChangeText={(text) => setPassword(text)}
					placeholder="Password"
					testID="passwordField"
					/>
		</View>
			<View>
				<Pressable onPress={handleSubmit} testID="submitButton">
					<Text>Submit</Text>
				</Pressable>
			</View>
		</View>
		);
	};

describe('Form', () => {

	it('calls function provided by onSubmit prop after pressing the submit button', () => {
		const onSubmit = jest.fn();
		const { getByTestId } = render(<Form onSubmit={onSubmit} />);
		fireEvent.changeText(getByTestId('usernameField'), 'kalle');
		fireEvent.changeText(getByTestId('passwordField'), 'password');
		fireEvent.press(getByTestId('submitButton'));

		expect(onSubmit).toHaveBeenCalledTimes(1);

		// onSubmit.mock.calls[0][0] contains the first argument of the first call
		expect(onSubmit.mock.calls[0][0]).toEqual({
			username: 'kalle',
			password: 'password',
		});
	});
});

const initialValues = {
  username: 'elina',
  password: 'password'
};


const SignInForm = ({ onSubmit }) => {

	const [username, setUsername] = useState('');

	const [password, setPassword] = useState('');

	const title = "Sign In";

	const onPress = "onSubmit";

  	return (

    <View style={{marginTop: 10, backgroundColor: 'white', height: '100%'}}>

      <View style={{margin: 10}}>
        <TextInput
          name="username"
          placeholder="Username"
          placeholderTextColor='lightgray'
          onChangeText={(text) => setUsername(text)}
          testID="usernameField"
        />
      </View>

      <View style={{margin: 10}}>
        <TextInput
          name="password"
          placeholder="Password"
          placeholderTextColor='lightgray'
          onChangeText={(text) => setPassword(text)}
          testID="passwordField"
        />
      </View>

      <View>
      	<Pressable onPress={onSubmit} testID="submitButton">
			<Text>Submit</Text>
		</Pressable>
	  </View>

    </View>
  );
};

const SignInContainer = ({onSubmit}) => {

  return (
    <Formik
    	initialValues={initialValues}
    	onSubmit={onSubmit}>

      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}

    </Formik>
  );

};

// 10.18
describe('SignIn', () => {

	describe('SignInContainer', () => {

		it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
  		// render the SignInContainer component, fill the text inputs and press the submit button

    	const onSubmit = jest.fn();

    	const { debug, getByPlaceholderText, getByText, getByTestId } = render(<SignInContainer onSubmit={onSubmit}/>);

    	// debug();

    	// const username = getByPlaceholderText('Username');

  		// const password = getByPlaceholderText('Password');
  
  		// const submit = getByText('Submit');

    	await waitFor(() => {

    		fireEvent.changeText(getByTestId('usernameField'), 'elina');

    		//fireEvent.changeText(username, 'elina');

  		});

  		await waitFor(() => {

    		fireEvent.changeText(getByTestId('passwordField'), 'password');

    		//fireEvent.changeText(password, 'password');

  		});

  		await waitFor(() => {

    		fireEvent.press(getByTestId('submitButton'));

    		//fireEvent.press(submit);
  		});

			await waitFor(() => {
	    	// expect the onSubmit function to have been called once and with a correct first argument
		    expect(onSubmit.mock.calls[0][0]).toEqual({
					username: 'elina',
					password: 'password',
				});
	    });
    });
  });
});