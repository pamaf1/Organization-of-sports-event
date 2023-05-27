import React from 'react'
import { Tabs } from "antd";
import RegisteredMatch from "../components/registeredMatch";
import UserRating from "../components/userRating";

function Profile() {
    return (
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Matches" key="1">
            <RegisteredMatch />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Rating" key="2">
             <UserRating />
          </Tabs.TabPane>
        </Tabs>
      );
}

export default Profile