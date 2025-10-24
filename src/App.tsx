import React from 'react';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import PermanentDrawerLeft from './common/components/SideBar';
import CountryList from './pages/CountryList/CountryList';
import HomePage from './pages/Home/HomePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2F5575',
    },
    secondary: {
      main: '#dc004e',
    },
    action: {
      selected: '#e5e1da', // Kolor dla wybranego elementu (8% opacity)
      hover: '#dae5f1', // Kolor hover (4% opacity)
      hoverOpacity: 0.06, // Opacity dla hover
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Wyłącz automatyczne odświeżanie przy focusie okna
      retry: 1, // Liczba prób ponowienia zapytania w przypadku błędu
      staleTime: 5 * 60 * 1000, // Dane uznawane za świeże przez 5 minut
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PermanentDrawerLeft />}>
              <Route path="/" element={<HomePage />} />
              <Route path="countries" element={<CountryList />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
