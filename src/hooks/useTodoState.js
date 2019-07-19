import {useState} from 'react'
import uuid from 'uuid/v4'
import axios from 'axios'

// const dumbdata = [
// 	{id: 1, task: 'walk the dog', isComplete: false},
// 	{id: 2, task: 'take a walk', isComplete: true}
// ]
export default (initialVal) => {
	const [todos, setTodos] = useState(initialVal)

	const addTodo = (newText) => {
		const newTask = {id: uuid(), task: newText, isComplete: false}
		axios
			.post('/todos', newTask)
			.then((res) => {
				console.log('add an todoItem response: ')
				console.log(res)
				if (res.status === 200) {
					console.log('new todo added')
					setTodos([...todos, newTask])
				}
			})
			.catch((err) => {
				console.log('add todo error')
				console.log(err)
			})
	}

	const deleteTodo = (id) => {
		const newtodos = todos.filter((todo) => todo.id !== id)
		setTodos(newtodos)
	}

	const editTodo = (id, newtask) => {
		const updatedTodos = todos.map(
			(todo) => (todo.id === id ? {...todo, task: newtask} : todo)
		)
		setTodos(updatedTodos)
	}
	return {todos, setTodos, addTodo, deleteTodo, editTodo}
}
