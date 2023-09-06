import { useRef } from "react";
import * as S from "./log-in.style";
import { useAppDispatch } from "hooks/use-app-dispatch";
import { fetchToken } from "store/data-login/actions-login";
import { useSelector } from "react-redux";
import { getTokenStatus } from "store/data-login/data-login";
import { LoadingStatus } from "utils/constants";
import { useState } from "react";
import { useEffect } from "react";

const LogIn = () => {
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();

  const fetchStatus = useSelector(getTokenStatus);
  const isLoading = fetchStatus === LoadingStatus.Loading;
  const isFailed = fetchStatus === LoadingStatus.Failed;


  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if(isFailed) {
      setIsError(true);
    }
  }, [isFailed])

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if(!inputRef.current) {
      return;
    }
    dispatch(fetchToken(inputRef.current.value))
  }

  return(
    <S.LoginWrapper>
      <S.LoginMainText>Please, inter public token to proceed data exchange.</S.LoginMainText>
        <S.LoginMainText>The form of public token: pk_***********************.</S.LoginMainText>
        <S.LoginMainText>If you do not have one, please register on the follow&nbsp;
        <S.LoginMainLink href="https://iexcloud.io/" target="_blank" rel="noreferrer">[link]</S.LoginMainLink>
      </S.LoginMainText>

      <S.LoginForm onSubmit={handleSubmit}>
        <S.LoginLabel htmlFor="inputId">Token</S.LoginLabel>
        <S.LoginInput id="inputId" type="text" required ref={inputRef} placeholder="pk_***********************"/>
        <S.LoginButton type="submit">{isLoading ? 'Sending...' : 'Send'}</S.LoginButton>
      </S.LoginForm>
      <S.LoginWarring $hasShown={isError}>Token is not valid</S.LoginWarring>
    </S.LoginWrapper>
  );
};

export default LogIn;
