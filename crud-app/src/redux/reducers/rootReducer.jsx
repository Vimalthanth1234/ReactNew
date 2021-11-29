import { combineReducers } from 'redux'
import getDataReducer from './getDataReducer'
import getNameReducer from './getNameReducer'
import getPasswordReducer from './getPasswordReducer'
import isOpenReducer from './isOpenReducer'

const rootReducer = combineReducers({
    getDataReducer:getDataReducer,
    getNameReducer:getNameReducer,
    getPasswordReducer:getPasswordReducer,
    isOpenReducer:isOpenReducer
})

export default rootReducer