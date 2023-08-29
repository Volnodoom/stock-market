import { ThemeProvider } from "styled-components";
import * as S from "./app.style";
import { defaultTheme } from "themes/default-theme";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <S.GlobalStyle />
      <S.AppWrapper>
        <div>Hello Dude</div>

      </S.AppWrapper>

    </ThemeProvider>
  )
}

export default App;
