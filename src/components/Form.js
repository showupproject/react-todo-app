import React, {useContext} from 'react'
import useInputState from '../hooks/useInputState'
import {DispatchContext} from '../context/TodoContext'

export default function Form() {
	const [value, handleChange, reset] = useInputState('')
	const dispatch = useContext(DispatchContext)
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				dispatch({type: 'ADD', task: value})
				//addTodo(value)
				reset()
			}}
		>
			<input type="text" onChange={handleChange} value={value} />
			<button>Add</button>
		</form>
	)
}
