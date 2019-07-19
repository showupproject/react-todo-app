import uuid from 'uuid/v4'
import axios from 'axios'
const reducer = (state, action) => {
	switch (action.type) {
		case 'SET':
			return action.payload
		case 'ADD':
			let newtask = {id: uuid(), task: action.task, completed: false}
			axios
				.post('/todos', newtask)
				.then((res) => {
					console.log('new todo added: ' + newtask)
					console.log(res)
					return [...state, newtask]
				})
				.catch((err) => {
					console.log('login error')
					console.log(err)
				})

		case 'REMOVE':
			return state.filter((todo) => todo.id !== action.id)
		case 'TOGGLE':
			return state.map(
				(todo) =>
					todo.id === action.id ? {...todo, completed: !todo.completed} : todo
			)
		case 'EDIT':
			return state.map(
				(todo) =>
					todo.id === action.id ? {...todo, task: action.newTask} : todo
			)
		default:
			return state
	}
}
export default reducer
