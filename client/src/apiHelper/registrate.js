import apiRequest from ".";

export const GetRegistrationByUserId = async (payload) => {
    return await apiRequest({
      method: "GET",
      endPoint: `https://match-organize.onrender.com/api/registration/get-registration-by-userId`,
      queryStrings: payload,
    });
  };

export const DeleteRegistration = async (payload) => {
    return await apiRequest({
      method: "DELETE",
      endPoint: 'https://match-organize.onrender.com/api/registration/delete-registration',
      payload,
    });
};