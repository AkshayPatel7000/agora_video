import React from "react"
import Dashboard from "./components/Dashboard"
import { Route, Routes } from 'react-router-dom';
import Signup from './components/signup'
import Signin from "./components/signin";
import VideoCall from "./components/videoCall";

function App() {
	return (
		<>
			{/* <Dashboard/> */}
			<Routes>
				<Route exact path="/" element={<Signup/>}/>
				<Route exact path="/Signin" element={<Signin/>}/>
				<Route exact path="/dashboard" element={<Dashboard />} />
				<Route exact path="/videoCall" element={<VideoCall />} />
			</Routes>
		</>
	)
}

export default App
