import { cellPadding } from "components/stock-table/stock-table.style";
import { Button } from "components/style-elements/button/button";
import { css, styled } from "styled-components";

const paddingZero = css`
  padding: 0;
  @media (min-width: 960px) {
    padding: 0;
  }
`;

const arrowDown = css`
  &::after {
    transform: rotate(135deg);
  }

  &::before {
    transform: translateX(-4px) rotate(45deg);
  }
`;

const arrowUp = css`
  &::after {
    transform: translateX(-4px) rotate(135deg);
  }

  &::before {
    transform:  rotate(45deg);
  }
`;

const rowShow = css`
  max-height: 400px;
  transition: max-height 0.6s;
`;

const rowHide = css`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
`;

const borderOnePx = css`
  border-bottom: 1px solid ${({theme}) => theme.color.supportOne};
`;

const borderZeroPx = css`
  border-bottom: 0px solid ${({theme}) => theme.color.supportOne};
`;

const TableRowInfo = styled.tr`
  ${({$isShown}) => $isShown ? borderOnePx : borderZeroPx}

`;

const TableBodyCell = styled.td`
  ${cellPadding};

  &:first-child {
    color: ${({theme}) => theme.color.blackDark};
  }
`;

const TableBodyCellInfo = styled.td`
  ${cellPadding};
  background-color: ${({theme}) => theme.color.blueBackground};
  color: ${({theme}) => theme.color.white};
  ${({$isShown}) => $isShown ? cellPadding : paddingZero}
`;

const CellInfoWrapper = styled.dl`
  margin: 0;
  ${({$isShown}) => $isShown ? rowShow : rowHide};
`;

const LineCellInfoWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.5rem;
`;

const InteractiveContent = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleButton = styled(Button)`
  position: relative;
  padding: 0;
  margin-right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;

  border-color: transparent;

  &::after,
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 7px;
    height: 2px;

    content: '';
    border-radius: 0.2rem;
    background-color: ${({theme}) => theme.color.blue};
  }

  ${({$isActive}) => $isActive ? arrowDown : arrowUp};
`;

const CellInfoContent = styled.p`
  margin: 0;
`;

export {
  TableBodyCell,
  TableBodyCellInfo,
  CellInfoWrapper,
  LineCellInfoWrapper,
  ToggleButton,
  CellInfoContent,
  InteractiveContent,
  TableRowInfo,
}

