import React, {useContext} from 'react'
import {TodoContext} from '../context/TodoContext'
import useInputState from '../hooks/useInputState'

export default function EditForm({id, task, toggleIsEdit}) {
	const {editTodo} = useContext(TodoContext)
	const [value, handleChange, reset] = useInputState(task)
	const handleCancel = (e) => {
		e.preventDefault()
		toggleIsEdit()
	}
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				editTodo(id, value)
				toggleIsEdit()
				reset()
			}}
		>
			<input type="text" onChange={handleChange} value={value} autoFocus />
			<button>ok</button>
			<button onClick={handleCancel}>cancel</button>
		</form>
	)
}
