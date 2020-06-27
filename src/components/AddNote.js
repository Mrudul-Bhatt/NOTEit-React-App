import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline } from '@zeit-ui/react';
import { useToasts } from 'react-toast-notifications';
//import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { LinearProgress } from '@material-ui/core';
import ReactQuill from 'react-quill';

//toast.configure();

const AddNote = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [bold, setBold] = useState(false);
	const { addToast } = useToasts();
	const [loader, setLoader] = useState(false);

	const addNote = () => {
		setLoader(true);
		fetch('http://localhost:5000/createnote', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				title,
				body,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				if (response.message) {
					addToast(response.message, { appearance: 'success' });

					setTitle('');
					setBody('');
				} else {
					addToast(response.error, { appearance: 'error' });
				}
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				addToast('Server is down', { appearance: 'error' });

				setLoader(false);
			});
	};

	return (
		<div className='row'>
			{loader ? <LinearProgress style={{ width: '100%' }} /> : null}
			{/* <div className='col s12 '>
					<div className='card blue-grey darken-1'>
						<div className='card-action'>
							<a href='#'>
								<i
									className='material-icons'
									onClick={() => setBold(!bold)}
									style={bold ? { color: 'blue' } : null}
								>
									format_bold
								</i>
							</a>
							<a href='#'>
								<i className='material-icons' style={{ color: 'blue' }}>
									format_bold
								</i>
							</a>
							<a href='#'>
								<i className='material-icons' style={{ color: 'blue' }}>
									format_italic
								</i>
							</a>
						</div>
					</div>
				</div> */}
			<div className='col s12'>
				<div className='row'>
					<div className='input-field col s12'>
						{/* <i className='material-icons prefix'>title</i>
						<br /> */}

						{/* <ReactQuill
							value={title}
							onChange={(val) => setTitle(val)}
							placeholder='Title'
							// readOnly='true'
							// theme='bubble'
						/> */}
						<input
							placeholder='Title'
							id='title'
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						{/* <label htmlFor='title'>Title</label> */}
					</div>
					<div className='input-field col s12'>
						{/* <i className='material-icons prefix'>note</i> */}

						{/* <i className='material-icons prefix'>note</i>
						<textarea
							id='textarea1'
							className='materialize-textarea'
							value={body}
							onChange={(e) => setBody(e.target.value)}
						></textarea>
						<label htmlFor='textarea1'>Take a note...</label> */}
						<ReactQuill
							value={body}
							onChange={(val) => setBody(val)}
							placeholder='Take a note...'

							// readOnly='true'
							// theme='bubble'
						/>
					</div>
					<div className='row' style={{ padding: '10px' }}>
						<div className='col right s4 m2'>
							<button className='button button2' onClick={() => addNote()}>
								+Note
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddNote;

// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import { Link } from 'react-router-dom';
// import { useToasts } from 'react-toast-notifications';
// import { LinearProgress } from '@material-ui/core';

// const AddNote = () => {
// 	const [title, setTitle] = useState('');
// 	const [body, setBody] = useState('');
// 	const { addToast } = useToasts();

// 	return (
// 		<div>
// 			<input
// 				id='title'
// 				type='text'
// 				value={title}
// 				onChange={(e) => setTitle(e.target.value)}
// 			/>
// 			<label htmlFor='title'>Title</label>
// 			<ReactQuill
// 				// readOnly='true'
// 				// theme='bubble'
// 				value={body}
// 				style={{ height: '200px', padding: '30px' }}
// 				onChange={(val) => setBody(val)}
// 			></ReactQuill>
// 			<button onClick={() => addNote()}>+Note</button>
// 		</div>
// 	);
// };

// export default AddNote;
