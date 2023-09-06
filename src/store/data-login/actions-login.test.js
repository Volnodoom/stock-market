import { createAPI } from "services/api";
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from "@jedmao/redux-mock-store";
import { ApiRoutes, LoadingStatus, NameSpace } from "utils/constants";
import { createMockStateWithoutToken } from "utils/mock-data";
import { faker } from "@faker-js/faker";
import { fetchToken } from "./actions-login";
import { addToken, dataToken, updateTokenStatus } from "./data-login";

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

describe('Actions Data log in', () => {
  describe('Check async action: fetchToken', () => {
    it('fetchToken -- on success (200): DISPATCH addToken and updateTokenStatus actions.', async () => {
      const mockState = createMockStateWithoutToken();
      const store = mockStore(mockState);
      const token = faker.string.alpha({length: {min: 10, max: 25}});

      mockAPI
        .onGet(ApiRoutes.TokenCheck(token))
        .reply(200, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchToken(token));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(addToken.type);
      expect(actions).toContain(updateTokenStatus.type);
    });
    it('fetchToken -- on pending: UPDATE fetchTokenStatus to loading.', async () => {
      const mockState = createMockStateWithoutToken();

      const actionLoading = {
        type: fetchToken.pending.type,
      };

      expect(dataToken.reducer(mockState[NameSpace.DataToken], actionLoading).fetchTokenStatus)
        .toBe(LoadingStatus.Loading);
    });

    it('fetchToken -- on fail: DISPATCH updateTokenStatus action.', async () => {
      const mockState = createMockStateWithoutToken();
      const store = mockStore(mockState);
      const token = faker.string.alpha({length: {min: 10, max: 25}});

      const actionFail = {
        type: fetchToken.rejected.type,
      };

      mockAPI
        .onGet(ApiRoutes.TokenCheck(token))
        .reply(400, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchToken(token));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).not.toContain(addToken.type);
      expect(actions).toContain(updateTokenStatus.type);
      expect(dataToken.reducer(mockState[NameSpace.DataToken], actionFail).fetchTokenStatus)
      .toBe(LoadingStatus.Failed);
    });
  });
})
