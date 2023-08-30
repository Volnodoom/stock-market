import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from 'utils/constants';
import { dataStock } from './data-stock/data-stock';

export const reducerRoot = combineReducers({
  [NameSpace.DataStocks]: dataStock.reducer,

});
