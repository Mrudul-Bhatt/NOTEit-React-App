import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import * as actions from '../store/actions/user';
import M from 'materialize-css';
import { LinearProgress, Divider } from '@material-ui/core';
import {
	Tooltip,
	Link as Zlink,
	Row,
	Col,
	Card,
	Spinner,
} from '@zeit-ui/react';
import { baseUrl } from '../utility/helper';

const AllNotes = () => {
	const dispatch = useDispatch();
	const { addToast } = useToasts();
	const [postid, setId] = useState(null);
	const deleteModal = useRef(null);
	const notifyE = useSelector((state) => state.notifyE);
	const notifyM = useSelector((state) => state.notifyM);
	const click = useSelector((state) => state.click);
	const cleanup = () => dispatch(actions.cleanup());
	const [data, setData] = useState([]);
	const [loader, setLoader] = useState(false);
	const [likeLoader, setLikeLoader] = useState(false);
	const [likeLoaderId, setLikeLoaderId] = useState(null);

	useEffect(() => {
		setLoader(true);
		fetch(`${baseUrl}/mynotes`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		})
			.then((res) => res.json())
			.then((response) => {
				//console.log(response);
				setData(response.mynote);
				if (response.mynote.length === 0) {
					addToast("You haven't created any notes yet...", {
						appearance: 'info',
					});
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
	}, []);

	useEffect(() => {
		if (notifyE) {
			addToast(notifyE, { appearance: 'error' });
			cleanup();
		}
		if (notifyM) {
			addToast('Signin Success', { appearance: 'success' });
			cleanup();
		}
		//console.log(click);
	}, [click]);

	useEffect(() => {
		M.Modal.init(deleteModal.current);
	}, []);

	const favourite = (id) => {
		setLikeLoaderId(id);
		setLikeLoader(true);
		fetch(`${baseUrl}/favourite`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				postId: id,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				//console.log(response);
				const newData = data.map((item) => {
					if (item._id === response.data._id) {
						return response.data;
					} else {
						return item;
					}
				});

				setData(newData);
				setLikeLoader(false);
				setLikeLoaderId(null);
			})
			.catch((error) => {
				//console.log(error);
				setLikeLoader(false);
				setLikeLoaderId(null);

				addToast('Server is down', {
					appearance: 'error',
				});
			});
	};

	const unfavourite = (id) => {
		setLikeLoaderId(id);
		setLikeLoader(true);

		fetch(`${baseUrl}/unfavourite`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				postId: id,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				//console.log(response);
				const newData = data.map((item) => {
					if (item._id === response.data._id) {
						return response.data;
					} else {
						return item;
					}
				});
				setData(newData);
				setLikeLoader(false);
				setLikeLoaderId(null);
			})
			.catch((error) => {
				//console.log(error);
				setLikeLoader(false);
				setLikeLoaderId(null);
				addToast('Server is down', {
					appearance: 'error',
				});
			});
	};

	const deleteNote = (id) => {
		fetch(`${baseUrl}/deletenote`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				postId: id,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				//console.log(response);
				if (response.message) {
					addToast(response.message, { appearance: 'success' });
					const newData = data.filter((item) => {
						if (item._id !== response.result._id) {
							return item;
						}
					});

					setData(newData);
				} else {
					addToast('Server is down', { appearance: 'error' });
				}
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
				id='modal1'
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
							setId(null);
							M.Modal.getInstance(deleteModal.current).close();
						}}
					>
						Cancel
					</button>
					<button
						style={{ color: 'red' }}
						className='modal-close btn-flat'
						onClick={() => {
							deleteNote(postid);
							M.Modal.getInstance(deleteModal.current).close();
						}}
					>
						Delete
					</button>
				</div>
			</div>

			{data ? (
				data.map((item) => {
					return (
						<Row
							style={{ flexWrap: 'wrap', padding: '20px', width: '100%' }}
							justify='space-around'
							key={item._id}
						>
							<Card width='100%'>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-around',
										justifyItems: 'space-around',
									}}
								>
									<div style={{ display: 'flex' }}>
										<Tooltip text={'Created at'}>
											<i className='material-icons' style={{ color: 'blue' }}>
												access_time
											</i>
										</Tooltip>
										{item.dateCreated}
									</div>
									<div style={{ display: 'flex' }}>
										<Tooltip text={'Last updated'}>
											<i className='material-icons' style={{ color: 'green' }}>
												update
											</i>
										</Tooltip>
										{item.dateUpdated}
									</div>
								</div>
								<Divider />
								<h4
									style={{
										wordBreak: 'break-word',
										fontFamily: "'Sriracha', cursive",
										textAlign: 'center',
									}}
								>
									<Zlink color underline>
										<Link to={'/singlenote/' + item._id}>
											{item.title.length > 12
												? item.title.substring(0, 12) + '...'
												: item.title}
										</Link>
									</Zlink>
								</h4>

								<Card.Footer>
									<Row
										align='middle'
										style={{
											padding: '10px',
											textAlign: 'center',
											alignContent: 'center',
											alignItems: 'center',
											alignSelf: 'center',
										}}
									>
										<Col>
											<Tooltip text={'Edit note'}>
												<Link to={'/updatenote/' + item._id}>
													<i
														className='material-icons'
														style={{ color: 'green' }}
													>
														edit
													</i>
												</Link>
											</Tooltip>
										</Col>

										<Col>
											<Tooltip text={'Delete note'}>
												<i
													data-target='modal1'
													className='material-icons modal-trigger'
													style={{ color: 'red' }}
													onClick={() => {
														setId(item._id);
													}}
												>
													delete
												</i>
											</Tooltip>
										</Col>
										<Col>
											{item.favourite ? (
												<Tooltip text={'Remove from favourite'}>
													{likeLoader && item._id === likeLoaderId ? (
														<Spinner />
													) : (
														<i
															className='material-icons'
															onClick={() => unfavourite(item._id)}
															style={{ color: 'yellow' }}
														>
															favorite
														</i>
													)}
												</Tooltip>
											) : (
												<Tooltip text={'Add to favourite'}>
													{likeLoader && item._id === likeLoaderId ? (
														<Spinner />
													) : (
														<i
															className='material-icons'
															onClick={() => favourite(item._id)}
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
					);
				})
			) : (
				<h1>You Have No Notes Yet!</h1>
			)}
		</div>
	);
};

export default AllNotes;
