import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiAction, ApiRoutes, LoadingStatus, MINIMUM_SAVE, NameSpace, ONE, PUBLIC_TOKEN, STEP } from "utils/constants";
import { addCompanyName, updateInfo, setInitialDataStatus, setTotalNumber } from "./data-stock";

export const fetchFullCompanyInfo = createAsyncThunk(
  ApiAction.FetchFullInfo,
  async (idListString, {dispatch, getState, extra: api}) => {
    const currentNumberOfCompanies = getState()[NameSpace.DataStocks].ids.length;
    const isInitialization = currentNumberOfCompanies === MINIMUM_SAVE * STEP;

    try {
      const {data} = await api.get(ApiRoutes.FullInfo(PUBLIC_TOKEN, idListString));
      data.forEach((info, index) => {
        const id = info.symbol;
        if(!id) {
          return null;
        }
        if(info.iexClose) {
          dispatch(updateInfo({id, price: info.iexClose}));
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

        // change loading status during initialization
        if(isInitialization && (data.length - 1 === index)) {
          dispatch(setInitialDataStatus(LoadingStatus.Succeeded))
        }

      })
    } catch (err) {
      throw err;
    }
  }
);

export const fetchCompanyIdAndNameAction = createAsyncThunk(
  ApiAction.FetchNameAndId,
  async (currentPage = ONE, {dispatch, getState, extra: api}) => {
    const currentNumberOfCompanies = getState()[NameSpace.DataStocks].ids.length;
    const isInitialization = currentNumberOfCompanies === 0;
    const isRequireFetch = currentPage * STEP >= currentNumberOfCompanies;
    const endLimit = currentPage * STEP * MINIMUM_SAVE;
    let startLimit;

    if(isInitialization) {
      startLimit = 0;
    } else {
      startLimit = currentPage * STEP;
    }

    try {
      if(!isInitialization && !isRequireFetch) {
        return;
      }

      const {data} = await api.get(ApiRoutes.NameAndId(PUBLIC_TOKEN));
      const idListString = data.map((info) => info.symbol).slice(startLimit, endLimit).toString();

      if(isInitialization) {
        console.log('initialization');

        data
          .slice(startLimit, endLimit)
          .forEach((info) => {
            dispatch(addCompanyName({id: info.symbol, companyName: info.name,}))
          })

        dispatch(setTotalNumber(data.length));
        dispatch(fetchFullCompanyInfo(idListString));
      } else {
        if(isRequireFetch) {
          console.log(`tada ${currentPage}`);

          data
            .slice(currentNumberOfCompanies, currentPage * STEP * MINIMUM_SAVE)
            .forEach((info) => {
              dispatch(addCompanyName({id: info.symbol, companyName: info.name,}))
          })

          dispatch(fetchFullCompanyInfo(idListString));
        }
      }
    } catch (err) {
      if(currentNumberOfCompanies === 0) {
        dispatch(setInitialDataStatus(LoadingStatus.Failed))
      }
      throw err;
    }
  }
)
