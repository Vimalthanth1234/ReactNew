const initialState = ''
const getPasswordReducer = (state=initialState,action) => {
    switch(action.type){
        case 'getPassword':return action.payload
        default:return state
    }
}

export default getPasswordReducer
