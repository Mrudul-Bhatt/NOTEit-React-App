import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import {
	Row,
	Card,
	Link as ZLink,
	Divider,
	Col,
	Tooltip,
} from '@zeit-ui/react';
import { LinearProgress } from '@material-ui/core';

const SingleNote = () => {
	const [note, setNote] = useState(null);
	//const user = useSelector((state) => state.user);
	const { noteId } = useParams();
	const [data, setData] = useState(null);
	const history = useHistory();
	const deleteModal = useRef(null);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		setLoader(true);
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
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				setLoader(false);
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
			{loader ? <LinearProgress style={{ width: '100%' }} /> : null}
			<div
				id='modal3'
				className='modal'
				ref={deleteModal}
				style={{ color: 'black' }}
			>
				<div className='modal-content'>
					<h4 style={{ fontFamily: "'Lato', sans-serif" }}>
						Do you want to delete this note?
					</h4>
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
				<Row
					style={{ flexWrap: 'wrap', padding: '20px', width: '100%' }}
					justify='space-around'
				>
					<Card width='100%'>
						<h4
							style={{
								wordBreak: 'break-word',
								fontFamily: "'Sriracha', cursive",
								textAlign: 'center',
							}}
						>
							{note.title}
						</h4>
						<Divider />
						<h5
							style={{
								wordBreak: 'break-word',
								fontFamily: "'Lato', sans-serif",
							}}
						>
							{note.body}
						</h5>
						<Card.Footer>
							<Row style={{ padding: '10px' }}>
								<Col>
									<Tooltip text={'Edit note'}>
										<Link to={'/updatenote/' + noteId}>
											<i className='material-icons' style={{ color: 'green' }}>
												edit
											</i>
										</Link>
									</Tooltip>
								</Col>

								<Col>
									<Tooltip text={'Delete note'}>
										<i
											data-target='modal3'
											className='material-icons modal-trigger'
											style={{ color: 'red' }}
										>
											delete
										</i>
									</Tooltip>
								</Col>
								<Col>
									{note.favourite ? (
										<Tooltip text={'Remove from favourite'}>
											<i
												className='material-icons'
												onClick={() => unfavourite()}
												style={{ color: 'yellow' }}
											>
												favorite
											</i>
										</Tooltip>
									) : (
										<Tooltip text={'Add to favourite'}>
											<i className='material-icons' onClick={() => favourite()}>
												favorite_border
											</i>
										</Tooltip>
									)}
								</Col>
							</Row>

							{/* <ZLink
								color
								target='_blank'
								href='https://github.com/zeit-ui/react'
							>
								Visit source code on GitHub.
							</ZLink> */}
						</Card.Footer>
					</Card>
				</Row>
			) : // <div className='row'>
			// 	<div className='col s12 m12'>
			// 		<div className='card white darken-1 z-depth-3'>
			// 			<div className='card-content black-text'>
			// 				<span
			// 					className='card-title'
			// 					style={{
			// 						fontFamily: "'Sriracha', cursive",
			// 					}}
			// 				>
			// 					{note.title}
			// 				</span>

			// 				<p
			// 					style={{
			// 						fontFamily: "'Lato', sans-serif",
			// 					}}
			// 				>
			// 					{note.body}
			// 				</p>
			// 			</div>
			// 			<div className='card-action'>
			// 				<div
			// 					className='row'
			// 					style={{
			// 						margin: '5px',
			// 						padding: '5px',
			// 					}}
			// 				>
			// 					<div className='col right s3 m2'>
			// 						<Link to={'/updatenote/' + noteId}>
			// 							<i className='material-icons' style={{ color: 'green' }}>
			// 								edit
			// 							</i>
			// 						</Link>
			// 					</div>
			// 					<div className='col right s3 m2'>
			// 						<i
			// 							data-target='modal3'
			// 							className='material-icons modal-trigger'
			// 							style={{ color: 'red' }}
			// 						>
			// 							delete
			// 						</i>
			// 					</div>
			// 					<div className='col right s3 m2'>
			// 						{note.favourite ? (
			// 							<i
			// 								className='material-icons'
			// 								onClick={() => unfavourite()}
			// 								style={{ color: 'yellow' }}
			// 							>
			// 								favorite
			// 							</i>
			// 						) : (
			// 							<i className='material-icons' onClick={() => favourite()}>
			// 								favorite_border
			// 							</i>
			// 						)}
			// 					</div>
			// 				</div>
			// 			</div>
			// 		</div>
			// 	</div>
			// </div>
			null}
		</div>
	);
};

export default SingleNote;
