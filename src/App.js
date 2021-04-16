import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { AppStateProvider } from '@app/providers';
import theme from '@app/themes';
import AppRoutes from '@app/routes';
import '@app/themes/app.css';

const App = () => {
  return (
    <AppStateProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={5}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </AppStateProvider>
  );
};

export default App;
