import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import ReviewForm from '../components/reviewForm';
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import { message, Rate, Pagination} from 'antd';
import { useParams } from "react-router-dom";
import { GetUserById } from "../apiHelper/users";
import { GetAllReviews, DeleteReview } from "../apiHelper/reviews";

function UserInfo() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewes, setReviews] = useState([]);
    const [users, setUsers] = useState();
    const { id } = useParams();
    const { user } = useSelector(state => state.users)

    const getReview = async () => {
        try {
          dispatch(ShowLoading(true));
          const response = await GetUserById(id);
          const reviewsResponse = await GetAllReviews({user: id});
          setReviews(reviewsResponse.data);
          setUsers(response.data);
          dispatch(HideLoading(false));
        } catch (error) {
          dispatch(HideLoading(false));
          message.error(error.message);
        }
    };

    const deleteReview =  async (review) => {
        try {
            document.location.reload()
            dispatch(ShowLoading(true));
            const reviewsDeleteResponse = await DeleteReview({_id: review._id, user: review.user._id});
            message.success(reviewsDeleteResponse.message);
            getReview();
            dispatch(HideLoading(false));
        } catch (error) {
            dispatch(HideLoading(false));
            message.error(error.message);
        }
    };

    useEffect(() => {
        getReview();
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
    const paginatedUsers = reviewes.slice(startIndex, endIndex);

    return (
        users && (
            <div>
                <div className="flex justify-between items-center mt-5">
                    <span className="text-xl flex-grow-0">Відгуки про користувача: {users.login}

                    </span>
                    {
                        id === user._id ? '' :                    
                        <button className='fourth-btn' onClick={() => setShowReviewForm(true)}>
                        Додати відгук
                        </button>
                    }

                </div>
                    
                <div className='rate-text'> Загальний рейтинг: 
                    <Rate className="value"
                        disabled
                        defaultValue={users.rating || 0}
                        allowHalf
                        style={{ color: "orange" }}
                    />
                </div>

                <div className="mt-5 flex flex-col gap-2">
                    {paginatedUsers.map((review) => {
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
                            {user.isAdmin ? <i class="ri-delete-bin-6-fill" onClick={() => {deleteReview(review)}}></i> : ''}
                            
                        </div>
                        );

                    })}
                </div>
                {showReviewForm && <ReviewForm user={users} reloadData={getReview} showReviewForm={showReviewForm} setShowReviewForm={setShowReviewForm}/>}

                <Pagination className='pagination'
                current={currentPage}
                pageSize={pageSize}
                total={reviewes.length}
                onChange={handlePageChange}
                onShowSizeChange={handlePageSizeChange}
                showSizeChanger
                pageSizeOptions={['10', '20', '30', '40']}/>
            </div>
        )
    )
}

export default UserInfo;