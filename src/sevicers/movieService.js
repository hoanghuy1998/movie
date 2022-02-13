import api from "./api";
const apiKey = "api_key=4a52aa3f1f7bd835f33664c79918b14a";
const getListNowPlay = (p) =>
  api.get(`${api.url.movie}/now_playing?${apiKey}&&page=${p}`);
const getListPopular = (p) =>
  api.get(`${api.url.movie}/popular?${apiKey}&&page=${p}`);
const getListTopRate = (p) =>
  api.get(`${api.url.movie}/top_rated?${apiKey}&&page=${p}`);
const getListUpComit = (p) =>
  api.get(`${api.url.movie}/upcoming?${apiKey}&&page=${p}`);
const getDetail = (id) => api.get(`${api.url.movie}/${id}?${apiKey}`);
const getComment = (id) => api.get(`${api.url.movie}/${id}/reviews?${apiKey}`);
const blogService = {
  getListNowPlay,
  getListPopular,
  getListTopRate,
  getListUpComit,
  getDetail,
  getComment,
};
export default blogService;
