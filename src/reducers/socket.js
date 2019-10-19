
export default ( state={}, action ) => {    
  switch (action.type) {
    case 'EMIT_CON':
      return{
        ...state,
        connect: true,
      }  
    default:
      return state
  }
}