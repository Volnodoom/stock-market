import { createAPI } from "services/api";
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from "@jedmao/redux-mock-store";
import { createMockStateWithToken, generateIdsList, makeServerMockAdditionalInfo, makeSingleServerMockAdditionalInfo } from "utils/mock-data";
import { fetchCompanyIdAndNameAction, fetchFullCompanyInfo } from "./actions-stock";
import { ApiRoutes, LoadingStatus, NameSpace } from "utils/constants";
import { addCompanyName, dataStock, removeData, setTotalNumber, updateInfo } from "./data-stock";

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const idsList = generateIdsList(10);

describe('Actions Stock', () => {
  describe('Check async action: fetchFullCompanyInfo', () => {
    it('fetchFullCompanyInfo -- on success (200): DISPATCH updateInfo action and change fetchTotalInfoStatus to Succeed when all data provided', async () => {
      const mockState = createMockStateWithToken();
      const store = mockStore(mockState);
      const mockServerAdditionalInfoData = makeServerMockAdditionalInfo(idsList);
      const token = mockState[NameSpace.DataToken].token;

      const actionFulfilled = {
        type: fetchFullCompanyInfo.fulfilled.type,
      };

      mockAPI
        .onGet(ApiRoutes.FullInfo(token, idsList))
        .reply(200, mockServerAdditionalInfoData);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFullCompanyInfo(idsList));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(updateInfo.type);
      expect(actions).toContain(fetchFullCompanyInfo.fulfilled.type);

      expect(dataStock.reducer(mockState[NameSpace.DataStocks], actionFulfilled).fetchTotalInfoStatus)
        .toBe(LoadingStatus.Succeeded);
    });

    it('fetchFullCompanyInfo -- on success (200): DISPATCH updateInfo, removeData action and change fetchTotalInfoStatus to Succeed when there is a lack of a price filed in receiving data.', async () => {
      const mockState = createMockStateWithToken();
      const store = mockStore(mockState);
      const mockServerAdditionalInfoData = makeServerMockAdditionalInfo(idsList, false);
      const token = mockState[NameSpace.DataToken].token;


      const actionFulfilled = {
        type: fetchFullCompanyInfo.fulfilled.type,
      };

      mockAPI
        .onGet(ApiRoutes.FullInfo(token, idsList))
        .reply(200, mockServerAdditionalInfoData);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFullCompanyInfo(idsList));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(updateInfo.type);
      expect(actions).toContain(removeData.type);
      expect(actions).toContain(fetchFullCompanyInfo.fulfilled.type);

      expect(dataStock.reducer(mockState[NameSpace.DataStocks], actionFulfilled).fetchTotalInfoStatus)
        .toBe(LoadingStatus.Succeeded);
    });

    it('fetchFullCompanyInfo -- on pending: UPDATE fetchTotalInfoStatus to loading.', async () => {
      const mockState = createMockStateWithToken();

      const actionLoading = {
        type: fetchFullCompanyInfo.pending.type,
      };

      expect(dataStock.reducer(mockState[NameSpace.DataStocks], actionLoading).fetchTotalInfoStatus)
        .toBe(LoadingStatus.Loading);
    });

    it('fetchFullCompanyInfo -- on fail: UPDATE fetchTotalInfoStatus to failed.', async () => {
      const mockState = createMockStateWithToken();

      const actionFailed = {
        type: fetchFullCompanyInfo.rejected.type,
      };

      expect(dataStock.reducer(mockState[NameSpace.DataStocks], actionFailed).fetchTotalInfoStatus)
        .toBe(LoadingStatus.Failed);
    });
  });
  describe('Check async action: fetchCompanyIdAndNameAction', () => {
    it('fetchCompanyIdAndNameAction -- on success (200): when app is initializing -- UPDATE: store totalNumber fields, DISPATCH: setTotalNumber, fetchFullCompanyInfo, addCompanyName actions.', async () => {
      const mockState = createMockStateWithToken();
      const store = mockStore(mockState);
      const token = mockState[NameSpace.DataToken].token;

      mockAPI
        .onGet(ApiRoutes.NameAndId(token))
        .reply(200, idsList);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchCompanyIdAndNameAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(addCompanyName.type);
      expect(actions).toContain(setTotalNumber.type);
      expect(actions).toContain(fetchFullCompanyInfo.pending.type);
    });

    it('fetchCompanyIdAndNameAction -- on success (200): when app has been initialized and it is required to load new sets of ids -- DISPATCH: fetchFullCompanyInfo, addCompanyName actions.', async () => {
      const mockState = createMockStateWithToken();
      const idsFirstSet = generateIdsList(100);
      const stateWithOtherPage = Object.assign(mockState,{
        [NameSpace.DataStocks]: {
          ...mockState[NameSpace.DataStocks],
          ids: idsList,
          currentPage: 3,
        },
      })
      const store = mockStore(stateWithOtherPage);
      const token = mockState[NameSpace.DataToken].token;

      mockAPI
        .onGet(ApiRoutes.NameAndId(token))
        .reply(200, idsFirstSet);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchCompanyIdAndNameAction(4));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(addCompanyName.type);
      expect(actions).not.toContain(setTotalNumber.type);
      expect(actions).toContain(fetchFullCompanyInfo.pending.type);
    });

    it('fetchCompanyIdAndNameAction: when app has been initialized and it dos NOT required loading of new id` sets of ids, NO DISPATCH actions.', async () => {
      const mockState = createMockStateWithToken();
      const idsFirstSet = generateIdsList(50);
      const stateWithOtherPage = Object.assign(mockState,{
        [NameSpace.DataStocks]: {
          ...mockState[NameSpace.DataStocks],
          ids: idsFirstSet,
          currentPage: 1,
        },
      })
      const store = mockStore(stateWithOtherPage);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchCompanyIdAndNameAction(2));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).not.toContain(addCompanyName.type);
      expect(actions).not.toContain(setTotalNumber.type);
      expect(actions).not.toContain(fetchFullCompanyInfo.pending.type);
    });
  });
})
