import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import M from 'materialize-css';
import { LinearProgress, Divider } from '@material-ui/core';
import { Tooltip, Link as Zlink, Row, Col, Card } from '@zeit-ui/react';
import { baseUrl } from '../utility/helper';

const FavNotes = () => {
	const { addToast } = useToasts();
	const [data, setData] = useState([]);
	const [postid, setId] = useState(null);
	const deleteModal = useRef(null);
	const [loader, setLoader] = useState(false);

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
				const newData = response.mynote.filter((item) => {
					if (item.favourite) {
						return item;
					}
				});
				//console.log(newData);
				if (newData.length === 0) {
					addToast('You have no notes marked as Favourites...', {
						appearance: 'info',
					});
				}
				setData(newData);
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
		M.Modal.init(deleteModal.current);
	}, []);

	const unfavourite = (id) => {
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
				const newData = data.filter((item) => {
					if (item._id !== response.data._id) {
						return item;
					}
				});

				setData(newData);
			})
			.catch((error) => {
				//console.log(error);
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
				id='modal2'
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
							key={item ? item._id : null}
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

								<Divider />

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
													data-target='modal2'
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
											<Tooltip text={'Remove from favourite'}>
												<i
													className='material-icons'
													onClick={() => unfavourite(item._id)}
													style={{ color: 'yellow' }}
												>
													favorite
												</i>
											</Tooltip>
										</Col>
									</Row>
								</Card.Footer>
							</Card>
						</Row>
					);
				})
			) : (
				<div>No Fav</div>
			)}
		</div>
	);
};

export default FavNotes;
