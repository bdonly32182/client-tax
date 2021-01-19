import {combineReducers}from 'redux'
import User from './UserReducer'
import CustomerReducer from './CustomerReducer'
import TaxReducer from './TaxReducer'
import LandReducer from './LandReducer'
const rootReducer = combineReducers({
    users:User,
    customers:CustomerReducer,
    taxs:TaxReducer,
    lands:LandReducer
})
export default rootReducer