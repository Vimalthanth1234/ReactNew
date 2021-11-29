import React from 'react'

const isOpen = (res) => {
    return {
        type:'isOpen',
        payload:res
    }
}

export default isOpen
