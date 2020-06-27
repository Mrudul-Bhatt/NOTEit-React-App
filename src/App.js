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

	useEffect(() => {
		//console.log('check auth');
		checkAuth();

		history.push(path);
	}, [path]);

	let routes = (
		<Switch>
			<Route path='/signin' exact component={Signin} />
			<Route path='/signup' exact component={Signup} />
		</Switch>
	);

	if (user) {
		routes = (
			<Switch>
				<Route path='/' exact component={AllNotes} />
				<Route path='/addnote' exact component={AddNote} />
				<Route path='/favnotes' exact component={FavNotes} />
				<Route path='/singlenote/:noteId' exact component={SingleNote} />
				<Route path='/updatenote/:noteId' exact component={UpdateNote} />
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
