import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext, ChangeTodoContext} from '../context/TodoContext'

import axios from 'axios'

const Nav = () => {
	const {user, setUser} = useContext(UserContext)
	const {setTodos} = useContext(ChangeTodoContext)

	const handleClick = (e) => {
		e.preventDefault()
		axios
			.get('/user/logout', {withCredentials: true})
			.then((res) => {
				console.log('logout response: ')
				console.log(res)
				console.log('now user logged out')
				setTodos(null)
				setUser(null)
			})
			.catch((err) => {
				console.log('login error')
				console.log(err)
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
