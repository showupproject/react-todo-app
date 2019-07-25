import React, {useState, useContext} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import useInputState from '../hooks/useInputState'
import {UserContext, ChangeTodoContext} from '../context/TodoContext'

const LogIn = () => {
	const [email, handleEmailChange, resetEmail] = useInputState('')
	const [password, handlePasswordChange, resetPassword] = useInputState('')
	const {setUser} = useContext(UserContext)
	const {setTodos} = useContext(ChangeTodoContext)
	const [redirectTo, setRedirectTo] = useState(null)
	return redirectTo ? (
		<Redirect to={{pathname: redirectTo}} />
	) : (
		<div>
			<h1>This is the login page!</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					const formData = {email, password}
					axios
						.post('/user/login', formData, {
							withCredentials: true
						})
						.then((res) => {
							console.log('login response: ')
							console.log(res)
							if (res.status === 200) {
								if (res.data) {
									resetEmail()
									resetPassword()
									console.log('now user loggedin')
									setUser(email)
									setTodos(res.data)
									setRedirectTo('/dashboard')
								}
							}
						})
						.catch((err) => {
							console.log('login error')
							console.log(err)
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
