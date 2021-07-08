
import {FETCHS_BUILD_IN_USEFULLAND,FETCHS_BUILDING, FETCH_BUILDING,FETCHS_BUILDING_LAND} from '../action/ActionType'
const BuildingReducer = (state =[] , action) => {
    switch (action.type) {
        case FETCHS_BUILD_IN_USEFULLAND:        
            return action.payload;
        case FETCHS_BUILDING :
            return action.payload
        case FETCH_BUILDING:
            return action.payload
        case FETCHS_BUILDING_LAND:
            return action.payload
        default:
            return state;
    }
}
export default BuildingReducer