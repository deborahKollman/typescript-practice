import React from "react";
import { User } from "../redux/actions";
import { Avatar, List } from 'antd';
import UserDeleteOption from "./UserDeleteOption";
import UserUpdateModal from "./UserUpdateModal";

type AppProps = {
    data: User[]
}

export default function UserList({data}: AppProps){
    return(
    <List
        itemLayout="horizontal"
        bordered={true}
        size="large"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png" />}
              title={<a href="#">{item.name} {item.lastName}</a>}
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <UserDeleteOption id={item.id}/>
            <UserUpdateModal id={item.id} name={item.name} last_name={item.lastName} />
          </List.Item>
        )}
      />)
}