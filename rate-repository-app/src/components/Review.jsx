// Review.jsx

import React, { useEffect } from 'react';

import { View, StyleSheet, Pressable } from 'react-native';

import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';

import * as yup from 'yup';

import theme from './theme';

import Text from './Text';

import { useHistory } from "react-router-dom";

import useReview from '../hooks/useReview';

const initialValues = {
  repositoryName: '',
  ownerName: '',
  ratingStr: 0,
  text: ''
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
    <Pressable {...props}>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .min(1, 'repository name is too short')
    .required('repositoryName is required'),
  ownerName: yup
    .string()
    .min(1, 'owner name is too short')
    .required('ownerName is required'),
  ratingStr: yup
    .number()
    .min(0, 'rating is too small')
    .max(100, 'rating is too big')
    .required('rating is required'),
  text: yup
  	.string()
    .notRequired(),
});

const ReviewForm = ({ onSubmit }) => {

  const title = "Review";

  const onPress = "onSubmit";

  return (

    <View style={{marginTop: 10, backgroundColor: 'white', height: '100%'}}>

      <View style={{margin: 10}}>
        <FormikTextInput
          name="repositoryName"
          placeholder="Repository Name"
          placeholderTextColor='lightgray'
        />
      </View>

      <View style={{margin: 10}}>
        <FormikTextInput
          name="ownerName"
          placeholder="Owner Name"
          placeholderTextColor='lightgray'
        />
      </View>

      <View style={{margin: 10}}>

      	<FormikTextInput
          name="ratingStr"
          placeholder="Rating"
          type="number"
          keyboardType = 'numeric'
        />
        
      </View>

      <View style={{margin: 10}}>
        <FormikTextInput
          name="text"
          placeholder="Text"
          placeholderTextColor='lightgray'
          multiline={true}
          numberOfLines={3}
        />
      </View>

      <View style={{margin: 10}}>
        <Button title={title} onPress={onSubmit}></Button>
      </View>

    </View>
  );
};

const Review = () => {

	const [review] = useReview();

	const history = useHistory();

	const onSubmit = async (values) => {

    	const { repositoryName, ownerName, ratingStr, text} = values;

    	const rating = parseInt(ratingStr);

    	console.log('Review', repositoryName, ownerName, rating, text);

    	if (!isNaN(repositoryName) && !isNaN(ownerName) && !isNaN(rating)) {

      		console.log('validated');
    	}

    	try {

      		const { data } = await review({ repositoryName, ownerName, rating, text });

      		console.log('Review', data);

      		if(data.createReview.repositoryId) {

      			const id = data.createReview.repositoryId;

      			console.log('id', id);

      			history.push(`/repository/${id}`);

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

      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}

    </Formik>
  );

};

export default Review;