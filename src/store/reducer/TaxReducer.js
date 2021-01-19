import {FETCHS_TAX,FETCH_TAX} from '../action/ActionType'
export default (state=[],action)=>{
    switch (action.type) {
        case FETCH_TAX:
            
            return action.payload;
        case FETCHS_TAX:
            return action.payload
        default:
            return state;
    }
}