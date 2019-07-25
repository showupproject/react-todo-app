import React, {useEffect} from 'react'

const Home = () => {
	useEffect(() => {
		document.title = 'Home'
	})
	return (
		<div className="App">
			<h1>This is an awesome react passport Todo App</h1>

			<p>Welcome to the organized world.</p>
			<h1>This is the home page</h1>
		</div>
	)
}

export default Home
