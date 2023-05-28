import apiRequest from ".";

export const GetAllRegistration = async (payload) => {
  return await apiRequest({
    method: "GET",
    endPoint: `https://match-organize.onrender.com/api/registration/get-all-registration`,
    queryStrings: payload
  });
};

export const GetRegistrationByUserId = async (payload) => {
  return await apiRequest({
    method: "GET",
    endPoint: `https://match-organize.onrender.com/api/registration/get-registration-by-userId`,
    queryStrings: payload,
  });
};

export const GetRegistrationById = async (id) => {
  return await apiRequest({
    method: "GET",
    endPoint: `https://match-organize.onrender.com/api/registration/${id}`,
  });
};

export const DeleteRegistration = async (payload) => {
    return await apiRequest({
      method: "DELETE",
      endPoint: 'https://match-organize.onrender.com/api/registration/delete-registration',
      payload,
    });
};