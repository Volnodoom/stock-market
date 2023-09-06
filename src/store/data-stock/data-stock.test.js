import { addCompanyName, addVisitedEntities, clearStore, dataStock, initialState, removeData, setCurrentPage, setTotalNumber, updateInfo } from "./data-stock";

const id = 'asdfjhJIUL^59fskjd';


describe('Store: DATA_STOCK', () => {
  describe('Check sliceReducer actions', () => {
    it('unknown action -- return initial state', () => {
      expect(dataStock.reducer(initialState, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
    });
    it('addCompanyName action -- update state fields: ids and entities', () => {
      expect(dataStock.reducer(initialState, addCompanyName({id, companyName: id})))
        .toEqual({
          ...initialState,
          ids: [id],
          entities: {
            [id]: {
              id,
              companyName: id,
            }
          }
        });
    });

    it('updateInfo action -- update state field: entities', () => {
      const someProperty = 'someProp';
      expect(dataStock.reducer(initialState, updateInfo({id, someProperty})))
        .toEqual({
          ...initialState,
          ids: [id],
          entities: {
            [id]: {
              id,
              someProperty,
            }
          }
        });
    });

    it('removeData action -- remove selected id', () => {
      const someProperty = 'someProp';
      const anotherProp = 'anotherPr';
      const supId = 'gsdfg54cbvvcn';
      const correctedInitState = ({
        ...initialState,
        ids: [id, supId],
        entities: {
          [id]: {
            id,
            someProperty,
            anotherProp,
          },
          [supId]: {
            supId,
            someProperty,
            anotherProp,
          }
        }
      });

      expect(dataStock.reducer(correctedInitState, removeData(id)))
        .toEqual({
          ...initialState,
          ids: [supId],
          entities: {
            [supId]: {
              supId,
              anotherProp,
              someProperty,
            }
          }
        });
    });

    it('clearStore action -- remove all fields in entities', () => {
      const someProperty = 'someProp';
      const anotherProp = 'anotherPr';
      const correctedInitState = ({
        ...initialState,
        ids: [id],
        entities: {
          [id]: {
            id,
            someProperty,
            anotherProp,
          }
        }
      });

      expect(dataStock.reducer(correctedInitState, clearStore()))
        .toEqual({
          ...initialState,
          ids: [],
          entities: {},
        });
    });

    it('addVisitedEntities action -- update visitedEntities state field', () => {
      const someProperty = {
        page: 3,
        dataUpdate: [1,2,3,4,5,6],
      };

      expect(dataStock.reducer(initialState, addVisitedEntities(someProperty)))
        .toEqual({
          ...initialState,
          visitedEntities: {
            [someProperty.page]: someProperty.dataUpdate,
          }
        });
    });

    it('setCurrentPage action -- update currentPage state field', () => {
      const currentPage = 10;

      expect(dataStock.reducer(initialState, setCurrentPage(currentPage)))
        .toEqual({
          ...initialState,
          currentPage,
        });
    });

    it('setTotalNumber action -- update currentPage state field', () => {
      const totalNumber = 10;

      expect(dataStock.reducer(initialState, setTotalNumber(totalNumber)))
        .toEqual({
          ...initialState,
          totalNumber,
        });
    });
  });
});
