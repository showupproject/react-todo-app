import React, {useContext} from 'react'
import useInputState from '../hooks/useInputState'
import {ChangeTodoContext} from '../context/TodoContext'

export default function Form() {
	const [value, handleChange, reset] = useInputState('')
	const {addTodo} = useContext(ChangeTodoContext)
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				addTodo(value)
				//addTodo(value)
				reset()
			}}
		>
			<input type="text" onChange={handleChange} value={value} />
			<button>Add</button>
		</form>
	)
}
