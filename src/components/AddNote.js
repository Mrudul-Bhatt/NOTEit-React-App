import React, { useState, useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
//import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { LinearProgress } from '@material-ui/core';
import ReactQuill from 'react-quill';
import { baseUrl } from '../utility/helper';
import moment from 'moment';

//toast.configure();

const AddNote = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const { addToast } = useToasts();
	const [loader, setLoader] = useState(false);

	const addNote = () => {
		setLoader(true);
		var date = moment().format('lll').toString();
		fetch(`${baseUrl}/createnote`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				title,
				body,
				date,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				if (response.message) {
					addToast(response.message, { appearance: 'success' });
					setTitle('');
					setBody('');
				} else {
					addToast(response.error, { appearance: 'error' });
				}
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				addToast('Server is down', { appearance: 'error' });
				setLoader(false);
			});
	};

	return (
		<div className='row'>
			{loader ? <LinearProgress style={{ width: '100%' }} /> : null}
			<div className='col s12'>
				<div className='row'>
					<div className='input-field col s12'>
						<input
							placeholder='Title'
							id='title'
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className='input-field col s12'>
						<ReactQuill
							value={body}
							onChange={(val) => setBody(val)}
							placeholder='Take a note...'
						/>
					</div>
					<div className='row' style={{ padding: '10px' }}>
						<div className='col right s4 m2'>
							<button className='button button2' onClick={() => addNote()}>
								+Note
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddNote;
