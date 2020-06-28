import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinearProgress, Link as Mlink } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import * as actions from '../store/actions/user';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { addToast } = useToasts();
	const dispatch = useDispatch();
	const signin = (email, password) => dispatch(actions.signin(email, password));
	const notifyE = useSelector((state) => state.notifyE);
	const notifyM = useSelector((state) => state.notifyM);
	const loading = useSelector((state) => state.loading);
	const click = useSelector((state) => state.click);
	const cleanup = () => dispatch(actions.cleanup());

	useEffect(() => {
		if (notifyE) {
			addToast(notifyE, { appearance: 'error' });
			cleanup();
		}
		if (notifyM) {
			addToast(notifyE, { appearance: 'success' });
			cleanup();
		}
		//console.log(click);
	}, [click]);

	const signinHandler = () => {
		//console.log('signin start');

		if (!email || !password) {
			addToast('Please fill all details', { appearance: 'error' });
			return;
		}

		signin(email, password);
	};

	return (
		<div>
			{loading ? <LinearProgress /> : null}
			<div className='mycard '>
				<div className='card auth-card input-field z-depth-0'>
					<div>
						<h2 style={{ color: '#008cba' }}>Sign In</h2>
					</div>
					<div className='input-field'>
						<input
							id='email'
							className='validate'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label htmlFor='email'>Email</label>
					</div>
					<div className='input-field'>
						<input
							id='password'
							type='password'
							className='validate'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label htmlFor='password'>Password</label>
					</div>
					<button className='button button2' onClick={() => signinHandler()}>
						Sign In
					</button>
					<Mlink>
						<Link to='/signup'>Don't have an account? Sign Up</Link>
					</Mlink>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
