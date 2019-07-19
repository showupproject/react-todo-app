import React, {useContext} from 'react'
import Form from '../components/Form'
import TodoList from '../components/TodoList'
import {UserContext} from '../context/TodoContext'

const Dashboard = () => {
	const {user} = useContext(UserContext)
	return (
		<React.Fragment>
			<h1>This is the dashboard page</h1>
			{user && <p>welcome {user}</p>}
			<Form />
			<TodoList />
		</React.Fragment>
	)
}

export default Dashboard
