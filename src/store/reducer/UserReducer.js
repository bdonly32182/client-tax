import {USER_LOGIN} from '../action/ActionType'
export default (state=[],action)=> {
    switch (action.type) {
        case USER_LOGIN:         
           return action.payload
        default:
            return state
    }
}