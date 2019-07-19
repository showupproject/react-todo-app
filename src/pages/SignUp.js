import React, {useState} from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import useInputState from '../hooks/useInputState'

function SignUp() {
	const [email, handleEmailChange, resetEmail] = useInputState('')
	const [password, handlePasswordChange, resetPassword] = useInputState('')
	const [message, setMessage] = useState('')
	const [redirectTo, setRedirectTo] = useState(null)
	return redirectTo ? (
		<Redirect to={{pathname: redirectTo}} />
	) : (
		<div>
			<p>This is register page!</p>
			{message && <p>{message}</p>}
			<form
				onSubmit={(e) => {
					e.preventDefault()
					const formData = {email, password}
					axios
						.post('/signup', formData)
						.then((res) => {
							console.log('Data sent!')
							console.log(res)
							resetEmail()
							resetPassword()
							if (res.data.newUser) {
								console.log(res.data)
								//redirect
							} else {
								console.log('sign-up error')
								setMessage('Already registered, please log in.')
								setRedirectTo('/login')
							}
						})
						.catch((err) => {
							console.log('Sign up server error: ')
							console.log(err)
						})
				}}
			>
				<label htmlFor="email">email</label>
				<input
					onChange={handleEmailChange}
					type="email"
					id="email"
					name="email"
					placeholder="Enter Email"
					value={email}
				/>
				<label htmlFor="password">password</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Create Password"
					value={password}
					onChange={handlePasswordChange}
				/>
				<label htmlFor="password2">confirm password</label>
				<input
					type="password"
					id="password2"
					name="password2"
					placeholder="Confirm Password"
				/>
				<button>Register</button>
			</form>
			<p>Have an account?</p>
			<Link to="/login">Log in</Link>
		</div>
	)
}

export default SignUp
