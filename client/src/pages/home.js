import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import { Form, message, Row, Col, Input, Button, DatePicker, Pagination } from 'antd';
import { axiosInstance } from '../helpFunction/axiosInstances';
import Match from '../components/match'
import moment from 'moment';
const { RangePicker } = DatePicker;

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch();
    const [matches, setMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [searchForm] = Form.useForm();

    const getMatches = async () => {
        try {
            dispatch(ShowLoading());
            const matchResponse = await axiosInstance.get('/api/matches/get-all-match', {});
            dispatch(HideLoading());
            if(matchResponse.data.success)
            {
                setMatches(matchResponse.data.data);
                setFilteredMatches(matchResponse.data.data);
            }
            else {
                message.error(matchResponse.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

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

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
      };
    
      const handlePageSizeChange = (current, size) => {
        setCurrentPage(1);
        setPageSize(size);
      };
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedMatches = filteredMatches.slice(startIndex, endIndex);

    return (
        <div>
            <div>
                <Form form={searchForm} layout="vertical" onFinish={handleSearch}>
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
            </div>
            <div>
                <Row gutter={[16, 16]}>
                    {paginatedMatches.map(match =>
                        (
                            <Col lg={24} md={24} sm={24} key={match._id}>
                                <Match match={match}/>
                            </Col>
                        )
                    )}
                    
                </Row>

                <Pagination className='pagination'
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredMatches.length}
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageSizeChange}
                    showSizeChanger
                    pageSizeOptions={['10', '20', '30', '40']}
                />
            </div>
        </div>
    )
}

export default Home