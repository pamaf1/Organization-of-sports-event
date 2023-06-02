import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import MatchForm from '../../components/matchForm';
import { HideLoading, ShowLoading } from '../../redux/alertSlice';
import {Form, message, Table, Row, Col, Input, Button, DatePicker} from 'antd';
import { axiosInstance } from '../../helpFunction/axiosInstances';
import { DeleteMatch } from "../../apiHelper/matches";
import { useNavigate } from "react-router-dom";
import { makeDate } from "../../helpFunction/dateFormat";
import moment from 'moment';
const { RangePicker } = DatePicker;

function AdminMatches() {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [showMatchForm, setShowMatchForm] = useState(false);
    const { user } = useSelector((state) => state.users);
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [searchForm] = Form.useForm();

    const getMatches = async () => {
        try {
            dispatch(ShowLoading());
            const matchResponse = await axiosInstance.get('https://match-organize.onrender.com/api/matches/get-all-match', {});
            dispatch(HideLoading());
            if(matchResponse.data.success)
            {
                setMatches(matchResponse.data.data);
                setFilteredMatches(matchResponse.data.data);
            }
            else {
                message.error(matchResponse.data.message);
            }   
            if(user.isAdmin === false) {
                navigation('/create-matches')
            }

        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const deleteMatch = async (id) => {
        try {
            dispatch(ShowLoading());
            const matchResponse = await DeleteMatch({_id: id._id});
            message.success(matchResponse.message);
            getMatches();
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    
    const columns = [
         {
            title: 'Організатор',
            dataIndex: 'createdBy',
            render: (text, record) => 
            <div className='cursor-pointer' onClick={() => {
                user._id === record.createdBy._id ? navigation('/profile') : navigation(`/user/${record.createdBy._id}`)}}>
                {record.createdBy.login}
            </div>
        },
        {
            title: 'Місце проведення',
            dataIndex: 'place'
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            render: (text) => makeDate(text)

        }
        ,
        {
            title: 'Час',
            dataIndex: 'time'
        },
        {
            title: 'Вид спорту',
            dataIndex: 'type'
        },
        {
            title: 'Кількість учасників',
            dataIndex: 'partisipants'
        },
        {
            title: 'Редагувати/Видалити',
            dataIndex: 'action',
            render: (action, record) => (
                <div className='d-flex gap-2'>
                    <i class="ri-pencil-fill" onClick={() => {
                            setSelectedMatch(record);
                            setShowMatchForm(true);
                        }}>
                    </i>
                    <i class="ri-delete-bin-6-fill" onClick={() => {
                            deleteMatch(record);
                        }}>                       
                    </i>
                </div>
            )
        }
      ];

    useEffect(() => {
        getMatches();
    }, []);
    
    const handleSearch = (values) => {
        const { organizer, place, dateRange, sportType } = values;
        let filteredData = matches;
    
        // Фільтрація по організатору
        if (organizer) {
          filteredData = filteredData.filter((match) =>
            match.createdBy.login.toLowerCase().includes(organizer.toLowerCase())
          );
        }
    
        // Фільтрація по місцю проведення
        if (place) {
          filteredData = filteredData.filter((match) =>
            match.place.toLowerCase().includes(place.toLowerCase())
          );
        }
    
        // Фільтрація по даті
        if (dateRange && dateRange.length === 2) {
            const [start, end] = dateRange;
            const startDate = moment(start.format('YYYY-MM-DD'));
            const endDate = moment(end.format('YYYY-MM-DD')).endOf('day');
          
            filteredData = filteredData.filter((match) => {
              const matchDate = moment(match.date, 'YYYY-MM-DD');
              return matchDate.isSameOrAfter(startDate, 'day') && matchDate.isSameOrBefore(endDate, 'day'); 
            });
        }
    
        // Фільтрація по виду спорта
        if (sportType) {
          filteredData = filteredData.filter((match) =>
            match.type.toLowerCase().includes(sportType.toLowerCase())
          );
        }
    
        setFilteredMatches(filteredData);
    };
    
    const handleReset = () => {
        searchForm.resetFields();
        setFilteredMatches(matches);
    };


    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1>Матчі</h1>
                <button className='secondary-btn' 
                 onClick={() => setShowMatchForm(true)}>
                    Створити матч
                </button>
            </div>
            <Form form={searchForm} layout="vertical" onFinish={handleSearch} style={{padding: '15px'}}>
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                    <Form.Item name="organizer" label="Організатор">
                        <Input placeholder="Пошук по організатору" />
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item name="place" label="Місце проведення">
                        <Input placeholder="Пошук по місцю проведення" />
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item name="sportType" label="Вид спорту">
                        <Input placeholder="Пошук по виду спорту" />
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item name="dateRange" label="Дата" style={{height: "40px"}}>
                        <RangePicker placeholder={['Початкова дата', 'Кінцева дата']} style={{height: "40px"}}/>
                    </Form.Item>
                    </Col>
                </Row>
                <Row justify="end">
                    <Col>
                    <Button type="primary" htmlType="submit">
                        Пошук
                    </Button>
                    <Button onClick={handleReset}>Скинути</Button>
                    </Col>
                </Row>
                </Form>
            <Table dataSource={filteredMatches} columns={columns}/>
            
            {showMatchForm && 
            <MatchForm 
                showMatchForm={showMatchForm} 
                setShowMatchForm={setShowMatchForm} 
                type= {selectedMatch ? 'edit' : 'add'}
                selectedMatch = {selectedMatch}
                setSelectedMatch = {setSelectedMatch}
                getData = {getMatches}
            />}
        </div>
        
    )
}

export default AdminMatches