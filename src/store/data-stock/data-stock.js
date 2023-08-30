import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { LoadingStatus, NameSpace, ONE } from "utils/constants";

export const stockAdapter = createEntityAdapter();

export const initialState = stockAdapter.getInitialState({
  ids: [],
  entities: {},
  currentPage: ONE,
  totalNumber: null,
  initialDataStatus: LoadingStatus.Idle,
});

export const dataStock = createSlice({
  name: NameSpace.DataStocks,
  initialState,
  reducers: {
    addCompanyName: stockAdapter.addOne,
    updateInfo: stockAdapter.upsertOne,
    removeData: stockAdapter.removeOne,
    clearStore: stockAdapter.removeAll,
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalNumber: (state, action) => {
      state.totalNumber = action.payload;
    },
    setInitialDataStatus: (state, action) => {
      state.initialDataStatus = action.payload;
    },
  },
})

export const {
  addCompanyName,
  updateInfo,
  clearStore,
  setCurrentPage,
  setTotalNumber,
  setInitialDataStatus,
} = dataStock.actions;
