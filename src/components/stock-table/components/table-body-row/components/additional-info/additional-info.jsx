import { useSelector } from "react-redux";
import * as S from "./additional-info.style";
import * as selector from "store/data-stock/selectors-stock";
import { LOCAL_FORMATION, StockInfoDefinition } from "utils/constants";

const AdditionalInfo = ({stockId, isShown}) => {
  const {
    ebitdaReported,
    profitGross,
    stockPreferredEquity,
    pricePerEarnings,
    cashPaidForInterest,
    headline,
    url,
  } = useSelector(selector.stockInfoById(stockId));

  return(
    <S.AdditionalInfoWrapper $isShown={isShown}>
      {
        cashPaidForInterest ?
          <S.AdditionalInfoItem>
            <dt><dfn title={StockInfoDefinition.CashPaidForInterest}>Cash Paid For Interest</dfn></dt>
            <dd>{cashPaidForInterest.toLocaleString(LOCAL_FORMATION)}</dd>
          </S.AdditionalInfoItem>
        :
        <></>
      }
      {
        pricePerEarnings ?
        <S.AdditionalInfoItem>
          <dt><dfn title={StockInfoDefinition.PricePerEarnings}>Price Per Earnings</dfn></dt>
          <dd>{pricePerEarnings.toLocaleString(LOCAL_FORMATION)}</dd>
        </S.AdditionalInfoItem>
        :
        <></>
      }
      {
        stockPreferredEquity ?
        <S.AdditionalInfoItem>
          <dt><dfn title={StockInfoDefinition.StockPreferredEquity}>Stock Preferred Equity</dfn></dt>
          <dd>{stockPreferredEquity.toLocaleString(LOCAL_FORMATION)}</dd>
        </S.AdditionalInfoItem>
        :
        <></>
      }
      {
        profitGross ?
        <S.AdditionalInfoItem>
          <dt><dfn title={StockInfoDefinition.ProfitGross}>Profit Gross</dfn></dt>
          <dd>{profitGross.toLocaleString(LOCAL_FORMATION)}</dd>
        </S.AdditionalInfoItem>
        :
        <></>
      }
      {
        ebitdaReported ?
        <S.AdditionalInfoItem>
          <dt><dfn title={StockInfoDefinition.EbitdaReported}>Ebitda Reported</dfn></dt>
          <dd>{ebitdaReported.toLocaleString(LOCAL_FORMATION)}</dd>
        </S.AdditionalInfoItem>
        :
        <></>
      }
      {
        headline && url ?
        <S.AdditionalInfoItem $special>
          <dt>Latest news</dt>
          <dd>
            {headline} <a href={url} target="_blank" rel="noreferrer">[link]</a>
          </dd>
        </S.AdditionalInfoItem>
        :
        <></>
      }
    </S.AdditionalInfoWrapper>
  );
};

export default AdditionalInfo;
