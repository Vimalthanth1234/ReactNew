import React from 'react'
const initialState= false

const isOpenReducer = (state=initialState,action) => {
    switch(action.type){
        case 'isOpen':return action.payload
        default:return state
    }
}

export default isOpenReducer
