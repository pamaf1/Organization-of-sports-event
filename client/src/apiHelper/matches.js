import apiRequest from ".";

export const GetAllMatch = async (payload) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/matches/get-all-match`,
    queryStrings: payload
  });
};

export const GetMatchByUserId = async (payload) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/matches/get-match-by-userId`,
    queryStrings: payload,
  });
};

export const GetMatchById = async (id) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/matches/${id}`,
  });
};

export const DeleteMatch = async (payload) => {
    return await apiRequest({
      method: "DELETE",
      endPoint: '/api/matches/delete-match',
      payload,
    });
};