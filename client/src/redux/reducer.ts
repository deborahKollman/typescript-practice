import { ActionTypes, User, FetchUsersAction } from './actions';

   
const initialState: User[] = [];

export interface StoreState {
    users: User[];
}
   
const reducer = (state: User[] = initialState, action: FetchUsersAction) => {
    switch (action.type) {
        case ActionTypes.fetchUsers: return action.payload;
        default: return state;
    }
};

export default reducer