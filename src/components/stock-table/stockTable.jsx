import TableBodyRow from "./components/table-body-row/table-body-row";
import * as S from "./stock-table.style";
// U.S. symbols
const StockTable = () => {

  return(
      <S.Table>
        <S.TableHead>
          <S.TableRow>
            <S.TableHeadCell>Company Name</S.TableHeadCell>
            <S.TableHeadCell>Close Price (USD)</S.TableHeadCell>
          </S.TableRow>
        </S.TableHead>
        <tbody>
          <TableBodyRow />
          <TableBodyRow />
          <TableBodyRow />
        </tbody>
      </S.Table>
  );
};

export default StockTable;
