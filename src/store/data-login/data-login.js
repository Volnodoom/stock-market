import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus, NameSpace } from "utils/constants";
import { fetchToken } from "./actions-login";


export const initialState = {
  token: null,
  fetchTokenStatus: LoadingStatus.Idle,
};

export const dataToken = createSlice({
  name: NameSpace.DataToken,
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    updateTokenStatus: (state, action) => {
      state.fetchTokenStatus = action.payload;
    },
  },
  extraReducers: (builder) =>  {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.fetchTokenStatus = LoadingStatus.Loading;
      })
      .addCase(fetchToken.rejected, (state) => {
        state.fetchTokenStatus = LoadingStatus.Failed;
      })
  }
})

export const {
  addToken,
  updateTokenStatus,
} = dataToken.actions;

export const getToken = (state) => state[NameSpace.DataToken].token;
export const getTokenStatus = (state) => state[NameSpace.DataToken].fetchTokenStatus;
