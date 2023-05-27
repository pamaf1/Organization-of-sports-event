import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import { message, Row, Col, Pagination } from 'antd';
import { GetRegistrationByUserId } from "../apiHelper/registrate";
import Match from './match'

function RegisteredMatch() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const {user} = useSelector(state => state.users)
    const dispatch = useDispatch();
    const [registeredMatch, setRegisteredMatch] = useState([]);

    const getRegisteredMatch = async () => {
        try {
            dispatch(ShowLoading());
            const registeredMatchResponse = await GetRegistrationByUserId({user: user._id});
            setRegisteredMatch(registeredMatchResponse.data);
            dispatch(HideLoading());        
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getRegisteredMatch();
    }, []);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
      };
    
      const handlePageSizeChange = (current, size) => {
        setCurrentPage(1);
        setPageSize(size);
      };
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedMatches = registeredMatch.slice(startIndex, endIndex);

    return (
        <div>
            <div>
                <Row>
                    {paginatedMatches.map(registerMatch =>
                        (
                            <Col lg={24} md={24} sm={24} key={registerMatch._id}>
                                <Match match={registerMatch}/>
                            </Col>  
                        )
                    )}                    
                </Row>
                <Pagination className='pagination'
                    current={currentPage}
                    pageSize={pageSize}
                    total={registeredMatch.length}
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageSizeChange}
                    showSizeChanger
                    pageSizeOptions={['10', '20', '30', '40']}
                />
            </div>
        </div>
    )
}

export default RegisteredMatch