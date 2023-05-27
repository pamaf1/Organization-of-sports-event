import apiRequest from ".";

export const AddNewReview = async (payload) => {
    return await apiRequest({
      method: "POST",
      endPoint: "/api/reviews",
      payload,
    });
};

export const GetAllReviews = async (payload) => {
    return await apiRequest({
      method: "GET",
      endPoint: `/api/reviews`,
      queryStrings: payload,
    });
};
  
export const DeleteReview = async (payload) => {
    return await apiRequest({
      method: "DELETE",
      endPoint: `/api/reviews/${payload._id}`,
      payload,
    });
};