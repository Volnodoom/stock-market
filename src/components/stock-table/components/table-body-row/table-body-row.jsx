import { useState } from "react";
import { TableRow } from "components/stock-table/stock-table.style";
import * as S from "./table-body-row.style";

const TableBodyRow = () => {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => setIsActive(prevValue => !prevValue);

  return(
    <>
      <TableRow>
        <S.TableBodyCell>
          <S.InteractiveContent>
            <S.ToggleButton
              type="button"
              $isActive={isActive}
              onClick={handleButtonClick}
            ></S.ToggleButton>
            <S.CellInfoContent>Goldman Sachs Physical Gold ETF Trust - Goldman Sachs Physical Gold ETF</S.CellInfoContent>
          </S.InteractiveContent>
        </S.TableBodyCell>
        <S.TableBodyCell>14.595</S.TableBodyCell>
      </TableRow>
      <S.TableRowInfo>
      <S.TableBodyCellInfo $isShown={isActive}>
        <S.CellInfoWrapper $isShown={isActive}>
          <S.LineCellInfoWrapper>
            <dt>Cash Paid For Interest</dt>
            <dd>165.546</dd>
          </S.LineCellInfoWrapper>
          <S.LineCellInfoWrapper>
            <dt>Price Per Earnings</dt>
            <dd>163455.546</dd>
          </S.LineCellInfoWrapper>
          <S.LineCellInfoWrapper>
            <dt>Stock Preferred Equity</dt>
            <dd>16g3455.546</dd>
          </S.LineCellInfoWrapper>
          <S.LineCellInfoWrapper>
            <dt>Profit Gross</dt>
            <dd>165.546</dd>
          </S.LineCellInfoWrapper>
          <S.LineCellInfoWrapper>
            <dt>Ebitda Reported</dt>
            <dd>1655634.546</dd>
          </S.LineCellInfoWrapper>
          <S.LineCellInfoWrapper>
            <dt>Latest news</dt>
            <dd>Lets go to discover everything in our big house full of dust and ants</dd>
          </S.LineCellInfoWrapper>
        </S.CellInfoWrapper>
      </S.TableBodyCellInfo>
      <S.TableBodyCellInfo $isShown={isActive}></S.TableBodyCellInfo>
      </S.TableRowInfo>
    </>
  );
};

export default TableBodyRow;
