import * as types from '../constants/actionTypes';

export default (state = {isAuthenticated: false, userName: '' }, action) => {
	switch (action.type) {
    case types.USER_AUTH:
      return{         
        isAuthenticated: action.isAuthenticated,
        userName: action.userName,
        firma: '',
      }
		default:
			return state;
	}		   
}

export const getisAuthenticated = (state) => state.isAuthenticated;
export const getUserName = (state) => state.getUserName;
export const getFirma = (state) => state.firma;

