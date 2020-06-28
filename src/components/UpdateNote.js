import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { LinearProgress } from '@material-ui/core';
import M from 'materialize-css';
import { useToasts } from 'react-toast-notifications';
import ReactQuill from 'react-quill';
import { baseUrl } from '../utility/helper';
import moment from 'moment';

const UpdateNote = () => {
	const [note, setNote] = useState(null);
	const { addToast } = useToasts();
	const { noteId } = useParams();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		setLoader(true);
		fetch(`${baseUrl}/updatenote/${noteId}`, {
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		})
			.then((res) => res.json())
			.then((data) => {
				//console.log(data.mynote);
				setTitle(data.mynote.title);
				setBody(data.mynote.body);
				setNote(data.mynote);
				M.updateTextFields();
				setLoader(false);
			})
			.catch((error) => {
				//console.log(error);
				setLoader(false);
			});
	}, [noteId]);

	const updateNote = () => {
		setLoader(true);
		var date = moment().format('lll').toString();
		fetch(`${baseUrl}/updatenote`, {
			method: 'put',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				title,
				body,
				date,
				noteId,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				//console.log(response);
				if (response.message) {
					setTitle(response.data.title);
					setBody(response.data.body);
					setNote(response.data);
					addToast(response.message, { appearance: 'success' });
				} else {
					addToast(response.error, { appearance: 'error' });
				}
				setLoader(false);
			})
			.catch((error) => {
				//console.log(error);
				setLoader(false);
			});
	};

	return (
		<>
			{loader ? <LinearProgress style={{ width: '100%' }} /> : null}
			{note ? (
				<div className='row'>
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
								<ReactQuill value={body} onChange={(val) => setBody(val)} />
							</div>
							<div className='row' style={{ padding: '10px' }}>
								<div className='col right s4 m2'>
									<button
										className='button button2'
										onClick={() => updateNote()}
									>
										^Note
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default UpdateNote;
