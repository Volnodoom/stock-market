import { NameSpace } from "utils/constants";
import { stockAdapter } from "./data-stock";
import { createSelector } from "@reduxjs/toolkit";

const baseSelector = stockAdapter.getSelectors();
export const stockInfoById = (id) => (state) => baseSelector.selectById(state[NameSpace.DataStocks],id);
export const stockInfoAll = (state) => baseSelector.selectAll(state[NameSpace.DataStocks]);
export const stockIdAll = (state) => baseSelector.selectIds(state[NameSpace.DataStocks]);
export const getInitialLoadStatus = (state) => state[NameSpace.DataStocks].initialDataStatus;
export const getFetchTotalInfoStatus = (state) => state[NameSpace.DataStocks].fetchTotalInfoStatus;
export const getCurrentPage = (state) => state[NameSpace.DataStocks].currentPage;
export const getTotalNumber = (state) => state[NameSpace.DataStocks].totalNumber;
export const xxx = (state) => state[NameSpace.DataStocks].visitedEntities;
export const getPageVisitedEntities = (page) => (state) => state[NameSpace.DataStocks].visitedEntities[page];

export const hasCurrentPageVisited = (page) => (state) => {
  const hasPage = Object.hasOwn(state[NameSpace.DataStocks].visitedEntities, page);
  const hasData = !!state[NameSpace.DataStocks].visitedEntities[page];
  return hasPage && hasData;
} ;

export const getIdListForPage = (page, limits) => createSelector(
  stockIdAll,
  hasCurrentPageVisited(page),
  getPageVisitedEntities(page),
  (allIds, hasVisited, visitedPageEntityIds) => {
    if(hasVisited) {
      return visitedPageEntityIds;
    } else {
      return allIds.slice(limits.start, limits.end);
    }
  }
)
