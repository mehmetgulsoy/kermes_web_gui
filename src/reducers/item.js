import * as types from '../constants/actionTypes';

export default (state = {isLoading: false, items: {}}, action) => {
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
		default:
			return state;
	}		   
}

