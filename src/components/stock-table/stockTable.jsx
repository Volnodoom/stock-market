import { useSelector } from 'react-redux';
import TableBodyRow from "./components/table-body-row/table-body-row";
import * as S from "./stock-table.style";
import * as selector from 'store/data-stock/selectors-stock';
import { LoadingStatus, ONE, STEP } from 'utils/constants';


const StockTable = () => {
  const isSucceedInitialization = useSelector(selector.getInitialLoadStatus) === LoadingStatus.Succeeded;
  const companiesId = useSelector(selector.stockIdAll);
  const currentPage = useSelector(selector.getCurrentPage);
  const startLimit = (currentPage - ONE) * STEP;
  const endLimit = currentPage * STEP;

  return(
    <>
      {
        isSucceedInitialization
        ?
        <S.Table>
          <S.TableHead>
            <S.TableRow>
              <S.TableHeadCell>Company Name</S.TableHeadCell>
              <S.TableHeadCell>Close Price (USD)</S.TableHeadCell>
            </S.TableRow>
          </S.TableHead>
          <tbody>
            {
              companiesId
                .slice(startLimit, endLimit)
                .map((value) => (<TableBodyRow stockId={value} key={value}/>))
            }
          </tbody>
        </S.Table>

        :
        <div>Loading...</div>
      }
    </>
  );
};

export default StockTable;
