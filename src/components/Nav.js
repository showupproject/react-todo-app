import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext, DispatchContext} from '../context/TodoContext'

import axios from 'axios'

const Nav = () => {
	const {user, setUser, setLoggedin, setMessage} = useContext(UserContext)
	const dispatch = useContext(DispatchContext)

	const handleClick = (e) => {
		e.preventDefault()
		axios
			.get('/user/logout')
			.then((res) => {
				console.log('logout response: ')
				console.log(res)
				if (res.status === 200) {
					console.log('now user logged out')
					setUser(null)
					setLoggedin(false)
					console.log(res.data)
					dispatch({type: 'SET', payload: null})
					//	setTodos(res.data)
				}
			})
			.catch((err) => {
				console.log('login error')
				console.log(err)
				setMessage("There's error logging out")
			})
	}
	return user ? (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/dashboard">Dashboard</Link>
			<button onClick={handleClick}>Log out</button>
		</nav>
	) : (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/login">Log in</Link>
			<Link to="/signup">Sign up</Link>
		</nav>
	)
}

export default Nav
