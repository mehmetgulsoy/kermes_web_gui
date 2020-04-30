import { createSlice } from "@reduxjs/toolkit";

export const ui_slice = createSlice({
  name: "ui",
  initialState: {
    is_loading: false,
    error: false,
    msg: "",
  },
  reducers: {
    loading_begin: {
      reducer(state, action) {
        state.is_loading = true;
      },
    },
    loading_end: {
      reducer(state, action) {
        state.is_loading = false;
      },
    },
    display_msg: {
      reducer(state, action) {
        const { error, msg } = action.payload;
        state.error = error;
        state.msg = msg;
      },
      prepare(error, msg) {
        return { payload: { error, msg } };
      },
    },
    clear_msg: {
      reducer(state, action) {
        state.error = false;
        state.msg = "";
      },
    },
  },
});

export const select_is_loading = (state) => state.is_loading;
export const select_error = (state) => state.is_loading;
export const select_msg = (state) => state.is_loading;
