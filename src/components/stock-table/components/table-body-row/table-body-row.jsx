import { useState } from "react";
import { useSelector } from "react-redux";
import { TableRow } from "components/stock-table/stock-table.style";
import * as S from "./table-body-row.style";
import * as selector from "store/data-stock/selectors-stock";
import { LOCAL_FORMATION, StockInfoDefinition } from "utils/constants";

const TableBodyRow = ({stockId}) => {
  const {
    companyName,
    price,
    ebitdaReported,
    profitGross,
    stockPreferredEquity,
    pricePerEarnings,
    cashPaidForInterest,
    headline,
    url,
  } = useSelector(selector.stockInfoById(stockId));

  const [isActive, setIsActive] = useState(false);

  const hasAnyAdditionalDataToShow = ebitdaReported ||
    profitGross ||
    stockPreferredEquity ||
    stockPreferredEquity ||
    pricePerEarnings ||
    cashPaidForInterest ||
    (headline && url )

  const handleButtonClick = () => {
    setIsActive(prevValue => !prevValue)
  };

  return(
    <>
      <TableRow>
        <S.TableBodyCell>
          <S.InteractiveContent>
            {
              hasAnyAdditionalDataToShow ?
              <S.ToggleButton
                type="button"
                $isActive={isActive}
                onClick={handleButtonClick}
              ></S.ToggleButton>
              :
              <S.ToggleButtonPlug></S.ToggleButtonPlug>
            }
            <S.CellInfoContent>{companyName}</S.CellInfoContent>
          </S.InteractiveContent>
        </S.TableBodyCell>
        <S.TableBodyCell>{price.toFixed(3).toLocaleString(LOCAL_FORMATION)}</S.TableBodyCell>
      </TableRow>
      {
        hasAnyAdditionalDataToShow ?
          <S.TableRowInfo>
            <S.TableBodyCellInfo $isShown={isActive}>
              <S.CellInfoWrapper $isShown={isActive}>
                {
                  cashPaidForInterest ?
                    <S.LineCellInfoWrapper>
                      <dt><dfn title={StockInfoDefinition.CashPaidForInterest}>Cash Paid For Interest</dfn></dt>
                      <dd>{cashPaidForInterest.toLocaleString(LOCAL_FORMATION)}</dd>
                    </S.LineCellInfoWrapper>
                  :
                  <></>
                }
                {
                  pricePerEarnings ?
                  <S.LineCellInfoWrapper>
                    <dt><dfn title={StockInfoDefinition.PricePerEarnings}>Price Per Earnings</dfn></dt>
                    <dd>{pricePerEarnings.toLocaleString(LOCAL_FORMATION)}</dd>
                  </S.LineCellInfoWrapper>
                  :
                  <></>
                }
                {
                  stockPreferredEquity ?
                  <S.LineCellInfoWrapper>
                    <dt><dfn title={StockInfoDefinition.StockPreferredEquity}>Stock Preferred Equity</dfn></dt>
                    <dd>{stockPreferredEquity.toLocaleString(LOCAL_FORMATION)}</dd>
                  </S.LineCellInfoWrapper>
                  :
                  <></>
                }
                {
                  profitGross ?
                  <S.LineCellInfoWrapper>
                    <dt><dfn title={StockInfoDefinition.ProfitGross}>Profit Gross</dfn></dt>
                    <dd>{profitGross.toLocaleString(LOCAL_FORMATION)}</dd>
                  </S.LineCellInfoWrapper>
                  :
                  <></>
                }
                {
                  ebitdaReported ?
                  <S.LineCellInfoWrapper>
                    <dt><dfn title={StockInfoDefinition.EbitdaReported}>Ebitda Reported</dfn></dt>
                    <dd>{ebitdaReported.toLocaleString(LOCAL_FORMATION)}</dd>
                  </S.LineCellInfoWrapper>
                  :
                  <></>
                }
                {
                  headline && url ?
                  <S.LineCellInfoWrapper $special>
                    <dt>Latest news</dt>
                    <dd>
                      {headline} <a href={url} target="_blank" rel="noreferrer">[link]</a>
                    </dd>
                  </S.LineCellInfoWrapper>
                  :
                  <></>
                }
              </S.CellInfoWrapper>
            </S.TableBodyCellInfo>
            <S.TableBodyCellInfo $isShown={isActive}></S.TableBodyCellInfo>
          </S.TableRowInfo>
        :
          <></>
      }
    </>
  );
};

export default TableBodyRow;
