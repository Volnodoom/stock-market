import { addToken, dataToken, initialState, updateTokenStatus } from "./data-login";
import { LoadingStatus } from "utils/constants";


describe('Store: DATA_LOGIN', () => {
  describe('Check sliceReducer actions', () => {
    it('unknown action -- return initial state', () => {
      expect(dataToken.reducer(initialState, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
    });
    it('addToken action -- update state field: token', () => {
      const token = 'asdfjhJIUL^59fskjd';
      expect(dataToken.reducer(initialState, addToken(token)))
        .toEqual({
          ...initialState,
            token: token,
        });
    });

    it('updateTokenStatus action -- update state field: fetchTokenStatus', () => {
      const status = LoadingStatus.Loading;
      expect(dataToken.reducer(initialState, updateTokenStatus(status)))
        .toEqual({
          ...initialState,
            fetchTokenStatus: status,
        });
    });
  });
});
