import React, { useState } from "react";
import axios from "axios";
import { User } from "../redux/actions";
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";


export default function UserCreateForm(){
    const navigate = useNavigate()
    
    const onFinish = (values: any) => {
        axios.post('http://localhost:3001/user',{name:values.first_name,lastName:values.last_name})
        .then(()=>message.success('User created'))
        .catch(()=>message.error('User could not be created'))
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    
    
    return (
        <>
        <h1>Submit new user</h1>
        <Button type="dashed" icon={<HomeOutlined />} size="large" onClick={()=>navigate('/')}>
            Home
        </Button>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10}}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
        <Form.Item
            label="First name"
            name="first_name"
            rules={[{ required: true, message: 'Please input your first name!' }]}
        >
            <Input/>
        </Form.Item>
    
        <Form.Item
            label="Last name"
            name="last_name"
            rules={[{ required: true, message: 'Please input your last name!' }]}
        >
            <Input/>
        </Form.Item>
    
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
        </Form.Item>
        </Form>
        </>
    );
}