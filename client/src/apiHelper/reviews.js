import apiRequest from ".";

export const AddNewReview = async (payload) => {
    return await apiRequest({
      method: "POST",
      endPoint: "https://match-organize.onrender.com/api/reviews",
      payload,
    });
};

export const GetAllReviews = async (payload) => {
    return await apiRequest({
      method: "GET",
      endPoint: `https://match-organize.onrender.com/api/reviews`,
      queryStrings: payload,
    });
};
  
export const DeleteReview = async (payload) => {
    return await apiRequest({
      method: "DELETE",
      endPoint: `https://match-organize.onrender.com/api/reviews/${payload._id}`,
      payload,
    });
};