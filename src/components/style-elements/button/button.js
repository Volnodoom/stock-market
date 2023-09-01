import { styled } from "styled-components";

export const Button = styled.button`
  margin: 0;
  padding: 0.2rem 0.5rem;

  font-size: 0.75rem;
  font-family: 'Inter', Arial, sans-serif;

  background-color: transparent;
  border: 1px solid ${({theme}) => theme.color.supportTwo};
  border-radius: 0.5em;
  color: ${({theme}) => theme.color.greyDark};

  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.color.grey};
    color: ${({theme}) => theme.color.white};
    border-color: transparent;
  }

  &:active {
    color: ${({theme}) => theme.color.greyDark};
  }

  @media( min-width: 960px) {
    font-size: 0.875rem;
    border-radius: 0.571em;
    padding: 0.571em 1em;
  }
`;

