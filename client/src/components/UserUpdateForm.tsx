import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { useState } from 'react';

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

export default function UserUpdateForm({ open, onCreate, onCancel, id, name, last_name}:CollectionCreateFormProps){
  const [form] = Form.useForm();
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
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="name"
          label="First name"
          rules={[{ required: true, message: 'Please input the user first name!' }]}
        >
          <Input value={name}/>
        </Form.Item>
        <Form.Item 
        name="lastName" 
        label="Last name" 
        rules={[{ required: true, message: 'Please input the user last name!' }]} >
          <Input value={last_name}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// const App: React.FC = () => {
//   const [open, setOpen] = useState(false);

//   const onCreate = (values: any) => {
//     console.log('Received values of form: ', values);
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button
//         type="primary"
//         onClick={() => {
//           setOpen(true);
//         }}
//       >
//         New Collection
//       </Button>
//       <UserUpdateForm
//         open={open}
//         onCreate={onCreate}
//         onCancel={() => {
//           setOpen(false);
//         }}
//       />
//     </div>
//   );
// };
