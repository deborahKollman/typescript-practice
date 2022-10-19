import {combineReducers} from 'redux';
import { ActionTypes, User, FetchUsersAction } from './actions';


interface stateI {
    counter: number;
}
   
const initialState: stateI = {
    counter: 1,
};
   
interface actionI {
    type: string;
}

export interface StoreState {
    users: User[];
}
   
const usersReducer = (state: User[] = [], action: FetchUsersAction) => {
    switch (action.type) {
        case ActionTypes.fetchUsers: return action.payload;
        default: return state;
    }
};


export const reducers = combineReducers<StoreState>({
    users: usersReducer,
});