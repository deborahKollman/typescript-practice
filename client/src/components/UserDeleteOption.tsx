import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchUsers} from '../redux/actions';
import { Button, Modal, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

type AppProps = {
    id: number
}

export default function UserDeleteOption({id}:AppProps) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const dispatch:AppDispatch = useDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    axios.delete(`http://localhost:3001/user/${id}`)
        .then((response)=>{
          if(response.status===200){
            message.success(response.data);}
            else{
            message.error(response.data)
          }
        dispatch(fetchUsers())})
        .catch(()=>message.error('User could not be deleted'))
        .finally(()=>{
        setOpen(false);
        setConfirmLoading(false);
        })
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" icon={<DeleteOutlined />} onClick={showModal}/>
      <Modal
        title="Delete user"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete user?</p>
      </Modal>
    </>
  );
};
