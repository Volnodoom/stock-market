import styled, { createGlobalStyle } from "styled-components";
import InterRegularWoff2 from 'assets/fonts/inter-regular.woff2';
import InterRegularWoff from 'assets/fonts/inter-regular.woff';
import InterMediumWoff2 from 'assets/fonts/inter-medium.woff2';
import InterMediumWoff from 'assets/fonts/inter-medium.woff';
import InterSemiBoldWoff2 from 'assets/fonts/inter-semi-bold.woff2';
import InterSemiBoldWoff from 'assets/fonts/inter-semi-bold.woff';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  src:  local('Inter'),
        url(${InterRegularWoff2}) format('woff2'),
        url(${InterRegularWoff}) format('woff');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  src:  local('Inter'),
        url(${InterMediumWoff2}) format('woff2'),
        url(${InterMediumWoff}) format('woff');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  src:  local('Inter'),
        url(${InterSemiBoldWoff2}) format('woff2'),
        url(${InterSemiBoldWoff}) format('woff');
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

:root {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.2;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.blueBackground};

}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

textarea {
  resize: none;
}

/* firefox placeholder \ invalid fix + ios bdrs */
input {
  border-radius: 0;
}

input::placeholder {
  opacity: 1;
}

input:invalid {
  box-shadow: none;
}

textarea {
  border-radius: 0;
}

textarea::placeholder {
  opacity: 1;
}

textarea:invalid {
  box-shadow: none;
}

select {
  border-radius: 0;
}

/* chrome search X removal */
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  appearance: none;
}

/* input[number] arrows removal */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  margin: 0;

  appearance: none;
}

input[type='number'] {
  appearance: textfield;
}

/* ios button \ inputs reset */
select,
textarea,
input:matches([type='email'], [type='number'], [type='password'], [type='search'], [type='tel'], [type='text'], [type='url']) {
  appearance: none;
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
  appearance: none;
}

.visually-hidden {
  position: absolute;

  width: 1px;
  height: 1px;
  margin: -1px;

  clip: rect(0 0 0 0);
}
`;

const AppWrapper = styled.div`

`;

export {
  GlobalStyle,
  AppWrapper,
};
