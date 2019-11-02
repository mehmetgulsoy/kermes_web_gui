import * as types from "../constants/actionTypes";

export default (state = { katagori: [], items: {} }, action) => {
  switch (action.type) {
    case types.ITEM_SAVE_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.item.adi]: action.item
        }
      };
    case types.MENU_KATAGORI_SUCCESS:
      return { ...state, katagori: action.katagori };

    case types.FETCH_URUNLER_SUCCESS:
      let items = {};
      action.items.map(val => (items[val.urun] = val));
      return {
        ...state,
        items: { ...items }
      };
    case types.FETCH_URUNLER_BEGIN:
    case types.FETCH_URUNLER_FAIL:
    case types.ITEM_SAVE_FAILURE:
    case types.MENU_KATAGORI_BEGIN:
    case types.MENU_KATAGORI_FAIL:
      return state;

    default:
      return state;
  }
};

export const getMenuKatagori = globalstate => globalstate.item.katagori;
export const getMenuItems = globalstate => globalstate.item.items;
