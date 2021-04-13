import {FETCHS_ROOM,DELETE_ROOM,DELETE_SELECT} from '../action/ActionType'
const RoomReducer = (state=[],action)=>{
    switch (action.type) {
        case FETCHS_ROOM: 
            return action.payload;
        case DELETE_ROOM:
            return state.filter(room =>room.id !== action.RemoveId);
        case DELETE_SELECT:
            return state.filter(room=>!action.RemoveAll.some(element=>element === room.id))
        default:
            return state;
    }
}
export default  RoomReducer