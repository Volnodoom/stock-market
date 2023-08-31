import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import StockTable from "components/stock-table/stockTable";
import { CLICK_DELAY, LOCAL_FORMATION, LoadingStatus, ONE, STEP } from "utils/constants";
import * as S from "./main-page.style";
import { Button } from "components/style-elements/button/button";
import { useAppDispatch } from "hooks/use-app-dispatch";
import * as selector from "store/data-stock/selectors-stock";
import { setCurrentPage } from "store/data-stock/data-stock";
import { fetchCompanyIdAndNameAction } from "store/data-stock/actions-stock";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const timerId = useRef();

  const currentPage = useSelector(selector.getCurrentPage);
  const totalNumber = useSelector(selector.getTotalNumber);
  const hasFetchAllCompaniesSucceeded = useSelector(selector.getFetchTotalInfoStatus) === LoadingStatus.Succeeded;

  const startLimit = (currentPage - ONE) * STEP + ONE;
  const endLimit = currentPage * STEP;

  const holdClick = useCallback((callback, delay) => {
    return function (...args) {
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        callback(args[0]);
      }, delay);
    }
  }, []);

  const handleNextButtonClick = () => {
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(fetchCompanyIdAndNameAction(currentPage + 1));
  }

  const handlePreviousButtonClick = () => {
    dispatch(setCurrentPage(currentPage - 1))
  }

  return(
    <>
      <S.MainTitle>IEX Cloud stock list</S.MainTitle>
      <S.MainSubText>A core set of financial data, all in one place</S.MainSubText>
      {
        hasFetchAllCompaniesSucceeded ?
          <S.MainContentWrapper>
            <StockTable />
            <S.MainBreadCrumbsWrapper>
              <S.BreadCrumbsText>{startLimit} - {endLimit} of {totalNumber.toLocaleString(LOCAL_FORMATION)} items</S.BreadCrumbsText>
              <S.BreadCrumbsButtonWrapper>
                {
                  currentPage !== ONE ?
                    <Button type="button" onClick={handlePreviousButtonClick}>Previous</Button>
                  :
                    <></>
                }
                <Button
                  type="button"
                  onClick={holdClick(handleNextButtonClick, CLICK_DELAY)}
                >Next</Button>
              </S.BreadCrumbsButtonWrapper>
            </S.MainBreadCrumbsWrapper>
          </S.MainContentWrapper>
        :
          <div>Loading...</div>
      }
    </>

  )
}

export default MainPage;
