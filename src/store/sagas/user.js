import { put, call } from 'redux-saga/effects';
import * as actions from '../actions/user';
import { emailRegex } from '../../regex';
//import M from 'materialize-css';
import React, { useState } from 'react';
import { useToasts, Loading, Spinner } from '@zeit-ui/react';

export function* sagaLogout(action) {
	yield call([localStorage, 'removeItem'], 'jwt');
	yield call([localStorage, 'removeItem'], 'user');
	yield put(actions.logoutSuccess());
}

export function* sagaCheckAuth(action) {
	const token = yield localStorage.getItem('jwt');
	if (!token) {
		yield put(actions.logoutSuccess());
	} else {
		const user = yield JSON.parse(localStorage.getItem('user'));
		const response = { user: user, token: token };
		yield put(actions.checkAuthSuccess(response));
	}
}

const signin = (data) => {
	//console.log('signin start');
	return fetch('http://localhost:5000/signin', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: data.email,
			password: data.password,
		}),
	})
		.then((res) => res.json())
		.then((response) => ({
			response,
		}))
		.catch((error) => ({
			//console.log('error');
			error,
		}));
};

// const Alert = (message) => {
// 	const [toast, setToast] = useToasts('');
// 	setToast({ text: message });
// 	return;
// };

export function* sagaSignin(action) {
	//console.log('start');
	yield put(actions.signinStart());

	const signinData = { email: action.email, password: action.password };

	// if (!emailRegex.test(signinData.email)) {
	// 	if (!signinData.email || !signinData.password) {
	// 		M.toast({ html: 'Please fill all fields', classes: 'red' });
	// 		yield put(actions.signinFail('Please fill all details'));
	// 	} else {
	// 		M.toast({ html: 'Invalid Email', classes: 'red' });
	// 		yield put(actions.signinFail('Invalid Email'));
	// 	}
	// 	//yield put(actions.signinClicked());
	// 	return;
	// }
	//console.log('dispatch');
	const { response, error } = yield call(signin, signinData);
	yield console.log(response.error);
	yield console.log(error);

	if (response.error) {
		//M.toast({ html: response.error, classes: 'red' });
		//yield call(Alert, response.error);
		yield put(actions.signinFail(response.error));
		yield put(actions.signinClicked());
	} else if (error) {
		//M.toast({ html: 'Server is down, try again later', classes: 'red' });
		//yield call(Alert, 'Server is down!');
		yield put(actions.signinFail('Server is down!'));
		yield put(actions.signinClicked());
	} else {
		//M.toast({ html: response.message, classes: 'green' });
		//yield call(Alert, response.message);
		console.log('set item');
		//console.log(response.token, response.user);
		yield localStorage.setItem('jwt', response.token);
		yield localStorage.setItem('user', JSON.stringify(response.user));
		yield put(actions.signinSuccess(response));
		yield put(actions.signinClicked());

		//yield put(actions.follow(response));
	}
	//yield put(actions.signinClicked());
}
