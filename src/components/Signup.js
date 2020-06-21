import React, { useState } from 'react';

//import { LockOutlinedIcon } from '@material-ui/icons';
import { LinearProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
//import { useToasts, Loading, Spinner } from '@zeit-ui/react';
import { useToasts } from 'react-toast-notifications';
import { emailRegex } from '../regex';

const SignUp = () => {
	//const classes = useStyles();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { addToast } = useToasts();
	const [loader, setLoader] = useState(false);

	const signup = () => {
		//console.log('signin start');
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

		fetch('http://localhost:5000/signup', {
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
				console.log(response);
				if (response.message) {
					addToast(response.message, { appearance: 'success' });
				} else {
					addToast(response.error, { appearance: 'error' });
				}
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				addToast('Server is down', {
					appearance: 'error',
				});
				setLoader(false);
			});
	};

	return (
		<div>
			{loader ? <LinearProgress /> : null}

			<div className='mycard'>
				<div className='card auth-card input-field'>
					<div>
						<i className='medium material-icons'>account_circle</i>
						<h2 style={{ color: '#008cba' }}>Sign Up</h2>
					</div>
					<div className='input-field'>
						<input
							id='name'
							className='validate'
							type='text'
							//placeholder='Email'
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
							//placeholder='Email'
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
							//placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label htmlFor='password'>Password</label>
					</div>
					<button className='button button2' onClick={() => signup()}>
						Sign Up
					</button>
					<div
						style={{
							color: '#008cba',
							backgroundColor: '#008cba',
							padding: '10px',
						}}
					>
						<Link to='/signin'>Already have an account? Sign In</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
