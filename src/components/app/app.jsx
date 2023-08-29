import { ThemeProvider } from "styled-components";
import * as S from "./app.style";
import { defaultTheme } from "themes/default-theme";
import MainPage from "pages/main-page";

const App = () => {
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
