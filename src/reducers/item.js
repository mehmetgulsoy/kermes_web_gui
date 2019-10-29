import * as types from '../constants/actionTypes';

export default (state = { katagori:[], items : {} }, action) => {
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
      return  { ...state, katagori:  action.katagori};   
    case types.ITEM_SAVE_FAILURE:       
    case types.MENU_KATAGORI_BEGIN:
    case types.MENU_KATAGORI_FAIL:
      return state;

		default:
			return state;
	}		   
}

export const getMenuKatagori = (state) => state.katagori; 
export const getMenuItems = (state) => state.items; 
