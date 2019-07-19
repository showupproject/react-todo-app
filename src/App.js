import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import TodoProvider from './context/TodoContext'
import Nav from './components/Nav'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Home from './pages/Home'
import './App.css'

function App() {
	return (
		<Router>
			<TodoProvider>
				<Nav />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/signup" component={SignUp} />
					<Route path="/login" component={LogIn} />
					<Route path="/dashboard" component={Dashboard} />
				</Switch>
			</TodoProvider>
		</Router>
	)
}

export default App
