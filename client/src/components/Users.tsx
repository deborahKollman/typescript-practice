import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {User, fetchUsers} from '../redux/actions';
import { AppDispatch } from '../redux/store';


export default function Users() {
    const [isLoading,setLoading] = useState(true); 

    const dispatch:AppDispatch = useDispatch();
    const users=useSelector((state:User[])=>state)
    
    useEffect(() => {
        setLoading(true)
        dispatch(fetchUsers())
        setLoading(false)
    }, []);

    
    return (
        <div>
            {!isLoading?
            <div>
            {users?.map((user: User) => {
                return (<div key={user.id}>{user.id}) {user.name} {user.lastName}</div>
                );
            })}
            </div>:<div><h3>Loading</h3></div>}
        </div>
    );
}