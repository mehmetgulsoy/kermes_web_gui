import * as types from "../constants/actionTypes";

export default (state = {isLoading: false, msg: '', error: false, meta:{}}, action) => {
	switch (action.type) {
    case  types.NETWORK_REQUEST_BEGIN:
      return{        
        isLoading: true,
        error: false,
        msg:'',
        last_at : new Date(),  
        meta: {          
          begin_at: new Date()
        }   
      }
		case types.NETWORK_REQUEST_END:
			return {               
        isLoading: false,
        error: action.error || false,
        msg: action.msg || '',
        last_at : new Date(),
        meta: {            
          sure: new Date() - state.meta.begin_at   || 0,
        } 
      };    
		default:
			return state;
	}		   
}

export function getResponce(state) {
  return state;
}

export function getIsFetching(state) {
  return state.isLoading && new Date() - state.last_at < 5000;
}
