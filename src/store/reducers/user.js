export const initialState = {
	user: null,
	token: null,
	data: [],
	path: '/signin',
	toggle: false,
	loading: false,
	notifyM: null,
	notifyE: null,
	click: false,
};

//pass server error as message on backend in catch block

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		// case 'SIGNUP_START':
		// 	return {
		// 		...state,
		// 		signupClicked: false,
		// 		loading: true,
		// 	};
		// case 'SIGNUP_SUCCESS':
		// 	return {
		// 		...state,
		// 		loading: false,
		// 	};
		// case 'SIGNUP_FAIL':
		// 	return {
		// 		...state,
		// 		loading: false,
		// 	};
		case 'SIGNIN_START':
			return {
				...state,
				loading: true,
				notifyE: null,
				notifyM: null,
			};
		case 'SIGNIN_SUCCESS':
			return {
				...state,
				token: action.token,
				user: action.user,
				loading: false,
				notifyM: action.notify,
				notifyE: null,
				path: '/',
			};
		// case 'TOGGLE_DRAWER':
		// 	return {
		// 		...state,
		// 		toggle: action.value,
		// 	};
		case 'SIGNIN_FAIL':
			return {
				...state,
				loading: false,
				notifyE: action.notify,
				notifyM: null,
			};
		case 'LOGOUT_SUCCESS':
			return {
				...state,
				token: null,
				user: null,
				data: [],
				path: '/signin',
			};

		// case 'FETCH_ALL_START':
		// 	return {
		// 		...state,
		// 		error: null,
		// 		loading: true,
		// 	};
		// case 'FETCH_ALL_SUCCESS':
		// 	return {
		// 		...state,
		// 		data: action.data,
		// 		loading: false,
		// 	};
		// case 'FETCH_ALL_FAIL':
		// 	return {
		// 		...state,
		// 		error: action.error,
		// 		loading: false,
		// 	};
		// case 'CLICKED':
		// 	return {
		// 		...state,
		// 		clicked: !state.clicked,
		// 	};
		case 'SIGNIN_CLICKED':
			return {
				...state,
				click: !state.click,
			};
		case 'CLEANUP':
			return {
				...state,
				notifyE: null,
				notifyM: null,
			};
		// case 'SIGNUP_CLICKED':
		// 	return {
		// 		...state,
		// 		signupClicked: !state.signupClicked,
		// 	};
		// case 'SET_ID':
		// 	return {
		// 		...state,
		// 		modalId: action.id,
		// 	};
		case 'CHECK_AUTH_SUCCESS':
			return {
				...state,
				token: action.token,
				user: action.user,
				path: '/',
			};
		default:
			return state;
	}
};
