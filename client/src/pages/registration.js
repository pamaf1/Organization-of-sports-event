import React from 'react'
import {Form, message} from 'antd';
import {Link} from 'react-router-dom';
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { useNavigate } from 'react-router-dom';

function Registration() {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const onFinish = async(values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/users/registration", values);
            dispatch(HideLoading());
            if(response.data.success)
            {
                message.success(response.data.message);
                navigation("/login");
            }
            else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <div className='h-screen d-flex justify-content-center align-items-center'>
            <div className='w-400 card p-3'>
                <h1 className='text-lg'>Registration</h1>
                <hr />
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label="Name" name='name' rules={[
                        { required: true, message: "Введіть своє ім'я" },
                        { pattern: /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ]+$/, message: "Ім'я повинно містити тільки літери" },
                        { max: 10 }]}
                    >
                        <input type="text" required maxLength='10'/>
                    </Form.Item>
                    <Form.Item label="Login" name='login' rules={[
                        { required: true, message: 'Введіть логін' },
                        { pattern: /^[A-Za-z0-9#$%^&_+\-=]+$/, message: 'Некоректний логін' },
                        { max: 10 },
                        ]}
                    >
                        <input type="text"/>
                    </Form.Item>
                    <Form.Item label="Email" name='email' rules={[{ required: true, message: 'Введіть email' }]}>
                        <input type="email" required/>
                    </Form.Item>
                    <Form.Item label="Password" name='password' rules={[
                        { required: true, message: 'Введіть пароль' },
                        { minlength: 5},
                        { maxlength: 15}]}
                        >
                        <input type="password" required minlength="5" maxlength="15"/>
                    </Form.Item>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Link to="/login">Login</Link>
                        <button className='secondary-btn' type='submit'>Registration</button>
                    </div>
                </Form>


            </div>
        </div>
    )
}

export default Registration