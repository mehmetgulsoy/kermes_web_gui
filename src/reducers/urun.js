import * as types from "../constants/actionTypes";

const initialState = {
  urun: [],
  son_trh: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_URUN_SUCCESS:
      return {
        urun: action.urun,
        son_trh: action.urun.map((urun) => urun.gnc_trh).sort()[0],
      };
    default:
      return state;
  }
};

export const get_urun = (state) => state.urun;
export const get_sontrh = (state) => state.son_trh;
