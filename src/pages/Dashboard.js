import React, {useContext, useEffect} from 'react'
import Form from '../components/Form'
import TodoList from '../components/TodoList'
import {UserContext} from '../context/TodoContext'
import {Redirect} from 'react-router-dom'

const Dashboard = () => {
	const {user} = useContext(UserContext)
	useEffect(() => {
		document.title = 'Dashboard'
	})
	return user ? (
		<div>
			<h1>This is dashboard page</h1>
			<p>welcome {user}</p>
			<Form />
			<TodoList />
		</div>
	) : (
		<Redirect to={{pathname: '/'}} />
	)
}

export default Dashboard
