import * as types from '../constants/actionTypes';

const saveItemBegin    = ()       => ({ type: types.ITEM_SAVE_BEGIN});
const saveItemSucces   = (item)   => ({ type: types.ITEM_SAVE_SUCCESS, item});
const saveItemFailure  = (error)  => ({ type: types.ITEM_SAVE_FAILURE, error});

export const saveItem = (item) => (dispatch, getState,axios) => {  
  dispatch(saveItemBegin());
  return Promise.resolve()  
  .then(
    ()=> dispatch(saveItemSucces(item) ),
    (error)=> dispatch(saveItemFailure(error))
  )
}

/*
export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(),filter)) {               
      return Promise.resolve();
  }
  dispatch({
      type: 'FETCH_TODOS_REQUEST',
      filter
  });
  return api.fetchTodos(filter).then(
      respons => { 
          dispatch({
              type: types.ITEM_SAVE,
              filter,
              respons,
          });
      },
      error => {
          dispatch({
              type: 'FETCH_TODOS_FAILURE',
              filter,
              message: error.message || 'Someting went wrong'
          })
      }
  ); 
}; 
*/