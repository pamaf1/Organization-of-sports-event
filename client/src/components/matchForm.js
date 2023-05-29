import React from 'react'
import { Col, Form, message, Modal, Row } from "antd";
import { useDispatch } from 'react-redux'
import { useState } from "react";
import { axiosInstance } from '../helpFunction/axiosInstances';
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import { getUkraineDate, getUkraineTime, timeToMinutes, timeUpThreeHour } from "../helpFunction/dateFormat";

function MatchForm({showMatchForm, setShowMatchForm, type = 'add', selectedMatch, setSelectedMatch,getData}) {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const handleDateChange = (e) => {
        const dateValue = e.target.value;
        setSelectedDate(dateValue);
        setSelectedTime('');
    };

    const handleTimeChange = (e) => {
        const timeValue = e.target.value;
        const timeDifference = timeToMinutes(timeValue) - timeToMinutes(getUkraineTime());
        if (selectedDate === getUkraineDate() && timeDifference < 3 * 60) {
            message.error('Ви не можете вибрати такий час');
            setSelectedTime(timeUpThreeHour());
        } else {
            setSelectedTime(timeValue);
        }
    };


    const addMatch = async (values) => {
        try {
            if (isButtonDisabled) {
                return;
              }        
            dispatch(ShowLoading())
            let response = null;
            if(type === 'add'){
                setButtonDisabled(true);
                response = await axiosInstance.post('https://match-organize.onrender.com/api/matches/', values)
            }
            else{
                setButtonDisabled(true);
                response = await axiosInstance.put('https://match-organize.onrender.com/api/matches/update-match', {
                    ...values,
                    _id: selectedMatch._id
                })
            }
            if(response.data.success)
            {
                message.success(response.data.message);
            }
            else {
                message.error(response.data.message);
            }
            getData()
            setShowMatchForm(false);
            setSelectedMatch(null);
            dispatch(HideLoading())
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading())
        }
    }

    return (
        <Modal width={600} title={type === 'add' ? 'Створити матч' : 'Змінити матч'} open={showMatchForm} onCancel={() => {
            setSelectedMatch(null)
            setShowMatchForm(false)
        }} footer={false}>
            <Form layout='vertical' onFinish={addMatch} initialValues={selectedMatch}>
                <Row>
                    <Col lg={24} xs={24}>
                        <Form.Item label = 'Місце проведення' name = 'place'>
                            <input type='text' required maxLength='45'/>
                        </Form.Item>
                    </Col>
                    <Col lg={24} xs={24}>
                        <Form.Item label = 'Кількість учасників' name = 'partisipants'>
                            <input type='number' required min="5" max="30"/>
                        </Form.Item>
                    </Col>
                    <Col lg={24} xs={24}>
                        <Form.Item label = 'Назва командного виду спорту' name = 'type' rules={[
                        { pattern: /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ]+$/, message: "Вид спорту повинен містити тільки літери" },
                        { max: 10 }]}>
                            <input type='text' required maxLength='10'/>
                        </Form.Item>
                    </Col>
                    <Col lg={24} xs={24}>
                        <Form.Item label = 'Дата проведення' name = 'date'>
                            <input type='date' required min={getUkraineDate()} onChange={handleDateChange}/>
                        </Form.Item>
                    </Col>
                    <Col lg={24} xs={24}>
                        <Form.Item label = 'Час проведення' name = 'time'>
                            <input type='time' required min={selectedDate === getUkraineDate() ? timeUpThreeHour() : ''} onChange={handleTimeChange}/>
                        </Form.Item>
                    </Col>
                    <Col lg={24} xs={24}>
                        <Form.Item label = 'Контактні дані організатора' name = 'contacts'>
                            <input type='text' required maxLength='30'/>
                        </Form.Item>
                    </Col>
                    <Col lg={24} xs={24} >
                    <Form.Item label='Опис' name='description'>
                        <input type='text' required maxLength='300'/>
                    </Form.Item>
                    </Col>
                </Row>
                <div className='d-flex justify-content-end'>
                    <button className='secondary-btn' type="submit" disabled={isButtonDisabled}>Зберегти</button>
                </div>
            </Form>
        </Modal>
    )
}

export default MatchForm