import { ActionTypes, User, FetchUsersAction } from './actions';


export interface stateI {
    users: User[];
}
   
const initialState: stateI = {
    users:[],
};

export interface StoreState {
    users: User[];
}
   
const reducer = (state: User[] = [], action: FetchUsersAction) => {
    switch (action.type) {
        case ActionTypes.fetchUsers: return action.payload;
        default: return state;
    }
};

export default reducer