import { Button } from "components/style-elements/button/button";
import { styled } from "styled-components";

const LoginWrapper = styled.div`
  padding: 1rem;
  font-size: 0.875rem;

  @media (min-width: 960px) {
    padding-top: 4rem;
    font-size: 1rem;
  }
`;

const LoginMainText = styled.p`
  margin: 0;
  &:nth-of-type(3) {
    margin-bottom: 1.5rem;
  }

  line-height: 1.6;
`;

const LoginMainLink = styled.a`
  cursor: pointer;
  &:link {
    color: ${({theme}) => theme.color.white};
  }

  &:visited {
    color: ${({theme}) => theme.color.yellow};
  }

  &:hover {
    background-color: ${({theme}) => theme.color.grey};
  }

  &:active {
    background-color: ${({theme}) => theme.color.grey};
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1em;
`;

const LoginLabel = styled.label`

`;

const LoginInput = styled.input`
  width: 17rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${({theme}) => theme.color.supportOne};

  @media (min-width: 960px) {
    width: 21rem;
    font-size: 1rem;
  }

  &:placeholder-shown {
    color: ${({theme}) => theme.color.supportTwo};
  }
`;

const LoginButton = styled(Button)`
  background-color: ${({theme}) => theme.color.white};
`;

const LoginWarring = styled.p`
  display: ${({$hasShown}) => $hasShown ? 'block' : 'none'};
  margin: 0;
  font-weight: 600;

  color: ${({theme}) => theme.color.yellow};
`;

export {
  LoginWrapper,
  LoginMainText,
  LoginMainLink,
  LoginLabel,
  LoginInput,
  LoginForm,
  LoginButton,
  LoginWarring
}
