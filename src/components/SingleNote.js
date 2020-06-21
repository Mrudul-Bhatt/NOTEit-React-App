import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

const SingleNote = () => {
	const [note, setNote] = useState(null);
	//const user = useSelector((state) => state.user);
	const { noteId } = useParams();
	const [data, setData] = useState(null);
	const history = useHistory();
	const deleteModal = useRef(null);

	useEffect(() => {
		fetch(`http://localhost:5000/singlenote/${noteId}`, {
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data.mynote);
				setNote(data.mynote);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [noteId]);

	useEffect(() => {
		M.Modal.init(deleteModal.current);
	}, []);

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

	const deleteNote = () => {
		fetch('http://localhost:5000/deletenote', {
			method: 'delete',
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
				history.push('/');
				// if (response.message) {
				// 	addToast(response.message, { appearance: 'success' });
				// }
				// const newData = data.filter((item) => {
				// 	if (item._id !== response.result._id) {
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
		<div>
			<div
				id='modal3'
				className='modal'
				ref={deleteModal}
				style={{ color: 'black' }}
			>
				<div className='modal-content'>
					<h4>Do you want to delete this post?</h4>
					{/* <hr />
					<h5>This action cannot be undone</h5> */}
				</div>

				<div className='modal-footer'>
					<button
						style={{ color: 'blue' }}
						className='modal-close btn-flat'
						onClick={() => {
							M.Modal.getInstance(deleteModal.current).close();
						}}
					>
						Cancel
					</button>
					<button
						style={{ color: 'red' }}
						className='modal-close btn-flat'
						onClick={() => {
							deleteNote();
							M.Modal.getInstance(deleteModal.current).close();
						}}
					>
						Delete
					</button>
				</div>
			</div>
			{note ? (
				<div className='row' style={{ padding: '0px 20px' }}>
					<div className='col s12 m12'>
						<div className='card white darken-1'>
							<div className='card-content black-text'>
								<span className='card-title'>
									<h4>{note.title}</h4>
								</span>
								<hr />
								<h6>{note.body}</h6>
							</div>
							<div
								className='row'
								style={{
									margin: '5px',
									padding: '5px',
								}}
							>
								<div className='col right s3 m2'>
									<Link to={'/updatenote/' + noteId}>
										<i className='material-icons' style={{ color: 'green' }}>
											edit
										</i>
									</Link>
								</div>
								<div className='col right s3 m2'>
									<i
										data-target='modal3'
										className='material-icons modal-trigger'
										style={{ color: 'red' }}
									>
										delete
									</i>
								</div>
								<div className='col right s3 m2'>
									{note.favourite ? (
										<i
											className='material-icons'
											onClick={() => unfavourite()}
											style={{ color: 'yellow' }}
										>
											favorite
										</i>
									) : (
										<i className='material-icons' onClick={() => favourite()}>
											favorite_border
										</i>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default SingleNote;
