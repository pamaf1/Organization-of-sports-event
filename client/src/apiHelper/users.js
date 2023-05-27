import apiRequest from ".";

export const GetUserById = async (id) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/users/${id}`,
  });
};

export const UpdateUser = async (payload) => {
    return await apiRequest({
      method: "PUT",
      endPoint: "/api/users/update-user",
      payload,
    });
};