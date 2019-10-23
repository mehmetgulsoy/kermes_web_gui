import * as types from '../constants/actionTypes';

export default (state = {isAuthenticated: false, userName: '' }, action) => {
	switch (action.type) {
    case types.USER_AUTH:
      return{         
        isAuthenticated: action.isAuthenticated,
        userName: action.userName, 
      }
		default:
			return state;
	}		   
}