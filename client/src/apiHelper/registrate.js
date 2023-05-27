import apiRequest from ".";

export const GetRegistrationByUserId = async (payload) => {
    return await apiRequest({
      method: "GET",
      endPoint: `/api/registration/get-registration-by-userId`,
      queryStrings: payload,
    });
  };

export const DeleteRegistration = async (payload) => {
    return await apiRequest({
      method: "DELETE",
      endPoint: '/api/registration/delete-registration',
      payload,
    });
};