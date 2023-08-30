import { useEffect } from "react";
import { useSelector } from "react-redux";
import StockTable from "components/stock-table/stockTable";
import { LOCAL_FORMATION, LoadingStatus, ONE, STEP } from "utils/constants";
import * as S from "./main-page.style";
import { Button } from "components/style-elements/button/button";
import { useAppDispatch } from "hooks/use-app-dispatch";
import * as selector from "store/data-stock/selectors-stock";
import { setCurrentPage } from "store/data-stock/data-stock";
import { fetchCompanyIdAndNameAction } from "store/data-stock/actions-stock";

const MainPage = () => {
  const dispatch = useAppDispatch();

  const currentPage = useSelector(selector.getCurrentPage);
  const totalNumber = useSelector(selector.getTotalNumber);
  const isSucceedInitialization = useSelector(selector.getInitialLoadStatus) === LoadingStatus.Succeeded;

  const startLimit = (currentPage - ONE) * STEP + ONE;
  const endLimit = currentPage * STEP;

  console.log(useSelector(selector.stockInfoAll))

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
        isSucceedInitialization ?
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
                <Button type="button" onClick={handleNextButtonClick}>Next</Button>
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
