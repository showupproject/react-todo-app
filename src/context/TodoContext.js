import React, {useState, createContext} from 'react'
import {useLocalStorageReducer} from '../hooks/useLocalStorageReducer'
import todoReducer from '../reducers/todo.reducer.js'
const defaultTodos = [
	{id: 1, task: 'Mow the lawn using goats', completed: false},
	{id: 2, task: 'Release lady bugs into garden', completed: true}
]
export const TodoContext = createContext()
export const DispatchContext = createContext()
export const UserContext = createContext()

export default function TodosProvider(props) {
	const [todos, dispatch] = useLocalStorageReducer(
		'todos',
		defaultTodos,
		todoReducer
	)
	const [loggedin, setLoggedin] = useState(false)
	const [message, setMessage] = useState(null)
	const [user, setUser] = useState(null)

	return (
		<UserContext.Provider
			value={{
				loggedin,
				setLoggedin,
				message,
				setMessage,
				user,
				setUser
			}}
		>
			<TodoContext.Provider value={todos}>
				<DispatchContext.Provider value={dispatch}>
					{props.children}
				</DispatchContext.Provider>
			</TodoContext.Provider>
		</UserContext.Provider>
	)
}
