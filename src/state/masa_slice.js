import { createSlice, createSelector } from "@reduxjs/toolkit";

let initialState = {
  masalar: [],
  son_trh: "",
};

export const masa_slice = createSlice({
  name: "masa",
  initialState,
  reducers: {
    add: {
      reducer(state, action) {
        const { masa } = action.payload;
        state.masalar.push(...masa);
      },
      prepare(masa) {
        return { payload: { masa } };
      },
    },
    fetch: {
      reducer(state, action) {
        const { masa } = action.payload;
        state.masalar = masa;
      },
      prepare(masa) {
        return { payload: { masa } };
      },
    },
    update: {
      reducer(state, action) {
        const { masa } = action.payload;
        const item = state.masalar.find((n) => n.ad === masa.ad);
        item.ad = masa.ad;
      },
      prepare(masa) {
        return { payload: { masa } };
      },
    },
    delete: {
      reducer(state, action) {
        const { masa } = action.payload;
        state.masalar.splice(
          state.masalar.findIndex((n) => n.ad === masa.ad),
          1
        );
      },
      prepare(masa) {
        return { payload: { masa } };
      },
    },
  },
});

export const select_masalar = createSelector(
  (state) => state.entities.masa.masalar,
  (state) => state
);
