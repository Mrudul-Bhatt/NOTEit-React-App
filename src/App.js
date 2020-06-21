import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Switch, useHistory } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './store/actions/user';
import AddNote from './components/AddNote';
import AllNotes from './components/AllNotes';
import FavNotes from './components/FavNotes';
import SingleNote from './components/SingleNote';
import UpdateNote from './components/UpdateNote';

const App = () => {
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem('user'));
	const path = useSelector((state) => state.path);
	const dispatch = useDispatch();
	const checkAuth = () => dispatch(actions.checkAuth());
	console.log(user);

	useEffect(() => {
		console.log('check auth');
		checkAuth();

		history.push(path);

		console.log(user);
		console.log(path);
	}, [path]);

	let routes = (
		<Switch>
			<Route path='/signin' component={Signin} />
			<Route path='/signup' component={Signup} />
		</Switch>
	);

	if (user) {
		routes = (
			<Switch>
				<Route path='/' exact component={AllNotes} />
				<Route path='/addnote' component={AddNote} />
				<Route path='/favnotes' component={FavNotes} />
				<Route path='/singlenote/:noteId' component={SingleNote} />
				<Route path='/updatenote/:noteId' component={UpdateNote} />
			</Switch>
		);
	}

	return (
		<div>
			<Navbar />
			{routes}
		</div>
	);
};

export default App;
