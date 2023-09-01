import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiAction, ApiRoutes, LoadingStatus } from "utils/constants";
import { addToken, updateTokenStatus } from "./data-log-in";

export const fetchToken = createAsyncThunk(
  ApiAction.FetchToken,
  async (token, {dispatch, getState, extra: api}) => {

    try {
      const {data} = await api.get(ApiRoutes.TokenCheck(token));
      dispatch(addToken(token));
      dispatch(updateTokenStatus(LoadingStatus.Succeeded));

    } catch (err) {
      dispatch(updateTokenStatus(LoadingStatus.Failed));
    }
  }
);
