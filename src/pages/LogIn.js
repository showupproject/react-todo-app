import React, {useState, useContext} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import useInputState from '../hooks/useInputState'
import {DispatchContext, UserContext} from '../context/TodoContext'

const LogIn = () => {
	const [email, handleEmailChange, resetEmail] = useInputState('')
	const [password, handlePasswordChange, resetPassword] = useInputState('')
	const {setLoggedin, setMessage, message, setUser} = useContext(UserContext)
	const dispatch = useContext(DispatchContext)
	const [redirectTo, setRedirectTo] = useState(null)
	return redirectTo ? (
		<Redirect to={{pathname: redirectTo}} />
	) : (
		<div>
			<h1>This is the login page!</h1>
			{message && <p>{message}</p>}
			<form
				onSubmit={(e) => {
					e.preventDefault()
					const formData = {email, password}
					axios
						.post('/user/login', formData)
						.then((res) => {
							console.log('login response: ')
							console.log(res)
							if (res.status === 200) {
								if (res.data) {
									resetEmail()
									resetPassword()
									console.log('now user loggedin')
									setUser(email)
									setLoggedin(true)
									dispatch({type: 'SET', payload: res.data})
									//	setTodos(res.data)
									if (message) {
										setMessage('')
									}
									setRedirectTo('/dashboard')
								} else {
									setMessage('email or password wrong')
								}
							}
						})
						.catch((err) => {
							console.log('login error')
							console.log(err)
							setMessage("There's error logging in")
						})
				}}
			>
				<label htmlFor="email">email</label>
				<input
					type="email"
					value={email}
					onChange={handleEmailChange}
					id="email"
					name="email"
					placeholder="Enter Email"
				/>
				<label htmlFor="password">password</label>
				<input
					type="password"
					value={password}
					onChange={handlePasswordChange}
					id="password"
					name="password"
					placeholder="Enter Password"
				/>
				<button>Login</button>
			</form>
			<p>No account?</p>
		</div>
	)
}
export default LogIn
