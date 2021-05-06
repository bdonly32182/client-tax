
import {FETCHS_BUILD_IN_USEFULLAND,DELETE_BUILDING,FETCHS_BUILDING, FETCH_BUILDING} from '../action/ActionType'
export default (state =[] , action) => {
    switch (action.type) {
        case FETCHS_BUILD_IN_USEFULLAND:        
            return action.payload;
        case FETCHS_BUILDING :
            return action.payload
        case FETCH_BUILDING:
            return action.payload
        // case DELETE_BUILDING:
        //     return state.filter(build=>build.Build_id_in_Useful !== action.RemoveId);//Build_id_in_Useful ใช้แทน Build_Id ได้
        default:
            return state;
    }
}