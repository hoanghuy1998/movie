import ActionTypes from "../action";

const initialState = {
  listNowPlay: [],
  listPopular: [],
  detailMovie: JSON.parse(localStorage.getItem("detailMovie")) || {},
  totalPage: 0,
  changePage: false,
  img: "https://image.tmdb.org/t/p/w500/",
  typeMovie: localStorage.getItem("typeMovie") || "",
  param: localStorage.getItem("param") || "",
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PARAM:
      localStorage.setItem("param", action.param);
      return {
        ...state,
        param: action.param,
      };
    case ActionTypes.DETAIL_MOVIE:
      localStorage.setItem("detailMovie", JSON.stringify(action.detailMovie));
      return {
        ...state,
        detailMovie: action.detailMovie,
      };
    case ActionTypes.SELECTED_TYPE_MOVIE:
      localStorage.setItem("typeMovie", action.typeMovie);
      return {
        ...state,
        typeMovie: action.typeMovie,
        changePage: !state.changePage,
      };
    default:
      return { ...state };
  }
};
export default authReducer;
