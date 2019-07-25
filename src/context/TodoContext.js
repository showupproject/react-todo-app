import React, {createContext} from 'react'
import useTodoState from '../hooks/useTodoState'
import useLocalStorageState from '../hooks/useLocalStorageState'

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
	const [user, setUser] = useLocalStorageState('user', null)
	// useEffect(
	// 	() => {
	// 		axios
	// 			.get('/todos')
	// 			.then((res) => {
	// 				console.log('todos fetched, setting todos state...')
	// 				setTodos(res.data.todos)
	// 			})
	// 			.catch((err) => {
	// 				console.log('fetching todo error')
	// 				console.log(err)
	// 			})
	// 	},
	// 	[user]
	// )

	return (
		<UserContext.Provider
			value={{
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
