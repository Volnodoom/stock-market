import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TableRow } from "components/stock-table/stock-table.style";
import * as S from "./table-body-row.style";
import * as selector from "store/data-stock/selectors-stock";
import { LOCAL_FORMATION } from "utils/constants";
import { Draggable } from "react-beautiful-dnd";
import AdditionalInfo from "./components/additional-info/additional-info";
import LockedCell from "./components/locked-cell/locked-cell";

const TableBodyRow = ({stockId, index}) => {
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
    <Draggable draggableId={stockId} index={index}>
      {(provided, snapshot) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <LockedCell>
            <S.InteractiveContent>
              <S.InteractiveContentMain>
                {
                  hasAnyAdditionalDataToShow ?
                  <S.ToggleButton
                    type="button"
                    $isActive={isActive}
                    onClick={handleButtonClick}
                  ></S.ToggleButton>
                  :
                  <S.ToggleButtonPlug/>
                }
                <S.CellInfoContent>{companyName}</S.CellInfoContent>
              </S.InteractiveContentMain>
              {
                hasAnyAdditionalDataToShow ?
                  <AdditionalInfo stockId={stockId} isShown={isActive}/>
                :
                  <></>
              }
            </S.InteractiveContent>
          </LockedCell>
          <LockedCell $priceTag>{price.toFixed(2).toLocaleString(LOCAL_FORMATION)}</LockedCell>
        </TableRow>

      )}
    </Draggable>
  );
};

export default TableBodyRow;
