import { css, styled } from "styled-components";

const cellPadding = css`
  padding: 0.35rem 0.5rem 0.35rem 1rem;

  @media (min-width: 960px) {
    padding: 0.75rem 2rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 0.5rem;
  overflow: hidden;

  font-size: 0.75rem;
  color: ${({theme}) => theme.color.grey};
  background-color: transparent;

  @media (min-width: 960px) {
    font-size: 0.875rem;
  }
`;

const TableHead = styled.thead`
  background-color: ${({theme}) => theme.color.supportMain};
`;

const TableHeadCell = styled.th`
  ${cellPadding};
  font-weight: 500;
  text-align: start;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({theme}) => theme.color.supportOne};
`;

export {
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  cellPadding,
}
