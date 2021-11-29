const initial = ''
const getNameReducer = (state=initial,action) => {
    switch(action.type){
        case 'getName':return action.payload
        default:return state
    }
}

export default getNameReducer
