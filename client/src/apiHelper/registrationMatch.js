import apiRequest from ".";

export const GetAllRegistration = async (payload) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/registration/get-all-registration`,
    queryStrings: payload
  });
};

export const GetRegistrationByUserId = async (payload) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/registration/get-registration-by-userId`,
    queryStrings: payload,
  });
};

export const GetRegistrationById = async (id) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/registration/${id}`,
  });
};

export const DeleteRegistration = async (payload) => {
    return await apiRequest({
      method: "DELETE",
      endPoint: '/api/registration/delete-registration',
      payload,
    });
};