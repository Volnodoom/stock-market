import { useSelector } from 'react-redux';
import { DragDropContext} from 'react-beautiful-dnd';
import TableBodyRow from "./components/table-body-row/table-body-row";
import * as S from "./stock-table.style";
import * as selector from 'store/data-stock/selectors-stock';
import { LoadingStatus, ONE, STEP } from 'utils/constants';
import { StrictModeDroppable } from 'components/strict-mode-droppable/strict-mode-droppable';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { addVisitedEntities } from 'store/data-stock/data-stock';
import { useState } from 'react';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const StockTable = ({setCurrentPageList}) => {
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const hasFetchAllCompaniesSucceeded = useSelector(selector.getFetchTotalInfoStatus) === LoadingStatus.Succeeded;
  const currentPage = useSelector(selector.getCurrentPage);

  const startLimit = (currentPage - ONE) * STEP;
  const endLimit = currentPage * STEP;

  const companiesId = useSelector(selector.getIdListForPage(currentPage, {start: startLimit, end: endLimit}));

  const onBeforeDragStart = () => {
    setIsDragging(true);
  }

  const onDragEnd = (result) => {
    setIsDragging(false);

    if (!result.destination) {
      return;
    }

    const items = reorder(
      companiesId,
      result.source.index,
      result.destination.index
    );

    dispatch(addVisitedEntities({page: currentPage, dataUpdate: items}));
  }

  return(
    <>
      {
        hasFetchAllCompaniesSucceeded
        ?
        <DragDropContext
          onDragEnd={onDragEnd}
          onBeforeDragStart={onBeforeDragStart}
        >
          <StrictModeDroppable droppableId="droppable">
            {(provided,snapshot) => (
              <S.Table
                ref={provided.innerRef}
              >
                <S.TableHead>
                  <S.TableRow>
                    <S.TableHeadCell>Company Name</S.TableHeadCell>
                    <S.TableHeadCell>Close Price (USD)</S.TableHeadCell>
                  </S.TableRow>
                </S.TableHead>
                <tbody>
                  {
                    companiesId
                      .map((value, index) => (<TableBodyRow
                        key={value}
                        stockId={value}
                        index={index}
                        isDragging={isDragging}
                      />))
                  }
                  {provided.placeholder}
                </tbody>
              </S.Table>
            )}
          </StrictModeDroppable>
        </DragDropContext>

        :
        <div>Loading...</div>
      }
    </>
  );
};

export default StockTable;
