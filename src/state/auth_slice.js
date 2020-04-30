import { createSlice } from "@reduxjs/toolkit";

export const auth_slice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userName: "",
    firma: "",
  },
  reducers: {
    login: {
      reducer(state, action) {
        const { userName, firma } = action.payload;
        state.isAuthenticated = true;
        state.userName = userName;
        state.firma = firma;
      },
      prepare(userName, firma) {
        return { payload: { userName, firma } };
      },
    },
    logout(state, action) {
      state = this.initialState;
      // state.isAuthenticated = "";
      // state.userName = "";
      // state.firma = "";
    },
  },
});

/*
const selectTodos = state => state.todos
const selectFilter = state => state.visibilityFilter
const selectVisibleTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todos
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(t => t.completed)
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + filter)
    }
  }
)
export const { login, logout } = auth_slice.actions;
export default auth_slice.reducer;
*/
