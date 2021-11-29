import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import getData from '../redux/actions/getData';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { BeatLoader } from 'react-spinners';
import isOpen from '../redux/actions/isOpen';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import getName from '../redux/actions/getName';
import getPassword from '../redux/actions/getPassword';
const Home = () => {

    const dispatch = useDispatch()
    const myStates = useSelector(state => state)
    const [input, setInput] = useState('')
    const [id, setId] = useState('')
    const [add, setAdd] = useState(false)
    const [callAdd, setCallAdd] = useState(false)
    const [delUrl, setDelUrl] = useState('')
    const [fName, setfName] = useState('')
    const [LName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [newId, setNewId] = useState('')
    const [title, setTitle] = useState('')
    const [picture, setPicture] = useState('')
    const [edit, setEdit] = useState(false)
    const [callEdit, setCallEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'aqua',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius:'20px',
        p: 4,
    };
    useEffect(() => {
        const fetchData = async () => {
            const url = id ? `https://dummyapi.io/data/v1/user/${id}` : 'https://dummyapi.io/data/v1/user/?limit=35'
            if (delUrl) {
                await axios.delete(`https://dummyapi.io/data/v1/user/${delUrl}`)
                setLoading(true)
                setDelUrl('')
            }
            if (callAdd) {
                await axios.post('https://dummyapi.io/data/v1/user/create', {
                    'firstName': fName,
                    'lastName': LName,
                    'email': email,
                    'title': title,
                    'picture': picture
                })
                setLoading(true)
                setCallAdd(false)
            }
            if (callEdit) {
                await axios.put(`https://dummyapi.io/data/v1/user/${newId}`, { 'title': title, 'firstName': fName, 'lastName': LName, 'picture': picture })
                setLoading(true)
                setCallEdit(false)
            }
            setLoading(true)
            const res = await axios.get(url, {
            })
            console.log(res.data)
            const data = id ? res : res.data
            dispatch(getData(data))
            setLoading(false)
        }
        fetchData()
    }, [id, delUrl, callAdd, callEdit])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div>
            <form style={{ margin: '20px' }} onSubmit={(e) => {
                e.preventDefault()
                setId(input)
            }}>
                <TextField placeholder='Search By Id' size='small' onChange={(e) => {
                    setInput(e.target.value)
                }} required value={input} />
                <Button style={{margin:'0 10px'}} type='submit'>Search</Button>
            </form>
            </div>
            <Button variant="text" onClick={() => setAdd(!add)}>Add User</Button>
            <div>
                <Table style={{margin:"5rem 0",boxShadow:'5px 10px #888888'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Tilte</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Picture</TableCell>
                            <TableCell>View</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {id ? <TableRow>
                            <TableCell>{myStates.getDataReducer.id}</TableCell>
                            <TableCell>{myStates.getDataReducer.title}</TableCell>
                            <TableCell>{myStates.getDataReducer.firstName}</TableCell>
                            <TableCell>{myStates.getDataReducer.lastName}</TableCell>
                            <TableCell><img src={myStates.getDataReducer.picture} width='100px' height='100px' alt /></TableCell>
                            <TableCell><RemoveRedEyeIcon style={{cursor:'pointer'}} onClick={() => {
                                    dispatch(isOpen(true))
                                    setNewId(myStates.getDataReducer.id)
                                    setfName(myStates.getDataReducer.firstName)
                                    setLName(myStates.getDataReducer.lastName)
                                    setTitle(myStates.getDataReducer.title)
                                    setPicture(myStates.getDataReducer.picture)
                                }}>See JSON</RemoveRedEyeIcon></TableCell>
                        </TableRow> : myStates.getDataReducer.map((ele) => {
                            return <TableRow>
                                <TableCell>{ele.id}</TableCell>
                                <TableCell>{ele.title}</TableCell>
                                <TableCell>{ele.firstName}</TableCell>
                                <TableCell>{ele.lastName}</TableCell>
                                <TableCell><img src={ele.picture} alt='user Image' width='100px' height='100px' /></TableCell>
                                <TableCell><RemoveRedEyeIcon style={{ cursor: 'pointer' }} onClick={() => {
                                    dispatch(isOpen(true))
                                    setNewId(ele.id)
                                    setfName(ele.firstName)
                                    setLName(ele.lastName)
                                    setTitle(ele.title)
                                    setPicture(ele.picture)
                                }}>See JSON</RemoveRedEyeIcon></TableCell>
                                <TableCell><DeleteIcon style={{ cursor: 'pointer' }} variant="contained" onClick={() => {
                                    setDelUrl(ele.id)
                                    setLoading(true)
                                }}>Delete</DeleteIcon></TableCell>
                                <TableCell><EditIcon onClick={() => {
                                    setEdit(true)
                                    setNewId(ele.id)
                                    setfName(ele.firstName)
                                    setLName(ele.lastName)
                                    setTitle(ele.title)
                                    setPicture(ele.picture)
                                }} style={{ cursor: 'pointer' }}>Edit</EditIcon></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                <Modal
                    open={myStates.isOpenReducer}
                    onClose={() => dispatch(isOpen(false))}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <img src={picture} height='300px' width='300px'/>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {fName} {LName}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Id:- {newId}
                        </Typography>
                        <Button onClick={() => dispatch(isOpen(false))}>Close</Button>
                    </Box>
                </Modal>
                <Modal
                    open={add}
                    onClose={() => setAdd(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            setCallAdd(true)
                            setAdd(false)
                        }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <h2>Add User Form</h2>
                            <div>
                                <TextField label='First Name' style={{margin:'10px 0'}} placeholder='First Name' name='fName' required onChange={(e) => {
                                    setfName(e.target.value)
                                }} type='text' />
                                <TextField label='Last Name' style={{margin:'10px 0'}} placeholder='Last Name' name='lName' required onChange={(e) => {
                                    setLName(e.target.value)
                                }} type='text' />
                                <TextField label='email' style={{margin:'10px 0'}} placeholder='Email' name='email' required onChange={(e) => {
                                    setEmail(e.target.value)
                                }} type='email' />
                            </div>
                            <div>
                                <TextField label='Title' style={{margin:'10px 0'}} placeholder='Title' name='Title' onChange={(e) => {
                                    setTitle(e.target.value)
                                }} type='text' required />
                                <TextField label='Picture' style={{margin:'10px 0'}} placeholder='Picture' name='Picture' onChange={(e) => {
                                    setPicture(e.target.value)
                                }} type='url' required />
                            </div>
                            <Button style={{margin:'10px 0'}} type='submit'>Add User</Button>
                        </form>
                        <Button onClick={() => setAdd(false)}>Close</Button>
                    </Box>
                </Modal>
                <Modal
                    open={edit}
                    onClose={() => setEdit(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <form onSubmit={(e) => {
                e.preventDefault()
                setCallEdit(true)
                setEdit(false)
                setLoading(true)
            }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h2>Edit User Form</h2>
                <div>
                    <TextField style={{margin:'10px 0'}} label='First Name' placeholder='First Name' name='fName' required onChange={(e) => {
                        setfName(e.target.value)
                    }} type='text' value={fName} />
                    <TextField style={{margin:'10px 0'}} label='Last Name' placeholder='Last Name' name='lName' required onChange={(e) => {
                        setLName(e.target.value)
                    }} type='text' value={LName} />
                </div>
                <div>
                    <TextField style={{margin:'10px 0'}} label='Title' placeholder='Title' name='Title' onChange={(e) => {
                        setTitle(e.target.value)
                    }} type='text' required value={title} />
                    <TextField style={{margin:'10px 0'}} label='Picture' placeholder='Picture' name='Picture' onChange={(e) => {
                        setPicture(e.target.value)
                    }} type='url' required value={picture} />
                </div>
                <Button type='submit'>Submit Changes</Button>
            </form>
                        <Button onClick={() => setEdit(false)}>Close</Button>
                    </Box>
                </Modal>
                <Modal
                    open={loading}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ textAlign: 'center' }}><BeatLoader size={72} loading={loading} color='maroon' /></div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default Home
