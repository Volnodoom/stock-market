import { css, styled } from "styled-components";

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

export const LockedCell = styled.td`
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
