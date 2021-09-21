// FormikTextInput

import React from 'react';

import { StyleSheet, Text } from 'react-native';

import { useField } from 'formik';

import TextInput from './TextInput';

const styles = StyleSheet.create({
	input: {
		borderColor: "lightgray",
		width: "100%",
		borderWidth: 1,
		borderRadius: 4,
		padding: 15,
		fontSize: 18,
		fontWeight: 'bold',
	},
	errorText: {
		marginTop: 5,
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
			value={field.value}
			error={showError}
			style={styles.input}
			{...props}
			/>

			{showError && <Text style={styles.errorText}>{meta.error}</Text>}
		</>
	);
};

export default FormikTextInput;