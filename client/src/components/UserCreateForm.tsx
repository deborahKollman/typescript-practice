import React, { useState } from "react";
import { User } from "../redux/actions";
import { Button, Form, Input } from 'antd';


export default function UserCreateForm(){
    
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    
    
    return (
        <>
        <h1>Submit new user</h1>
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