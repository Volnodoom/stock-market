import { cellPadding } from "components/stock-table/stock-table.style";
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
  border-bottom: 2px solid ${({theme}) => theme.color.supportOne};
`;

const borderZeroPx = css`
  border-bottom: 1px solid transparent;
`;

const special = css`
  flex-direction: column;

  dt {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 80%;
      height: 2px;
      bottom: 4px;
      right: 0px;

      border-bottom: 6px double ${({theme}) => theme.color.white};
    }
  }
`;

const TableRowInfo = styled.tr`
  ${({$isShown}) => $isShown ? borderOnePx : borderZeroPx}

`;

const TableBodyCell = styled.td`
  ${cellPadding};

  &:first-child {
    width: 80%;
    color: ${({theme}) => theme.color.blackDark};
  }
`;

const TableBodyCellInfo = styled.td`
  ${cellPadding};
  background-color: ${({theme, $isShown}) => $isShown ? theme.color.blueBackground : theme.color.white};
  color: ${({theme}) => theme.color.white};
  ${({$isShown}) => $isShown ? cellPadding : paddingZero}
  transition: padding 0.3s;

`;

const CellInfoWrapper = styled.dl`
  margin: 0;
  ${({$isShown}) => $isShown ? rowShow : rowHide};
`;

const LineCellInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.5rem;

  a:link {
    color: ${({theme}) => theme.color.white};
  }

  a:visited {
    color: ${({theme}) => theme.color.blackDark};
  }

  a:hover {
    background-color: ${({theme}) => theme.color.grey};
  }

  a:active {
    background-color: ${({theme}) => theme.color.grey};
  }

  dt dfn {
    font-style: normal;
  }

  dd {
    margin: 0;
  }

  ${({$special}) => $special ? special : ""};
`;

const InteractiveContent = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.button`
  position: relative;
  padding: 0;
  margin-right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;

  border-color: transparent;
  background-color: transparent;
  cursor: pointer;

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

  &:hover {
    background-color: transparent;

    &::after,
    &::before {
      background-color: ${({theme}) => theme.color.blackDark};
    }
  }

  ${({$isActive}) => $isActive ? arrowDown : arrowUp};
`;

const ToggleButtonPlug = styled.div`
  height: 1.5rem;
  width: 2rem;
  flex-shrink: 0;
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
  ToggleButtonPlug,
  CellInfoContent,
  InteractiveContent,
  TableRowInfo,
}

