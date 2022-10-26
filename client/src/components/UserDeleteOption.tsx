import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

type AppProps = {
    id: number
}

export default function UserDeleteOption({id}:AppProps) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    console.log('id',id);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
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
