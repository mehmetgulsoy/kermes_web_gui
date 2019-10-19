export const NETWORK_REQUEST_BEGIN   = 'NETWORK_REQUEST_BEGIN';
export const NETWORK_REQUEST_END   = 'NETWORK_REQUEST_END'; 

export default (state = {isLoading: false, msg: '', error: false, meta:{}}, action) => {
	switch (action.type) {
    case  NETWORK_REQUEST_BEGIN:
      return{        
        isLoading: true,
        error: false,
        msg:'',  
        meta: {          
          begin_at: new Date()
        }   
      }
		case NETWORK_REQUEST_END:
			return {               
        isLoading: false,
        error: action.error || false,
        msg: action.msg || '',
        meta: {            
          sure: new Date() - state.meta.begin_at   || 0,
        } 
      };    
		default:
			return state;
	}		   
}
