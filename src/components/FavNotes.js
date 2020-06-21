import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
//import { useToasts, Loading, Spinner, Button } from '@zeit-ui/react';
import { useToasts } from 'react-toast-notifications';
import * as actions from '../store/actions/user';
import M from 'materialize-css';

const FavNotes = () => {
	const dispatch = useDispatch();
	const { addToast } = useToasts();
	const notifyE = useSelector((state) => state.notifyE);
	const notifyM = useSelector((state) => state.notifyM);
	const click = useSelector((state) => state.click);
	const cleanup = () => dispatch(actions.cleanup());
	const [data, setData] = useState([]);
	const [postid, setId] = useState(null);
	const deleteModal = useRef(null);

	useEffect(() => {
		//setLoader(true);
		fetch('http://localhost:5000/mynotes', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				const newData = response.mynote.filter((item) => {
					if (item.favourite) {
						return item;
					}
				});
				console.log(newData);
				if (newData.length === 0) {
					addToast('You have no notes marked as Favourites...', {
						appearance: 'info',
					});
				}
				setData(newData);
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
	}, []);

	useEffect(() => {
		M.Modal.init(deleteModal.current);
	}, []);

	const unfavourite = (id) => {
		fetch('http://localhost:5000/unfavourite', {
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
				console.log(response);
				const newData = data.filter((item) => {
					if (item._id !== response.data._id) {
						return item;
					}
				});

				setData(newData);
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

	const deleteNote = (id) => {
		fetch('http://localhost:5000/deletenote', {
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
				console.log(response);
				if (response.message) {
					addToast(response.message, { appearance: 'success' });
				}
				const newData = data.filter((item) => {
					if (item._id !== response.result._id) {
						return item;
					}
				});

				setData(newData);
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
				id='modal2'
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
						<div
							className='col s12 '
							style={{ padding: '0px 40px' }}
							key={item ? item._id : null}
						>
							<div className='card white darken-1'>
								<div className='card-content black-text'>
									<span className='card-title'>{item ? item.title : null}</span>
									<p>{item ? item.body : null}</p>
								</div>
								{/* <div className='card-action'> */}
								<div
									className='row'
									style={{
										margin: '5px',
										padding: '5px',
									}}
								>
									<div className='col right s3 m2'>
										{/* <button className='button button2'>View</button> */}
										<Link to={'/singlenote/' + item._id}>
											<i className='material-icons' style={{ color: 'blue' }}>
												visibility
											</i>
										</Link>
									</div>
									<div className='col right s3 m2'>
										{/* <button className='button button2'>Update</button> */}
										<Link to={'/updatenote/' + item._id}>
											<i className='material-icons' style={{ color: 'green' }}>
												edit
											</i>
										</Link>
									</div>
									<div className='col right s3 m2'>
										{/* <button className='button button2' style={{}}>
											Delete
										</button> */}
										{/* <i className='material-icons' style={{ color: 'red' }}>
											delete
										</i> */}
										<i
											data-target='modal2'
											className='material-icons modal-trigger'
											onClick={() => {
												setId(item._id);
											}}
											style={{ color: 'red' }}
										>
											delete
										</i>
									</div>
									<div className='col right s3 m2'>
										{/* <button className='button button2'  onClick={() => favourite(item._id)} >Fav</button> */}

										<i
											className='material-icons'
											onClick={() => unfavourite(item._id)}
											style={{ color: 'yellow' }}
										>
											favorite
										</i>
									</div>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<div>No Fav</div>
			)}
		</div>
	);
};

export default FavNotes;