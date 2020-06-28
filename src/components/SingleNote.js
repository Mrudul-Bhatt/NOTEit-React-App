import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import { Row, Card, Divider, Col, Tooltip, Spinner } from '@zeit-ui/react';
import { LinearProgress } from '@material-ui/core';
import ReactQuill from 'react-quill';
import { useToasts } from 'react-toast-notifications';
import { baseUrl } from '../utility/helper';

const SingleNote = () => {
	const { addToast } = useToasts();
	const [note, setNote] = useState(null);
	const { noteId } = useParams();
	const history = useHistory();
	const deleteModal = useRef(null);
	const [loader, setLoader] = useState(false);
	const [likeLoader, setLikeLoader] = useState(false);

	useEffect(() => {
		setLoader(true);
		fetch(`${baseUrl}/singlenote/${noteId}`, {
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		})
			.then((res) => res.json())
			.then((data) => {
				//console.log(data.mynote);
				setNote(data.mynote);
				setLoader(false);
			})
			.catch((error) => {
				//console.log(error);
				setLoader(false);
			});
	}, [noteId]);

	useEffect(() => {
		M.Modal.init(deleteModal.current);
	}, []);

	const favourite = () => {
		setLikeLoader(true);
		fetch(`${baseUrl}/favourite`, {
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
				//console.log(response);
				setNote(response.data);
				setLikeLoader(false);
			})
			.catch((error) => {
				//console.log(error);
				setLikeLoader(false);

				addToast('Server is down', {
					appearance: 'error',
				});
			});
	};

	const unfavourite = () => {
		setLikeLoader(true);

		fetch(`${baseUrl}/unfavourite`, {
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
				//console.log(response);
				setNote(response.data);
				setLikeLoader(false);
			})
			.catch((error) => {
				//console.log(error);
				setLikeLoader(false);

				addToast('Server is down', {
					appearance: 'error',
				});
			});
	};

	const deleteNote = () => {
		fetch(`${baseUrl}/deletenote`, {
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
				//console.log(response);
				history.push('/');
			})
			.catch((error) => {
				//console.log(error);
				addToast('Server is down', {
					appearance: 'error',
				});
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
						Delete this note?
					</h4>
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

						<ReactQuill value={note.body} readOnly={true} theme='bubble' />
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
											{likeLoader ? (
												<Spinner />
											) : (
												<i
													className='material-icons'
													onClick={() => unfavourite()}
													style={{ color: 'yellow' }}
												>
													favorite
												</i>
											)}
										</Tooltip>
									) : (
										<Tooltip text={'Add to favourite'}>
											{likeLoader ? (
												<Spinner />
											) : (
												<i
													className='material-icons'
													onClick={() => favourite()}
												>
													favorite_border
												</i>
											)}
										</Tooltip>
									)}
								</Col>
							</Row>
						</Card.Footer>
					</Card>
				</Row>
			) : null}
		</div>
	);
};

export default SingleNote;
