import React from 'react'
import {  message, Modal, Rate } from "antd";
import { useDispatch } from 'react-redux'
import { useState } from "react";
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import { AddNewReview } from "../apiHelper/reviews";

function ReviewForm({user, reloadData, showReviewForm, setShowReviewForm, selectedReview}) {
    const dispatch = useDispatch();
    const [rating, setRating] = useState();
    const [comment, setComment] = useState("");
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const addReview = async () => {
        try {
            if (isButtonDisabled) {
              return;
            }        
            dispatch(ShowLoading(true));
            setButtonDisabled(true);
            const response = await AddNewReview({user: user._id, rating, comment});
            message.success(response.message);
            reloadData();
            setShowReviewForm(false);
            document.location.reload()
            dispatch(HideLoading(false));
        } catch (error) {
            dispatch(HideLoading(false));
            message.error('Спочатку поставте рейтинг!');
        }
      };

      return (
        <Modal
          open={showReviewForm}
          onCancel={() => setShowReviewForm(false)}
          centered
          title='Додати відгук'
          onOk={addReview} disabled={isButtonDisabled}>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex w-full">
              <span className="font-semibold">Користувач : </span>
              <span className="ml-2 font-semibold">{user?.login}</span>
            </div>
            <Rate
              value={rating}
              onChange={(value) => setRating(value)}
              allowHalf
              style={{ color: "orange" }}
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value.substring(0, 200))}
              placeholder="Ваш відгук"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </Modal>
      );

}

export default ReviewForm;