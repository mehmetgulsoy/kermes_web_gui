import * as types from "../constants/actionTypes";

const initialState = {
  bolge: [],
  son_trh: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_BOLGE_SUCCESS:
      return {
        bolge: action.bolge,
      };
    case types.INS_BOLGE_SUCCESS:
      return {
        bolge: [...state.bolge, action.bolge],
      };
    case types.DEL_BOLGE_SUCCESS:
      return {
        bolge: state.bolge.filter((blg) => blg.bolge !== action.bolge),
      };
    default:
      return state;
  }
};

export const getBolge = (state) => state.bolge;
export const getSon_trh = (state) => state.son_trh;
