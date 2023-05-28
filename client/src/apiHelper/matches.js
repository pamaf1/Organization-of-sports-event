import apiRequest from ".";

export const GetAllMatch = async (payload) => {
  return await apiRequest({
    method: "GET",
    endPoint: `https://match-organize.onrender.com/api/matches/get-all-match`,
    queryStrings: payload
  });
};

export const GetMatchByUserId = async (payload) => {
  return await apiRequest({
    method: "GET",
    endPoint: `https://match-organize.onrender.com/api/matches/get-match-by-userId`,
    queryStrings: payload,
  });
};

export const GetMatchById = async (id) => {
  return await apiRequest({
    method: "GET",
    endPoint: `https://match-organize.onrender.com/api/matches/${id}`,
  });
};

export const DeleteMatch = async (payload) => {
    return await apiRequest({
      method: "DELETE",
      endPoint: 'https://match-organize.onrender.com/api/matches/delete-match',
      payload,
    });
};