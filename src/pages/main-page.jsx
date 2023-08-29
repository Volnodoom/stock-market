import StockTable from "components/stock-table/stockTable";
import { useEffect } from "react";
import { TITLE } from "utils/constants";
import * as S from "./main-page.style";
import { Button } from "components/style-elements/button/button";

const MainPage = () => {

  useEffect(() => {
    document.title = TITLE;
  }, []);

  return(
    <>
      <S.MainTitle>IEX Cloud stock list</S.MainTitle>
      <S.MainSubText>A core set of financial data, all in one place</S.MainSubText>
      <S.MainContentWrapper>
        <StockTable />
        <S.MainBreadCrumbsWrapper>
          <S.BreadCrumbsText>1 - 10 of 27,585 items</S.BreadCrumbsText>
          <S.BreadCrumbsButtonWrapper>
            <Button type="button">Previous</Button>
            <Button type="button">Next</Button>
          </S.BreadCrumbsButtonWrapper>
        </S.MainBreadCrumbsWrapper>
      </S.MainContentWrapper>
    </>

  )
}

export default MainPage;
