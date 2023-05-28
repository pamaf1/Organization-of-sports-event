import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import {Form, message, Row, Col, Input, Button, Pagination} from 'antd';
import { axiosInstance } from '../helpFunction/axiosInstances';
import UserContainer from '../components/userContainer'

function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchForm] = Form.useForm();

  
    const getUsers = async () => {
        try {
            dispatch(ShowLoading());
            const usersResponse = await axiosInstance.get('https://match-organize.onrender.com/api/users/get-all-users', {});
            dispatch(HideLoading());
            if(usersResponse.data.success)
            {
                setUsers(usersResponse.data.data);
                setFilteredUsers(usersResponse.data.data);
            }
            else {
                message.error(usersResponse.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }


    useEffect(() => {
        getUsers();
    }, []);


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

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
      };
    
      const handlePageSizeChange = (current, size) => {
        setCurrentPage(1);
        setPageSize(size);
      };
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedMatches = filteredUsers.slice(startIndex, endIndex);

    return (
        <div>
        <div>
            <Form form={searchForm} layout="vertical" onFinish={handleSearch}>
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
        </div>
        <div>
            <Row gutter={[16, 16]}>
                {paginatedMatches.map(user =>
                    (
                        <Col lg={12} md={24} sm={24} key={user._id}>
                            <UserContainer user={user}/>
                        </Col>
                    )
                )}
            </Row>
            <Pagination className='pagination'
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredUsers.length}
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageSizeChange}
                    showSizeChanger
                    pageSizeOptions={['10', '20', '30', '40']}
            />
        </div>
    </div>
    )
}

export default Users