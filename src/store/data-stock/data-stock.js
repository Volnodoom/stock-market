import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { LoadingStatus, NameSpace, ONE } from "utils/constants";
import { fetchFullCompanyInfo } from "./actions-stock";

export const stockAdapter = createEntityAdapter();

export const initialState = stockAdapter.getInitialState({
  ids: [],
  entities: {},
  visitedEntities: {},
  currentPage: ONE,
  totalNumber: null,
  initialDataStatus: LoadingStatus.Idle,
  fetchTotalInfoStatus: LoadingStatus.Idle,
});

export const dataStock = createSlice({
  name: NameSpace.DataStocks,
  initialState,
  reducers: {
    addCompanyName: stockAdapter.addOne,
    updateInfo: stockAdapter.upsertOne,
    removeData: stockAdapter.removeOne,
    clearStore: stockAdapter.removeAll,
    addVisitedEntities: (state, action) => {
      const {page, dataUpdate} = action.payload;
      state.visitedEntities = Object.assign(state.visitedEntities, {
        [page]: dataUpdate,
      })
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalNumber: (state, action) => {
      state.totalNumber = action.payload;
    },
  },
  extraReducers: (builder) =>  {
    builder
      .addCase(fetchFullCompanyInfo.pending, (state) => {
        state.fetchTotalInfoStatus = LoadingStatus.Loading;
      })
      .addCase(fetchFullCompanyInfo.fulfilled, (state) => {
        state.fetchTotalInfoStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchFullCompanyInfo.rejected, (state) => {
        state.fetchTotalInfoStatus = LoadingStatus.Failed;
      })
  }
})

export const {
  addCompanyName,
  updateInfo,
  clearStore,
  setCurrentPage,
  setTotalNumber,
  removeData,
  addVisitedEntities,
} = dataStock.actions;
