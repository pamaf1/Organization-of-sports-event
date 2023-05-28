import apiRequest from ".";

export const GetUserById = async (id) => {
  return await apiRequest({
    method: "GET",
    endPoint: `https://match-organize.onrender.com/api/users/${id}`,
  });
};

export const UpdateUser = async (payload) => {
    return await apiRequest({
      method: "PUT",
      endPoint: "https://match-organize.onrender.com/api/users/update-user",
      payload,
    });
};