import React, { useEffect, useRef } from 'react';
import M from 'materialize-css';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions/user';

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
			<nav style={{ backgroundColor: '#008cba', padding: '0px 50px' }}>
				<div className='nav-wrapper'>
					<a href='#!' className='brand-logo'>
						NOTES
					</a>
					{user ? (
						<a href='#' data-target='mobile-demo' className='sidenav-trigger'>
							<i className='material-icons'>menu</i>
						</a>
					) : null}
					<ul className='right hide-on-med-and-down'>
						{user ? (
							<div>
								<li>
									<Link to='/'>My Notes</Link>
								</li>
								<li>
									<Link to='/addnote'>Add Notes</Link>
								</li>
								<li>
									<Link to='/'>Tags</Link>
								</li>
								<li>
									<Link to='/favnotes'>Favourites</Link>
								</li>
								<li>
									<i className='material-icons' onClick={() => logout()}>
										power_settings_new
									</i>
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
				style={{ color: 'blue', backgroundColor: 'blue' }}
			>
				<li>
					<Link
						to='/'
						onClick={() => M.Sidenav.getInstance(respModal.current).close()}
					>
						My Notes
					</Link>
				</li>
				<li>
					<Link
						to='/addnote'
						onClick={() => M.Sidenav.getInstance(respModal.current).close()}
					>
						Add Note
					</Link>
				</li>
				<li>
					<Link
						to='/'
						onClick={() => M.Sidenav.getInstance(respModal.current).close()}
					>
						Tags
					</Link>
				</li>
				<li>
					<Link
						to='/favnotes'
						onClick={() => M.Sidenav.getInstance(respModal.current).close()}
					>
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
						Log Out
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
