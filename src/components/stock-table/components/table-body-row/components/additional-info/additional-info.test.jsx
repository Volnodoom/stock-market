import '@testing-library/jest-dom'
import { configureMockStore } from "@jedmao/redux-mock-store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { generateInitialStateWithObject, makeServerMockAdditionalInfo } from "utils/mock-data";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "themes/default-theme";
import { GlobalStyle } from "components/app/app.style";
import AdditionalInfo from './additional-info';
import { LOCAL_FORMATION } from 'utils/constants';


describe('Component: AdditionalInfo', () => {
  it('render correctly', () => {
    const ids = ['ABC'];
    const mockData = makeServerMockAdditionalInfo(ids)[0];
    const mockState = generateInitialStateWithObject(mockData);
    const mockStore = configureMockStore()(mockState);

    render(
    <Provider store={mockStore}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <AdditionalInfo stockId={ids[0]} isShown />
        </ThemeProvider>

      </Provider>
    );

    expect(screen.getByText(/Cash Paid For Interest/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.cashPaidForInterest.toLocaleString(LOCAL_FORMATION), {normalizer: (value) => value})).toBeInTheDocument();
    expect(screen.getByText(/Price Per Earnings/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.pricePerEarnings.toLocaleString(LOCAL_FORMATION), {normalizer: (value) => value})).toBeInTheDocument();
    expect(screen.getByText(/Stock Preferred Equity/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.stockPreferredEquity.toLocaleString(LOCAL_FORMATION), {normalizer: (value) => value})).toBeInTheDocument();
    expect(screen.getByText(/Profit Gross/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.profitGross.toLocaleString(LOCAL_FORMATION), {normalizer: (value) => value})).toBeInTheDocument();
    expect(screen.getByText(/Ebitda Reported/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.ebitdaReported.toLocaleString(LOCAL_FORMATION), {normalizer: (value) => value})).toBeInTheDocument();
    expect(screen.getByText(/Latest news/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.headline)).toBeInTheDocument();
  });

  it('render correctly when some data are not presented', () => {
    const ids = ['ABC'];
    const mockData = makeServerMockAdditionalInfo(ids)[0];
    mockData.cashPaidForInterest = null;
    const mockState = generateInitialStateWithObject(mockData);
    const mockStore = configureMockStore()(mockState);

    render(
    <Provider store={mockStore}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <AdditionalInfo stockId={ids[0]} isShown />
        </ThemeProvider>

      </Provider>
    );

    expect(screen.queryByText(/Cash Paid For Interest/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Price Per Earnings/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.pricePerEarnings.toLocaleString(LOCAL_FORMATION), {normalizer: (value) => value})).toBeInTheDocument();
    expect(screen.getByText(/Stock Preferred Equity/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.stockPreferredEquity.toLocaleString(LOCAL_FORMATION), {normalizer: (value) => value})).toBeInTheDocument();
    expect(screen.getByText(/Profit Gross/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.profitGross.toLocaleString(LOCAL_FORMATION), {normalizer: (value) => value})).toBeInTheDocument();
    expect(screen.getByText(/Ebitda Reported/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.ebitdaReported.toLocaleString(LOCAL_FORMATION), {normalizer: (value) => value})).toBeInTheDocument();
    expect(screen.getByText(/Latest news/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.headline)).toBeInTheDocument();
  });
});
