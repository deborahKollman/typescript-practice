import React, { useState } from "react";
import { User } from "../redux/actions";
import { Button, Form, Input } from 'antd';


export default function UserCreateForm(){
    const [form] = Form.useForm<{ first_name: string; last_name: string }>();
    const firstNameValue = Form.useWatch('first_name', form);
    const lastNameValue = Form.useWatch('last_name', form);

    const onFinish = (values: any) => {
        console.log('Success:', firstNameValue,lastNameValue);
        console.log(values)
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
          wrapperCol={{ span: 16 }}
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