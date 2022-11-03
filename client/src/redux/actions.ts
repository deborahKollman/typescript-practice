import axios from 'axios';
import { Dispatch } from 'redux';

const url = 'http://localhost:3001/user';

export interface User {
    _id: string;
    name: string;
    lastName: string;
}

export interface FetchUsersAction {
    type: string;
    payload: User[];
}

export enum ActionTypes{
    fetchUsers="FETCH_USERS"
}


export const fetchUsers = () => {
    return async (dispatch:Dispatch) => {
        const response = await axios.get(url);
        dispatch<FetchUsersAction>({
            type: ActionTypes.fetchUsers,
            payload: response.data,
        });
    };
};

