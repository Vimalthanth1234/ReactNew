const initialState = []
const getDataReducer = (state=initialState,action) => {
    switch(action.type){
        case 'getData':return action.payload
        default:return state
    }
}

export default getDataReducer
