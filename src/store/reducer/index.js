import {combineReducers}from 'redux'
import User from './UserReducer'
const rootReducer = combineReducers({
    users:User
})
export default rootReducer