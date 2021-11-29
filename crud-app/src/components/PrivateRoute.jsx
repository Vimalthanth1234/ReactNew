import React from 'react'
import {Route,Navigate,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({element,path}) => {
    const myStates = useSelector(state=>state)
    const auth =  myStates.getNameReducer=='admin'&&myStates.getPasswordReducer=='admin'?true:false
    return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute
