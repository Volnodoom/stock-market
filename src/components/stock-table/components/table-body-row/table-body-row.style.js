import { css, styled } from "styled-components";

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

const cellBodyPadding = css`
  padding: 0.35rem 0.5rem 0.35rem 1rem;

  @media (min-width: 960px) {
    padding: 0.75rem 1rem;
  }
`;

const priceCell = css`
  vertical-align: top;
  position: relative;
  display: flex;
  align-items: center;

  &::before {
    position: relative;
    content: '';
    top:0;
    left: 0;
    width: 1px;
    height: 1.5rem;
  }
  ${cellBodyPadding}
`;



const TableBodyCell = styled.td`
  &:first-child {
    width: 80%;
    color: ${({theme}) => theme.color.blackDark};
  }

  &:last-child {
    width: 20%;
    color: ${({theme}) => theme.color.blackDark};
  }

  ${({$priceTag}) => $priceTag ? priceCell : ""};
`;

const InteractiveContent = styled.div`

`;

const InteractiveContentMain = styled.div`
  display: flex;
  align-items: center;
  ${cellBodyPadding}
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
  InteractiveContent,
  InteractiveContentMain,
  CellInfoContent,
  ToggleButton,
  ToggleButtonPlug,
}

