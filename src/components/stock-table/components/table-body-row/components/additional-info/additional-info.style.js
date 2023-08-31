import { css, styled } from "styled-components";

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

const paddingParams = css`
  padding: 0.35rem 0.5rem 0.35rem 1rem;

  @media (min-width: 960px) {
    padding: 0.75rem 1rem;
  }
`;

const AdditionalInfoWrapper = styled.ul`
  margin: 0;
  list-style: none;
  max-height: ${({$isShown}) => $isShown ? '500px' : '0px'};

  overflow: hidden;
  color: ${({theme}) => theme.color.white};
  background-color: ${({theme}) => theme.color.blueBackground};

  box-shadow: 0 0 0 100vmax ${({theme}) => theme.color.blueBackground};
  clip-path: inset(0 -100vmax);
  transition: max-height 0.6s, padding 0.6s;

  ${({$isShown}) => $isShown ? paddingParams : "padding: 0px"};

`;

const AdditionalInfoItem = styled.li`
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



export {
  AdditionalInfoWrapper,
  AdditionalInfoItem
}
