import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { useState, useEffect } from 'react';
import {EditOutlined } from '@ant-design/icons';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  id: number;
  name: string;
  last_name: string;
}

function UserUpdateForm({ open, onCreate, onCancel, id, name, last_name}:CollectionCreateFormProps){
  const [form] = Form.useForm();
  React.useEffect(() => {
    form.setFieldsValue({
      name: name,
      lastName: last_name,
    });
  }, []);

  return (
    <Modal
      open={open}
      title="Update user"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            console.log(values)
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        // initialValues={[{name:["name"],value:name},{name:["lastName"],value:last_name}]}
      >
        <Form.Item
          name="name"
          label="First name"
          rules={[{ required: true, message: 'Please input the user first name!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item 
        name="lastName" 
        label="Last name" 
        rules={[{ required: true, message: 'Please input the user last name!' }]} >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

interface UserUpdateModal{
    id: number;
    name: string;
    last_name: string;
  }

export default function UserUpdateModal({id, name, last_name}:UserUpdateModal){
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={() => {
          setOpen(true);
        }}
      >
      </Button>
      <UserUpdateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        id={id}
        name={name}
        last_name={last_name}
      />
    </div>
  );
};
