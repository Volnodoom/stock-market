export const TITLE = 'IEX Cloud stocks';
export const BACKEND_URL = 'https://api.iex.cloud/v1/data/CORE';
export const REQUEST_TIMEOUT = 5000;
export const ONE = 1;
export const PUBLIC_TOKEN = 'pk_1cb359a5931d48d5bc6abe99ccdb8597';
export const STEP = 10;
export const MINIMUM_SAVE = 4;
export const LOCAL_FORMATION = 'ru-RU';

export const NameSpace = {
  DataStocks: 'DATA_STOCKS',
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
}

export const ApiRoutes = {
  NameAndId: (token) => `/REF_DATA?token=${token}`,
  FullInfo: (token, id) => `/QUOTE,FUNDAMENTALS,NEWS/${id}?token=${token}`
}







