import { NameSpace } from "utils/constants";
import { stockAdapter } from "./data-stock";

const baseSelector = stockAdapter.getSelectors();
export const stockInfoById = (id) => (state) => baseSelector.selectById(state[NameSpace.DataStocks],id);
export const stockInfoAll = (state) => baseSelector.selectAll(state[NameSpace.DataStocks]);
export const stockIdAll = (state) => baseSelector.selectIds(state[NameSpace.DataStocks]);
export const getInitialLoadStatus = (state) => state[NameSpace.DataStocks].initialDataStatus;
export const getCurrentPage = (state) => state[NameSpace.DataStocks].currentPage;
export const getTotalNumber = (state) => state[NameSpace.DataStocks].totalNumber;
