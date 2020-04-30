import { createSlice, createSelector } from "@reduxjs/toolkit";

let initialState = {
  bolgeler: [],
  son_trh: "",
};

export const bolge_slice = createSlice({
  name: "bolge",
  initialState,
  reducers: {
    add: {
      reducer(state, action) {
        const { bolge } = action.payload;
        state.bolgelar.push(...bolge);
      },
      prepare(bolge) {
        return { payload: { bolge } };
      },
    },
    fetch: {
      reducer(state, action) {
        const { bolge } = action.payload;
        state.bolgeler = bolge;
      },
      prepare(bolge) {
        return { payload: { bolge } };
      },
    },
    update: {
      reducer(state, action) {
        const { bolge } = action.payload;
        const item = state.bolgelar.find((n) => n.ad === bolge.ad);
        item.ad = bolge.ad;
      },
      prepare(bolge) {
        return { payload: { bolge } };
      },
    },
    delete: {
      reducer(state, action) {
        const { bolge } = action.payload;
        state.bolgelar.splice(
          state.bolgelar.findIndex((n) => n.ad === bolge.ad),
          1
        );
      },
      prepare(bolge) {
        return { payload: { bolge } };
      },
    },
  },
});

export const select_bolgeler = createSelector(
  (state) => state.entities.bolge.bolgeler,
  (state) => state
);
