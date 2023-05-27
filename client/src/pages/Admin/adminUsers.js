import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from '../../redux/alertSlice';
import {Form, message, Table, Switch, Input, Row, Col, Button } from 'antd';
import { axiosInstance } from '../../helpFunction/axiosInstances';
import { UpdateUser } from "../../apiHelper/users";
import { useNavigate } from "react-router-dom";
import { makeDate } from "../../helpFunction/dateFormat";

function AdminUsers() {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchForm] = Form.useForm();
  
    const getUsers = async () => {
        try {
            dispatch(ShowLoading());
            const usersResponse = await axiosInstance.get('/api/users/get-all-users', {});
            dispatch(HideLoading());
            if(usersResponse.data.success)
            {
                setUsers(usersResponse.data.data);
                setFilteredUsers(usersResponse.data.data);
            }
            else {
                message.error(usersResponse.data.message);
            }
            if(user.isAdmin === false) {
              navigation('/users')
          }

        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const updateUser = async (userData) => {
        try {
            dispatch(ShowLoading());
            if(user._id === userData._id) {
                message.error('Неможливо редагувати свої права')
            }
            else {
              const matchResponse = await UpdateUser(userData);
              message.success(matchResponse.message);
              getUsers();
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const columns = [{
        title: "Ім'я",
        dataIndex: "name",
      },
      {
        title: "Логін",
        dataIndex: "login",
        render: (text, record) => 
            <div className='cursor-pointer' onClick={() => {
                user._id === record._id ? navigation('/profile') : navigation(`/user/${record._id}`)}}>
                {record.login}
            </div>
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Створено",
        dataIndex: "createdAt",
        render: (text) => makeDate(text),
      },
      {
        title: "Змінити статус",
        dataIndex: "isAdmin",
        render: (text, user) => (
          <Switch
            checked={text}
            onChange={(checked) => updateUser({ ...user, isAdmin: checked })}
          />
        ),
      },
      {
        title: "Заблокувати",
        dataIndex: "isBanned",
        render: (text, user) => (
          <Switch
            checked={text}
            onChange={(checked) => updateUser({ ...user, isBanned: checked })}
          />
        ),
      },
    ];

    const handleSearch = (values) => {
      const { login } = values;
      let filteredData = users;
  
      // Фільтрація по логіну
      if (login) {
        filteredData = filteredData.filter((user) =>
          user.login.toLowerCase().includes(login.toLowerCase())
        );
      }
      setFilteredUsers(filteredData);
  };
  
  const handleReset = () => {
      searchForm.resetFields();
      setFilteredUsers(users);
  };


    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1>Користувачі</h1>
                {/* <Search
                  placeholder="Пошук по логіну"
                  allowClear
                  onSearch={handleSearch}
                  style={{ width: 200, height: '50px' }}
                /> */}
            </div>
            <Form form={searchForm} layout="vertical" onFinish={handleSearch} style={{padding: '15px'}}>
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                    <Form.Item name="login" label="Логін">
                        <Input placeholder="Пошук по логіну" />
                    </Form.Item>
                    </Col>
                  </Row>
                <Row>
                    <Col>
                    <Button type="primary" htmlType="submit">
                        Пошук
                    </Button>
                    <Button onClick={handleReset}>Скинути</Button>
                    </Col>
                </Row>
            </Form>

            <Table dataSource={filteredUsers} columns={columns}/>

        </div>
    )
}

export default AdminUsers