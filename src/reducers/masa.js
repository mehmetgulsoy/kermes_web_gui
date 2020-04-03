import * as types from "../constants/actionTypes";

const initialState = {
  masa: [],
  son_trh: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MASA_BEGIN:
    case types.FETCH_MASA_FAIL:
      return {
        ...initialState
      };
    case types.FETCH_MASA_SUCCESS:
      return {
        masa: action.masa,
        son_trh: action.masa.map(masa => masa.gnc_trh).sort()[0]
      };
    default:
      return state;
  }
};

export const getMasa = state => state.masa;
export const getSon_trh = state => state.son_trh;
