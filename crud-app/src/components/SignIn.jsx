import React from 'react'
import {  TextField } from '@mui/material'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import getName from '../redux/actions/getName'
import getPassword from '../redux/actions/getPassword'
import { useState } from 'react'
const SignIn = () => {
    const dispatch = useDispatch()
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const myStates = useSelector(state=>state)
    return (
        <div className='signIn' style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <h1 style={{color:'white',fontFamily:'monospace'}}>ACCOUNT LOGIN</h1>
        <form style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onSubmit={(e)=>{
            // e.preventDefault()
            dispatch(getName(name))
            dispatch(getPassword(password))
        }}>
            <TextField style={{margin:'10px',color:'white'}} placeholder='User Name' type='text' required onChange={(e)=>{
                setName(e.target.value)
                }}/>
            <TextField style={{margin:'10px',color:'white'}} placeholder='Password' type='password' required onChange={(e)=>{
                setPassword(e.target.value)
                }}/>
            <Link style={{textDecoration:'none',margin:'10px'}} to={name==='admin'&&password==='admin'?'/Home':'/'}><Button style={{backgroundColor:'blue',color:'white',textDecoration:'none'}} type='submit' onClick={()=>{
                if(name!=='admin'||password!=='admin'){
                    alert('Wrong User Name Or Password')
                }
                dispatch(getName(name))
                dispatch(getPassword(password))
                // console.log('hello')
            }}>Sign In</Button></Link>
        </form>
        </div>
    )
}

export default SignIn
