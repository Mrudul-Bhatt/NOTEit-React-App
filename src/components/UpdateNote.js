import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { Button, LinearProgress } from '@material-ui/core';
import M from 'materialize-css';
import { useToasts } from 'react-toast-notifications';
import ReactQuill from 'react-quill';

const UpdateNote = () => {
	const [note, setNote] = useState(null);
	//const user = useSelector((state) => state.user);
	const { addToast } = useToasts();
	const { noteId } = useParams();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const history = useHistory();
	const deleteModal = useRef(null);
	const [loader, setLoader] = useState(false);

	// useEffect(() => {
	// 	M.updateTextFields();
	// }, []);

	useEffect(() => {
		setLoader(true);
		fetch(`http://localhost:5000/updatenote/${noteId}`, {
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data.mynote);
				setTitle(data.mynote.title);
				setBody(data.mynote.body);
				setNote(data.mynote);
				M.updateTextFields();
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				setLoader(false);
			});
	}, [noteId]);

	const updateNote = () => {
		setLoader(true);
		fetch('http://localhost:5000/updatenote', {
			method: 'put',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				title,
				body,
				noteId,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
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
				console.log(error);
				setLoader(false);
			});
	};

	const favourite = () => {
		fetch('http://localhost:5000/favourite', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				postId: noteId,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				setNote(response.data);
				// const newData = data.map((item) => {
				// 	if (item._id === response.data._id) {
				// 		return response.data;
				// 	} else {
				// 		return item;
				// 	}
				// });

				//setData(newData);
				//setData(response.mynote);
				// if (response.message) {
				// 	addToast(response.message, { appearance: 'success' });
				// 	setTitle('');
				// 	setBody('');
				// } else {
				// 	addToast(response.error, { appearance: 'error' });
				// }
				// setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				// addToast('Server is down', {
				// 	appearance: 'error',
				// });
				// setLoader(false);
			});
	};

	const unfavourite = () => {
		fetch('http://localhost:5000/unfavourite', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				postId: noteId,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				setNote(response.data);

				// const newData = data.map((item) => {
				// 	if (item._id === response.data._id) {
				// 		return response.data;
				// 	} else {
				// 		return item;
				// 	}
				// });

				// setData(newData);
				//setData(response.mynote);
				// if (response.message) {
				// 	addToast(response.message, { appearance: 'success' });
				// 	setTitle('');
				// 	setBody('');
				// } else {
				// 	addToast(response.error, { appearance: 'error' });
				// }
				// setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				// addToast('Server is down', {
				// 	appearance: 'error',
				// });
				// setLoader(false);
			});
	};

	return (
		<>
			{loader ? <LinearProgress style={{ width: '100%' }} /> : null}
			{note ? (
				<div className='row'>
					{/* <div className='col s12 '>
						<div className='card blue-grey darken-1'>
							<div className='card-action'>
								<a href='#'>
									<i className='material-icons' style={{ color: 'blue' }}>
										format_bold
									</i>
								</a>
								<a href='#'>
									<i className='material-icons' style={{ color: 'blue' }}>
										format_bold
									</i>
								</a>
								<a href='#'>
									<i className='material-icons' style={{ color: 'blue' }}>
										format_italic
									</i>
								</a>
							</div>
						</div>
					</div> */}
					<div className='col s12'>
						<div className='row'>
							<div className='input-field col s12'>
								{/* <i className='material-icons prefix'>title</i> */}
								<input
									placeholder='Title'
									id='title'
									type='text'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								{/* <label htmlFor='title'>Title</label> */}
								{/* <ReactQuill value={title} onChange={(val) => setTitle(val)} /> */}
							</div>
							<div className='input-field col s12'>
								<ReactQuill value={body} onChange={(val) => setBody(val)} />
								{/* <i className='material-icons prefix'>note</i>

								<textarea
									id='textarea1'
									className='materialize-textarea'
									value={body}
									onChange={(e) => setBody(e.target.value)}
								></textarea>
								<label htmlFor='textarea1'>Take a note...</label> */}
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
								{/* <div className='col right s4 m2'>
									<button className='button button2'>+Tag</button>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default UpdateNote;
