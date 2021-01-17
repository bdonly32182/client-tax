import {combineReducers}from 'redux'
import User from './UserReducer'
import CustomerReducer from './CustomerReducer'
const rootReducer = combineReducers({
    users:User,
    customers:CustomerReducer
})
export default rootReducer