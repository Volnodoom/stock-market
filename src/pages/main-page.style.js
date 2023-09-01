import { styled } from "styled-components";

const MainTitle = styled.h1`
  margin: 0;
  font-weight: 500;
  font-size: 1.6rem;

  @media (min-width: 960px) {
    font-size: 5.25rem;
  }
`;

const MainSubText = styled.p`
  padding: 0;
  margin:0 0 1rem 0;

  font-size: 0.65rem;

  @media (min-width: 960px) {
    margin-top: -0.5rem;
    margin-bottom: 2rem;
    font-size: 1.65rem;
  }
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 22.5rem;
  max-width: 39rem;

  border-radius: 0.5rem;
  background-color: ${({theme}) => theme.color.white};

  @media (min-width: 960px) {
    max-width: 48rem;
  }
`;

const MainBreadCrumbsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.75rem 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 960px) {
    padding: 0.75rem 2rem 1rem;
  }
`;

const BreadCrumbsText = styled.p`
  padding: 0;
  margin: 0;

  font-size: 0.75rem;
  color: ${({theme}) => theme.color.greyDark};

  @media (min-width: 960px) {
    font-size: 0.875rem;
  }
`;

const BreadCrumbsButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
`;

export {
  MainTitle,
  MainSubText,
  BreadCrumbsText,
  BreadCrumbsButtonWrapper,
  MainBreadCrumbsWrapper,
  MainContentWrapper,
}
