import React from 'react'
import Home from './components/Home'
import SignIn from './components/SignIn'
import { useSelector } from 'react-redux'
import {
  Routes,
  Route
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const myStates = useSelector(state=>state)
  return (
    <div>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route exact path='/Home' element={<PrivateRoute/>}>
            <Route exact path='/Home' element={<Home/>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default App
