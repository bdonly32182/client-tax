import {FETCHS_TAX,FETCH_TAX} from '../action/ActionType'
const TaxReducer = (state=[],action)=>{
    switch (action.type) {
        case FETCH_TAX:
            
            return action.payload;
        case FETCHS_TAX:
            return action.payload
        default:
            return state;
    }
}
export default TaxReducer