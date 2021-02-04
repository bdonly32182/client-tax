import {combineReducers}from 'redux'
import User from './UserReducer'
import CustomerReducer from './CustomerReducer'
import TaxReducer from './TaxReducer'
import LandReducer from './LandReducer'
import Usefulland from './UsefulLandReducer';
import Building from './BuildingReducer'
const rootReducer = combineReducers({
    users:User,
    customers:CustomerReducer,
    taxs:TaxReducer,
    lands:LandReducer,
    usefullands:Usefulland,
    buildings:Building
})
export default rootReducer