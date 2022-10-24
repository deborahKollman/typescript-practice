import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {User, fetchUsers} from '../redux/actions';
import { AppDispatch } from '../redux/store';
import { Spin } from 'antd';
import UserList from './UserList';


export default function Users() {
    const [isLoading,setLoading] = useState(true); 

    const dispatch:AppDispatch = useDispatch();
    const users=useSelector((state:User[])=>state)
    
    useEffect(() => {
        dispatch(fetchUsers())
        setLoading(false)
    }, []);

    
    return (
        <>
            {!isLoading?
            <div>
                <h1>Users</h1>
                {users?<UserList data={users}/>:null}
            </div>:<Spin />}
        </>
    );
}