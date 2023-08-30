import { ThemeProvider } from "styled-components";
import * as S from "./app.style";
import { defaultTheme } from "themes/default-theme";
import MainPage from "pages/main-page";
import { useEffect } from "react";
import { TITLE } from "utils/constants";
import { useAppDispatch } from "hooks/use-app-dispatch";
import { fetchCompanyIdAndNameAction } from "store/data-stock/actions-stock";
import { clearStore } from "store/data-stock/data-stock";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = TITLE;
  }, []);

  useEffect(() => {
    let hasSent = false;
    if(!hasSent) {
      dispatch(fetchCompanyIdAndNameAction());
    }

    return () => {
      hasSent = true;
      dispatch(clearStore())
    };
  }, [dispatch]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <S.GlobalStyle />
      <S.AppWrapper>
        <MainPage />
      </S.AppWrapper>

    </ThemeProvider>
  )
}

export default App;
