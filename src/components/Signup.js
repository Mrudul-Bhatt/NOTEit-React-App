import React, { useState } from 'react';
import { LinearProgress, Link as Mlink } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { emailRegex, baseUrl } from '../utility/helper';

const SignUp = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { addToast } = useToasts();
	const [loader, setLoader] = useState(false);
	const history = useHistory();

	const signup = () => {
		let flag = 0;
		setLoader(true);

		if (!name || !email || !password) {
			addToast('Please fill all details!', { appearance: 'error' });
			setLoader(false);
			return;
		}

		if (!emailRegex.test(email)) {
			addToast('Invalid email!', { appearance: 'error' });
			flag++;
		}
		if (password.length < 6 || password.length > 10) {
			addToast('Password must be [6-10] characters long!', {
				appearance: 'error',
			});
			flag++;
		}
		if (flag !== 0) {
			setLoader(false);
			return;
		}

		fetch(`${baseUrl}/signup`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				//console.log(response);
				if (response.message) {
					addToast(response.message, { appearance: 'success' });
					history.push('/signin');
				} else {
					addToast(response.error, { appearance: 'error' });
				}
				setLoader(false);
			})
			.catch((error) => {
				//console.log(error);
				addToast('Server is down', {
					appearance: 'error',
				});
				setLoader(false);
			});
	};

	return (
		<div>
			{loader ? <LinearProgress style={{ width: '100%' }} /> : null}

			<div className='mycard'>
				<div className='card auth-card input-field z-depth-0'>
					<div>
						<h2 style={{ color: '#008cba' }}>Sign Up</h2>
					</div>
					<div className='input-field'>
						<input
							id='name'
							className='validate'
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<label htmlFor='name'>Name</label>
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
					<button className='button button2' onClick={() => signup()}>
						Sign Up
					</button>
					<Mlink>
						<Link to='/signin'>Already have an account? Sign In</Link>
					</Mlink>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
