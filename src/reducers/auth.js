import * as types from '../constants/actionTypes';

export default (state = {isAuthenticated: false, userName: '' }, action) => {
	switch (action.type) {
    case types.USER_AUTH_SUCCESS:
      return{         
        isAuthenticated: true,
        userName: action.userName, 
      }
		case types.USER_AUTH_FAILURE:
			return {        
        isAuthenticated: false,
        userName: '',  
      };
		default:
			return state;
	}		   
}