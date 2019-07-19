import React, {useContext} from 'react'
import {TodoContext} from '../context/TodoContext'
import TodoItem from './TodoItem'

export default function TodoList() {
	const todos = useContext(TodoContext)
	if (!todos) return null
	return (
		<React.Fragment>
			{todos.map((todo) => (
				<TodoItem key={todo.id} id={todo.id} task={todo.task} />
			))}
		</React.Fragment>
	)
}
