import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import { message , Pagination, Rate } from 'antd';
import { GetAllReviews } from "../apiHelper/reviews";

function UserRating() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [reviewes, setReviews] = useState([]);
    const {user} = useSelector(state => state.users)


    const getUserRating = async () => {
        try {
            dispatch(ShowLoading(true));
            const reviewsResponse = await GetAllReviews({user: user._id});
            setReviews(reviewsResponse.data);
            dispatch(HideLoading(false));
          } catch (error) {
            dispatch(HideLoading(false));
            message.error(error.message);
          }
    }

    useEffect(() => {
        getUserRating();
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
    const paginatedReviewes = reviewes.slice(startIndex, endIndex);

    return (
        <div>
            <div>
            <div className='rate-text'> <h1>Загальний рейтинг: </h1>
                    <Rate className="value"
                        disabled
                        defaultValue={user?.rating || 0}
                        allowHalf
                        style={{ color: "orange" }}
                    />
            </div>
                <div className="mt-5 flex flex-col gap-2">
                        {paginatedReviewes.map((review) => {
                            return (
                            <div
                                key={review?._id}
                                className="flex justify-between border-solid border p-2">
                                <div className="flex flex-col">
                                <Rate
                                    disabled
                                    defaultValue={review?.rating || 0}
                                    allowHalf
                                    style={{ color: "orange" }}
                                    className="mt-2"
                                />
                                <span className="text-sm">
                                    {review?.comment}
                                </span>
                                </div>
                            </div>
                            );

                        })}
                    </div>
                <Pagination className='pagination'
                    current={currentPage}
                    pageSize={pageSize}
                    total={reviewes.length}
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageSizeChange}
                    showSizeChanger
                    pageSizeOptions={['10', '20', '30', '40']}
                />
            </div>
        </div>
    )
}

export default UserRating