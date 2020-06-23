import React, { useEffect, useRef } from 'react';
import M from 'materialize-css';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions/user';
import { Tooltip } from '@zeit-ui/react';

const Navbar = () => {
	const respModal = useRef(null);
	const history = useHistory();
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const logout = () => dispatch(actions.logout());
	//M.Sidenav.init(respModal.current);

	useEffect(() => {
		M.Sidenav.init(respModal.current);
	}, []);

	return (
		<div>
			<nav
				style={{
					backgroundColor: '#008cba',
					padding: '0px 50px',
					margin: '0px',
				}}
			>
				<div className='nav-wrapper'>
					<h5
						className='brand-logo'
						style={{ fontFamily: "'Permanent Marker', cursive" }}
					>
						{/*'Gochi Hand', cursive*/}
						NOTE...
					</h5>
					{user ? (
						<a href='#' data-target='mobile-demo' className='sidenav-trigger'>
							<i className='material-icons'>menu</i>
						</a>
					) : null}
					<ul className='right hide-on-med-and-down'>
						{user ? (
							<div>
								<li>
									<Tooltip text={'My notes'}>
										<Link to='/'>
											<i className='material-icons'>note</i>
										</Link>
									</Tooltip>
								</li>
								<li>
									<Tooltip text={'Add note'}>
										<Link to='/addnote'>
											<i className='material-icons'>note_add</i>
										</Link>
									</Tooltip>
								</li>
								{/* <li>
									<Link to='/'>Tags</Link>
								</li> */}
								<li>
									<Tooltip text={'Favourite notes'}>
										<Link to='/favnotes'>
											<i className='material-icons'>favorite</i>
										</Link>
									</Tooltip>
								</li>
								<li>
									<Tooltip text={'Log Out'}>
										<i className='material-icons' onClick={() => logout()}>
											power_settings_new
										</i>
									</Tooltip>
								</li>
							</div>
						) : (
							<div>
								<li>
									<Link to='/signin'>Sign In</Link>
								</li>
								<li>
									<Link to='/signup'>Sign Up</Link>
								</li>
							</div>
						)}
					</ul>
				</div>
			</nav>

			<ul
				className='sidenav'
				id='mobile-demo'
				ref={respModal}
				style={{ background: '#008cba', paddingTop: '40px' }}
			>
				<li>
					<Link
						to='/'
						onClick={() => M.Sidenav.getInstance(respModal.current).close()}
					>
						<i className='material-icons'>note</i>
						My Notes
					</Link>
				</li>
				<li>
					<Link
						to='/addnote'
						onClick={() => M.Sidenav.getInstance(respModal.current).close()}
					>
						<i className='material-icons'>note_add</i>
						Add Note
					</Link>
				</li>
				{/* <li>
					<Link
						to='/'
						onClick={() => M.Sidenav.getInstance(respModal.current).close()}
					>
						Tags
					</Link>
				</li> */}
				<li>
					<Link
						to='/favnotes'
						onClick={() => M.Sidenav.getInstance(respModal.current).close()}
					>
						<i className='material-icons'>favorite</i>
						Favourites
					</Link>
				</li>
				<li>
					<a
						href='#'
						onClick={() => {
							M.Sidenav.getInstance(respModal.current).close();
							logout();
						}}
					>
						<i className='material-icons'>power_settings_new</i>
						Log Out
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
