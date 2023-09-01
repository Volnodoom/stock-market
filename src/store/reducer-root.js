import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from 'utils/constants';
import { dataStock } from './data-stock/data-stock';
import { dataToken } from './data-log-in/data-log-in';

export const reducerRoot = combineReducers({
  [NameSpace.DataStocks]: dataStock.reducer,
  [NameSpace.DataToken]: dataToken.reducer,

});
