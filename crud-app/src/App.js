import React from 'react'
import Home from './components/Home'
import SignIn from './components/SignIn'
import { useSelector } from 'react-redux'
import {
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const myStates = useSelector(state=>state)
  return (
    <div>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/Home' element={myStates.getNameReducer==='admin'&&myStates.getPasswordReducer==='admin'?<Home />:<SignIn />} />
        </Routes>
    </div>
  )
}

export default App
