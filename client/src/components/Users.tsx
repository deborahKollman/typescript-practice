import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {User, fetchUsers} from '../redux/actions';
import { AppDispatch } from '../redux/store';
import { Spin, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UserList from './UserList';
import { useNavigate } from 'react-router-dom';


export default function Users() {
    const [isLoading,setLoading] = useState(true); 
    const users=useSelector((state:User[])=>state)

    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate()
    
    useEffect(() => {
        dispatch(fetchUsers())
        setLoading(false)
    }, []);

    
    return (
        <>
            {!isLoading?
            <div>
                <h1>Users</h1>
                <Button type="dashed" icon={<PlusOutlined />} size="large" onClick={()=>navigate('/create')}>
                    New User
                </Button>
                {users?<UserList data={users}/>:null}
            </div>:<Spin />}
        </>
    );
}