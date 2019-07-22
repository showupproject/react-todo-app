import React, {useState, createContext} from 'react'
import useTodoState from '../hooks/useTodoState'
const defaultTodos = [
	{id: 1, task: 'Mow the lawn using goats', completed: false},
	{id: 2, task: 'Release lady bugs into garden', completed: true}
]
export const TodoContext = createContext()
export const ChangeTodoContext = createContext()
export const UserContext = createContext()

export default function TodosProvider(props) {
	const {todos, setTodos, addTodo, deleteTodo, editTodo} = useTodoState(
		defaultTodos
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
				<ChangeTodoContext.Provider
					value={{setTodos, addTodo, deleteTodo, editTodo}}
				>
					{props.children}
				</ChangeTodoContext.Provider>
			</TodoContext.Provider>
		</UserContext.Provider>
	)
}
