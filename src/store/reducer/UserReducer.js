import {USER_LOGIN} from '../action/ActionType'
const UserReducer =(state=[],action)=> {
    switch (action.type) {
        case USER_LOGIN:         
           return action.payload
        default:
            return state
    }
}
export default UserReducer