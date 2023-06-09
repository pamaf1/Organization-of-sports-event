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
    const [isButtonDisabled, setButtonDisabled] = React.useState(false);
    const onFinish = async(values) => {
        try {
            if (isButtonDisabled) {
                return;
              }        
            dispatch(ShowLoading());
            setButtonDisabled(true);
            const response = await axios.post("https://match-organize.onrender.com/api/users/registration", values);
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
                <h1 className='text-ex'>Реєстрація</h1>
                <hr />
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label="Ім'я" name='name' rules={[
                        { required: true, message: "Введіть своє ім'я" },
                        { pattern: /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ]+$/, message: "Ім'я повинно містити тільки літери" },
                        { max: 10 }]}
                    >
                        <input type="text" required maxLength='10'/>
                    </Form.Item>
                    <Form.Item label="Логін" name='login' rules={[
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
                    <Form.Item label="Пароль" name='password' rules={[
                        { required: true, message: 'Введіть пароль' },
                        { minlength: 5},
                        { maxlength: 15}]}
                        >
                        <input type="password" required minlength="5" maxlength="15"/>
                    </Form.Item>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Link to="/login">Login</Link>
                        <button className='secondary-btn' type='submit' disabled={isButtonDisabled}>Зареєструватися</button>
                    </div>
                </Form>


            </div>
        </div>
    )
}

export default Registration