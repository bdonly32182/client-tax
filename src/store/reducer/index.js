import {combineReducers}from 'redux'
import User from './UserReducer'
import CustomerReducer from './CustomerReducer';
import TaxReducer from './TaxReducer';
import LandReducer from './LandReducer';
import Usefulland from './UsefulLandReducer';
import Building from './BuildingReducer';
import Condo from './CondoReducer';
import Room from './RoomReducer';
import CostDocument from './CostDocReducer';
import CheckDocument from './CheckDocReducer';
const rootReducer = combineReducers({
    users:User,
    customers:CustomerReducer,
    taxs:TaxReducer,
    lands:LandReducer,
    usefullands:Usefulland,
    buildings:Building,
    condo:Condo,
    rooms:Room,
    Costs:CostDocument,
    Checks:CheckDocument
})
export default rootReducer