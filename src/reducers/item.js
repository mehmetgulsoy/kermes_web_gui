import * as types from '../constants/actionTypes';

export default (state = { katagori:[] }, action) => {
	switch (action.type) {
    case types.ITEM_SAVE_BEGIN:
      return{
        ...state,
        isLoading: true,
        networkAction:true  
      }
		case types.ITEM_SAVE_SUCCESS:
			return {        
        isLoading: false,
        items: {
          ...state.items,  
          [action.item.adi]: action.item
        }  
      };
    case types.ITEM_SAVE_FAILURE:
      return{
        ...state,
        isLoading: false,
        error : action.error   
      }
    case types.MENU_KATAGORI_BEGIN:
    case types.MENU_KATAGORI_FAIL:
      return { ...state, katagori:  []};
    case types.MENU_KATAGORI_SUCCESS:
      return  { ...state, katagori:  action.katagori}; 
		default:
			return state;
	}		   
}

export const getMenuKatagori = (state) => state.katagori; 

