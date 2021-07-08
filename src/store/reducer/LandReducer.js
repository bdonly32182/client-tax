import {FETCHS_LAND,FETCH_LAND} from '../action/ActionType'
const LandReducer = (state=[],action) =>{
    switch (action.type) {
        case FETCH_LAND:           
            return action.payload;
        case FETCHS_LAND:
            return action.payload
        default:
            return state;
    }
}
export default LandReducer;