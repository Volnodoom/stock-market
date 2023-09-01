import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiAction, ApiRoutes, MINIMUM_SAVE, NameSpace, ONE, STEP } from "utils/constants";
import { addCompanyName, updateInfo, setTotalNumber, removeData } from "./data-stock";

export const fetchFullCompanyInfo = createAsyncThunk(
  ApiAction.FetchFullInfo,
  async (idListString, {dispatch, getState, extra: api}) => {
    const deleteIds = [];
    const publicToken = getState()[NameSpace.DataToken].token;

    try {
      const {data} = await api.get(ApiRoutes.FullInfo(publicToken, idListString));
      data.forEach((info, index) => {
        const id = info.symbol;
        if(!id) {
          return null;
        }
        if(info.iexClose) {
          dispatch(updateInfo({id, price: info.iexClose}));
        }
        if(info.iexClose === null) {
          deleteIds.push(id)
        }
        if(info.ebitdaReported) {
          dispatch(updateInfo({id, ebitdaReported: info.ebitdaReported}));
        }
        if(info.profitGross) {
          dispatch(updateInfo({id, profitGross: info.profitGross}));
        }
        if(info.stockPreferredEquity) {
          dispatch(updateInfo({id, stockPreferredEquity: info.stockPreferredEquity}));
        }
        if(info.pricePerEarnings) {
          dispatch(updateInfo({id, pricePerEarnings: info.pricePerEarnings}));
        }
        if(info.cashPaidForInterest) {
          dispatch(updateInfo({id, cashPaidForInterest: info.cashPaidForInterest}));
        }
        if(info.headline) {
          dispatch(updateInfo({id, headline: info.headline}));
        }
        if(info.url) {
          dispatch(updateInfo({id, url: info.url}));
        }
      })

      // remove lines without price tag
      deleteIds.forEach((id) => dispatch(removeData(id)));

    } catch (err) {
      throw err;
    }
  }
);

export const fetchCompanyIdAndNameAction = createAsyncThunk(
  ApiAction.FetchNameAndId,
  async (currentPage = ONE, {dispatch, getState, extra: api}) => {
    const publicToken = getState()[NameSpace.DataToken].token;
    const currentNumberOfCompanies = getState()[NameSpace.DataStocks].ids.length;
    const isInitialization = currentNumberOfCompanies === 0;
    const isRequireFetch = currentPage * STEP >= currentNumberOfCompanies;
    let startLimit;

    if(isInitialization) {
      startLimit = 0;
    } else {
      startLimit = currentPage * STEP;
    }

    const endLimit = startLimit + MINIMUM_SAVE * STEP;

    try {
      if(!isInitialization && !isRequireFetch) {
        return;
      }

      const {data} = await api.get(ApiRoutes.NameAndId(publicToken));
      const idListString = data.map((info) => info.symbol).slice(startLimit, endLimit).toString();

      if(isInitialization) {
        data
          .slice(startLimit, endLimit)
          .forEach((info) => {
            dispatch(addCompanyName({id: info.symbol, companyName: info.name,}))
          })

        dispatch(setTotalNumber(data.length));
        dispatch(fetchFullCompanyInfo(idListString));
      } else {
        if(isRequireFetch) {
          data
            .slice(startLimit, endLimit)
            .forEach((info) => {
              dispatch(addCompanyName({id: info.symbol, companyName: info.name,}))
          })

          dispatch(fetchFullCompanyInfo(idListString));
        }
      }
    } catch (err) {
      throw err;
    }
  }
)
