import { ThemeProvider } from "styled-components";
import * as S from "./app.style";
import { defaultTheme } from "themes/default-theme";
import MainPage from "pages/main-page";
import { useEffect } from "react";
import { LoadingStatus, TITLE } from "utils/constants";
import { useAppDispatch } from "hooks/use-app-dispatch";
import { fetchCompanyIdAndNameAction } from "store/data-stock/actions-stock";
import { clearStore } from "store/data-stock/data-stock";
import LogIn from "components/log-in/log-in";
import { useSelector } from "react-redux";
import { getTokenStatus } from "store/data-log-in/data-log-in";

const App = () => {
  const dispatch = useAppDispatch();
  const fetchStatus = useSelector(getTokenStatus);
  const isSucceeded= fetchStatus === LoadingStatus.Succeeded;

  useEffect(() => {
    document.title = TITLE;
  }, []);

  useEffect(() => {
    if(!isSucceeded) {
      return;
    }

    let hasSent = false;
    if(!hasSent) {
      dispatch(fetchCompanyIdAndNameAction());
    }

    return () => {
      hasSent = true;
      dispatch(clearStore())
    };
  }, [dispatch, isSucceeded]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <S.GlobalStyle />
      <S.AppWrapper>
        {
          isSucceeded ?
            <MainPage />
          :
            <LogIn />
        }
      </S.AppWrapper>

    </ThemeProvider>
  )
}

export default App;
