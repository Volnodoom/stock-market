import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { configureMockStore } from "@jedmao/redux-mock-store";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMockStateWithFailToken, createMockStateWithoutToken } from "utils/mock-data";
import LogIn from "./log-in";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "themes/default-theme";
import { GlobalStyle } from "components/app/app.style";
import * as actionsLogin from 'store/data-login/actions-login';

jest.mock('store/data-login/actions-login', () => ({
  ...jest.requireActual('store/data-login/actions-login'),
  fetchToken: jest.fn(),
}));
describe('Component: LogIn', () => {
  it('render correctly', () => {
    const mockState = createMockStateWithoutToken();
    const mockStore = configureMockStore()(mockState);

    render(
    <Provider store={mockStore}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <LogIn />
        </ThemeProvider>

      </Provider>
    );

    expect(screen.getByText(/Please, inter public token to proceed data exchange/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Token')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Send'})).toBeInTheDocument();

    expect(screen.getByPlaceholderText('pk_***********************')).toBeInTheDocument();
  });

  it('Submitting form dispatch the fetchToken action', async () => {
    const mockState = createMockStateWithoutToken();
    const mockStore = configureMockStore()(mockState);
    const invalidKey = 'afadfasdf23524dfas';
    mockStore.dispatch = jest.fn();
    const fakeFetch = jest.spyOn(actionsLogin, 'fetchToken');
    const user = userEvent.setup();

    render(
    <Provider store={mockStore}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <LogIn />
        </ThemeProvider>

      </Provider>
    );

    await user.type(screen.getByPlaceholderText('pk_***********************'), invalidKey);
    await user.keyboard('{Enter}')

    await waitFor(() => {expect(fakeFetch).toHaveBeenCalledWith(invalidKey);});
    // await waitFor(() => {screen.getByText(/Token is not valid/i).toBeInTheDocument()});
  });

  it('Displaying warring information after submitting invalid token', () => {
    const mockState = createMockStateWithFailToken();
    const mockStore = configureMockStore()(mockState);

    render(
    <Provider store={mockStore}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <LogIn />
        </ThemeProvider>

      </Provider>
    );

    expect(screen.getByText(/Token is not valid/i)).toBeInTheDocument();
  });
});
