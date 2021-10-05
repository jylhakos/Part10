// authStorage.js

// 10.14
// $ expo install @react-native-async-storage/async-storage

import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {

	constructor(namespace = 'auth') {

		this.namespace = namespace;

		console.log('AuthStorage', namespace);
	}

	getAccessToken = async () => {

		const token = await AsyncStorage.getItem(`${this.namespace}:storage`);

		console.log('getAccessToken', token);
		
		return token ? JSON.parse(token) : null;
	}

	setAccessToken = async (accessToken) => {

		console.log('setAccessToken', accessToken);

		await AsyncStorage.setItem(`${this.namespace}:storage`, JSON.stringify(accessToken));
	}

	removeAccessToken = async () => {

		console.log('removeAccessToken');

		await AsyncStorage.removeItem(`${this.namespace}:storage`);
	}
}

export default AuthStorage;