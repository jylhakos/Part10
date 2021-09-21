// FormikTextInput

import React from 'react';

import { StyleSheet } from 'react-native';

import { useField } from 'formik';

import Text from './Text';

import TextInput from './TextInput';

const styles = StyleSheet.create({
	inputText: {
		width: '100%',
		borderWidth: 1,
		borderRadius: 4,
		padding: 15,
		fontSize: 18,
		fontWeight: 'bold',
		borderColor: 'lightgray',
		backgroundColor: 'white'
	},
	errorText: {
		marginTop: 5,
		fontSize: 18,
		color: '#d73a4a'
	},
});

const FormikTextInput = ({ name, ...props }) => {

	const [field, meta, helpers] = useField(name);

	const showError = meta.touched && meta.error;

	return (
		<>
			<TextInput
			onChangeText={value => helpers.setValue(value)}
			onBlur={() => helpers.setTouched(true)}
			//onFocus={() => setFocus(true)}
			value={field.value}
			error={showError}
			style={[styles.inputText, { borderColor: !(meta.touched && meta.error) ? 'lightgray' : '#d73a4a' }]}
			{...props}
			/>

			{showError && <Text style={styles.errorText}>{meta.error}</Text>}
		</>
	);
};

export default FormikTextInput;