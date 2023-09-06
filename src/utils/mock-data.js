import { faker } from '@faker-js/faker';
import { initialState as initialStateStock } from "store/data-stock/data-stock"
import { LoadingStatus, NameSpace, ONE } from "./constants"
import { initialState as initialStateToken } from 'store/data-login/data-login';

export const createMockStateWithToken = () => ({
  [NameSpace.DataStocks]: {
    ...initialStateStock,
  },
  [NameSpace.DataToken]: {
    ...initialStateToken,
    token: 'pk_13223refadsf35243rfasdfsd',
    fetchTokenStatus: LoadingStatus.Succeeded,
  }
});

export const createMockStateWithFailToken = () => ({
  [NameSpace.DataStocks]: {
    ...initialStateStock,
  },
  [NameSpace.DataToken]: {
    ...initialStateToken,
    token: 'pk_13223refadsf35243rfasdfsd',
    fetchTokenStatus: LoadingStatus.Failed,
  }
});

export const createMockStateWithoutToken = () => ({
  [NameSpace.DataStocks]: {
    ...initialStateStock,
  },
  [NameSpace.DataToken]: {
    ...initialStateToken,
  }
});

const generateOneEntity = (fullDataObj) => {
  return ({
  [fullDataObj.symbol]: {
    id: fullDataObj.symbol,
    companyName: fullDataObj.symbol,
    price: fullDataObj.iexClose,
    ebitdaReported: fullDataObj.ebitdaReported,
    profitGross: fullDataObj.profitGross,
    stockPreferredEquity: fullDataObj.stockPreferredEquity,
    pricePerEarnings: fullDataObj.pricePerEarnings,
    cashPaidForInterest: fullDataObj.cashPaidForInterest,
    headline: fullDataObj.headline,
    url: fullDataObj.url,
  }
})}

export const generateInitialStateWithObject = (fullDataObj) => {
  return ({
    [NameSpace.DataStocks]: {
      ids: [fullDataObj.symbol],
      entities: generateOneEntity(fullDataObj),
      visitedEntities: {},
      currentPage: ONE,
      totalNumber: 5000,
      initialDataStatus: LoadingStatus.Succeeded,
      fetchTotalInfoStatus: LoadingStatus.Succeeded,
    },
    [NameSpace.DataToken]: {
      token: 'pk_13223refadsf35243rfasdfsd',
      fetchTokenStatus: LoadingStatus.Succeeded,
    }
  })
}

export const generateIdsList = (numberElements) => Array.from({length: numberElements},
  (line) => faker.string.alpha({length: {min: 1, max: 5}, casing: 'upper'}));

export const makeSingleServerMockAdditionalInfo = (id, isAllFieldsPresented, index) => {
  const fakeFloatNumber = () => faker.number.float({min: 100_000, max: 1_000_000});
  const result = {
    symbol: id,
    iexClose: isAllFieldsPresented ? fakeFloatNumber() : index === 1 ? null : fakeFloatNumber(),
    ebitdaReported: fakeFloatNumber(),
    profitGross: fakeFloatNumber(),
    stockPreferredEquity: fakeFloatNumber(),
    pricePerEarnings: fakeFloatNumber(),
    cashPaidForInterest: fakeFloatNumber(),
    headline: faker.lorem.lines(1),
    url: faker.lorem.lines(1),
  }

  return result;
}

export const makeServerMockAdditionalInfo = (idsList, isAllFieldsPresented = true) => Array.from(idsList,
  (line, index) => makeSingleServerMockAdditionalInfo(line, isAllFieldsPresented, index));



