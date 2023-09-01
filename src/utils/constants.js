export const TITLE = 'IEX Cloud stocks';
export const BACKEND_URL = 'https://api.iex.cloud/v1/data/CORE';
export const REQUEST_TIMEOUT = 5000;
export const CLICK_DELAY = 600;
export const ONE = 1;
export const STEP = 10;
export const MINIMUM_SAVE = 4;
export const LOCAL_FORMATION = 'ru-RU';

export const NameSpace = {
  DataStocks: 'DATA_STOCKS',
  DataToken: 'DATA_TOKEN',
};

export const LoadingStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Succeeded: 'succeeded',
  Failed: 'failed',
};

export const ApiAction = {
  FetchNameAndId: 'stock/fetchNameAndId',
  FetchFullInfo: 'stock/fetchFullInfo',
  FetchToken: 'token/fetchToken',
}

export const ApiRoutes = {
  NameAndId: (token) => `/REF_DATA?token=${token}`,
  FullInfo: (token, id) => `/QUOTE,FUNDAMENTALS,NEWS/${id}?token=${token}`,
  TokenCheck: (token) => `/QUOTE/MSFT/?token=${token}`,
}

export const StockInfoDefinition = {
  CashPaidForInterest: 'Cash paid for interest, a data point disclosed on the cash flow statement or in the notes.',
  PricePerEarnings: 'Traditional P/E multiple',
  StockPreferredEquity: 'Preferred stock, from the shareholders equity section of the balance sheet.',
  ProfitGross: 'Gross Profit',
  EbitdaReported: 'Reported operating earnings before interest, taxes, depreciation and amortization. This version of EBITDA uses only reported data from the income statment and is not adjusted for unusual gains/losses found only in the footnotes or MD&A.',
}





