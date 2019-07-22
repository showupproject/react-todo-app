import React, {useContext} from 'react'
import {ChangeTodoContext} from '../context/TodoContext'
import EditForm from './EditForm'
import useToggle from '../hooks/useToggle'

export default function TodoItem({id, task}) {
	const {deleteTodo} = useContext(ChangeTodoContext)
	const [isEdit, toggleIsEdit] = useToggle(false)
	return isEdit ? (
		<EditForm id={id} task={task} toggleIsEdit={toggleIsEdit} />
	) : (
		<div>
			<li>{task}</li>
			<button onClick={() => deleteTodo(id)}>delete</button>
			<button onClick={toggleIsEdit}>edit</button>
		</div>
	)
}
