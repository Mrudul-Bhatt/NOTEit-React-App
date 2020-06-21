import { takeEvery, all } from 'redux-saga/effects';

import {
	sagaSignup,
	sagaSignin,
	sagaLogout,
	sagaCheckAuth,
	sagaFetchAll,
	sagaLike,
	sagaUnlike,
	sagaComment,
	sagaDeletePost,
	sagaFetchSubAll,
} from './user';

//ON EVERY CALL TO 'AUTH_CHECK_TIMEOUT' , checkTimeoutSage will get executed
//ACTION TYPES HERE ARE COMPELETELY DIFF FROM ACTION TYPES IN REDUCERS FNS
//THIS IS WATCH SAGA FILE , ACTION TYPES HERE WILL DEFINE WHICH DAGA FN TO EXECUTE
//SAGA FNS ONLY HANDLE ASYNC OPERATIONS

export function* watchSaga() {
	yield all([
		// takeEvery('SIGNUP', sagaSignup),
		takeEvery('SIGNIN', sagaSignin),
		takeEvery('LOGOUT', sagaLogout),
		takeEvery('CHECK_AUTH', sagaCheckAuth),
		// takeEvery('FETCH_ALL', sagaFetchAll),
		// takeEvery('LIKE', sagaLike),
		// takeEvery('UNLIKE', sagaUnlike),
		// takeEvery('COMMENT', sagaComment),
		// takeEvery('DELETE_POST', sagaDeletePost),
		// takeEvery('FETCH_SUB_ALL', sagaFetchSubAll),
	]);
}
